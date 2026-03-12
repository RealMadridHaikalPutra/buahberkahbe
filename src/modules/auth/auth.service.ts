import crypto from 'crypto';
import type { FastifyInstance } from 'fastify';
import { UserRepository } from '../user/user.repository';
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from './auth.schema';
import type { JwtPayload } from '../../types';

// ─── Password helpers (Node.js built-in crypto, no extra deps) ─────────────────

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, 'hex');
  const derived = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(hashBuffer, derived);
}

// ─── Service ───────────────────────────────────────────────────────────────

export class AuthService {
  constructor(
    private repo: UserRepository,
    private app: FastifyInstance,
  ) {}

  async login(data: unknown): Promise<{ token: string }> {
    const parsed: LoginInput = loginSchema.parse(data);
    const user = await this.repo.getUserByUsername(parsed.username);
    if (!user) throw new Error('Invalid username or password');

    const valid = verifyPassword(parsed.password, user.passwordHash);
    if (!valid) throw new Error('Invalid username or password');

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const token = this.app.jwt.sign(payload, { expiresIn: '8h' });
    return { token };
  }

  async register(data: unknown) {
    const parsed: RegisterInput = registerSchema.parse(data);
    const existing = await this.repo.getUserByUsername(parsed.username);
    if (existing) throw new Error('Username already taken');

    const passwordHash = hashPassword(parsed.password);
    const user = await this.repo.createUser({
      name: parsed.name,
      username: parsed.username,
      passwordHash,
      role: parsed.role,
    });
    if (!user) throw new Error('Failed to register user');

    const { passwordHash: _ph, ...safeUser } = user;
    return safeUser;
  }

  async me(userId: number) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error('User not found');
    const { passwordHash: _ph, ...safeUser } = user;
    return safeUser;
  }
}
