// ─── JWT Payload ─────────────────────────────────────────────────────────────

export interface JwtPayload {
  sub: number;
  username: string;
  role: 'admin' | 'worker';
  iat?: number;
  exp?: number;
}

// ─── Type augmentation @fastify/jwt ──────────────────────────────────────────

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
