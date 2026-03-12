import { eq } from 'drizzle-orm';
import {
  inventories,
  inventoryMutations,
  inventoryMutationItems,
} from '../../database/schema/inventory';
import type {
  NewInventory,
  NewInventoryMutation,
  NewInventoryMutationItem,
} from '../../database/schema/inventory';
import type { Database } from '../../plugins/drizzle';

export class InventoryRepository {
  constructor(private db: Database) {}

  // ─── Inventories ──────────────────────────────────────────────────────────────

  async createInventory(data: NewInventory) {
    const [inventory] = await this.db.insert(inventories).values(data).returning();
    return inventory;
  }

  async getAllInventories() {
    return this.db.select().from(inventories);
  }

  async getInventoryById(id: number) {
    const [inventory] = await this.db
      .select()
      .from(inventories)
      .where(eq(inventories.id, id));
    return inventory ?? null;
  }

  async getInventoriesByStallId(stallId: number) {
    return this.db
      .select()
      .from(inventories)
      .where(eq(inventories.stallId, stallId));
  }

  async updateInventory(id: number, data: Partial<NewInventory>) {
    const [updated] = await this.db
      .update(inventories)
      .set(data)
      .where(eq(inventories.id, id))
      .returning();
    return updated;
  }

  // ─── Inventory Mutations ───────────────────────────────────────────────────────

  async createInventoryMutation(data: NewInventoryMutation) {
    const [mutation] = await this.db.insert(inventoryMutations).values(data).returning();
    return mutation;
  }

  async getAllInventoryMutations() {
    return this.db.select().from(inventoryMutations);
  }

  async getInventoryMutationById(id: number) {
    const [mutation] = await this.db
      .select()
      .from(inventoryMutations)
      .where(eq(inventoryMutations.id, id));
    return mutation ?? null;
  }

  // ─── Inventory Mutation Items ───────────────────────────────────────────────

  async createInventoryMutationItem(data: NewInventoryMutationItem) {
    const [item] = await this.db.insert(inventoryMutationItems).values(data).returning();
    return item;
  }

  async getMutationItemsByMutationId(mutationId: number) {
    return this.db
      .select()
      .from(inventoryMutationItems)
      .where(eq(inventoryMutationItems.mutationId, mutationId));
  }
}
