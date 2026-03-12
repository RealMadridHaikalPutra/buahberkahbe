import { UserRepository } from './user.repository';
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
} from './user.schema';
import type { User } from '../../database/schema/user';

export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(data: unknown): Promise<Omit<User, 'passwordHash'>> {
    const parsed: CreateUserInput = createUserSchema.parse(data);
    const user = await this.repo.createUser(parsed);
    if (!user) throw new Error('Failed to create user');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async getAllUsers(): Promise<Omit<User, 'passwordHash'>[]> {
    const users = await this.repo.getAllUsers();
    return users.map(({ passwordHash, ...u }) => u);
  }

  async getUserById(id: number): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.repo.getUserById(id);
    if (!user) throw new Error('User not found');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: number, data: unknown): Promise<Omit<User, 'passwordHash'>> {
    const parsed: UpdateUserInput = updateUserSchema.parse(data);
    const user = await this.repo.updateUser(id, parsed);
    if (!user) throw new Error('User not found');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async deleteUser(id: number): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.repo.deleteUser(id);
    if (!user) throw new Error('User not found');
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
