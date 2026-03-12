import { eq } from 'drizzle-orm';
import { stalls } from '../../database/schema/stalls';
import type { NewStall } from '../../database/schema/stalls';
import type { Database } from '../../plugins/drizzle';

export class StallRepository {
  constructor(private db: Database) {}

  async createStall(data: NewStall) {
    const [stall] = await this.db.insert(stalls).values(data).returning();
    return stall;
  }

  async getAllStalls() {
    return this.db.select().from(stalls);
  }

  async getStallById(id: number) {
    const [stall] = await this.db
      .select()
      .from(stalls)
      .where(eq(stalls.id, id));
    return stall ?? null;
  }

  async updateStall(id: number, data: Partial<NewStall>) {
    const [updated] = await this.db
      .update(stalls)
      .set(data)
      .where(eq(stalls.id, id))
      .returning();
    return updated;
  }

  async deleteStall(id: number) {
    const [deleted] = await this.db
      .delete(stalls)
      .where(eq(stalls.id, id))
      .returning();
    return deleted;
  }
}
