import { eq } from 'drizzle-orm';
import { users } from '../../database/schema/user';
import type { NewUser } from '../../database/schema/user';
import type { Database } from '../../plugins/drizzle';

export class UserRepository {
  constructor(private db: Database) {}

  async createUser(data: NewUser) {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async getAllUsers() {
    return this.db.select().from(users);
  }

  async getUserById(id: number) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user ?? null;
  }

  async getUserByUsername(username: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user ?? null;
  }

  async updateUser(id: number, data: Partial<NewUser>) {
    const [updated] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async deleteUser(id: number) {
    const [deleted] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return deleted;
  }
}
