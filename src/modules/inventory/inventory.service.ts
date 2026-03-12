import { InventoryRepository } from './inventory.repository';
import {
  createInventorySchema,
  updateInventorySchema,
  createInventoryMutationSchema,
  createInventoryMutationItemSchema,
  type CreateInventoryInput,
  type UpdateInventoryInput,
  type CreateInventoryMutationInput,
  type CreateInventoryMutationItemInput,
} from './inventory.schema';
import type {
  Inventory,
  InventoryMutation,
  InventoryMutationItem,
} from '../../database/schema/inventory';

export class InventoryService {
  constructor(private repo: InventoryRepository) {}

  // ─── Inventories ──────────────────────────────────────────────────────────────

  async createInventory(data: unknown): Promise<Inventory> {
    const parsed: CreateInventoryInput = createInventorySchema.parse(data);
    const inventory = await this.repo.createInventory(parsed);
    if (!inventory) throw new Error('Failed to create inventory');
    return inventory;
  }

  async getAllInventories(): Promise<Inventory[]> {
    return this.repo.getAllInventories();
  }

  async getInventoryById(id: number): Promise<Inventory> {
    const inventory = await this.repo.getInventoryById(id);
    if (!inventory) throw new Error('Inventory not found');
    return inventory;
  }

  async getInventoriesByStallId(stallId: number): Promise<Inventory[]> {
    return this.repo.getInventoriesByStallId(stallId);
  }

  async updateInventory(id: number, data: unknown): Promise<Inventory> {
    const parsed: UpdateInventoryInput = updateInventorySchema.parse(data);
    const inventory = await this.repo.updateInventory(id, parsed);
    if (!inventory) throw new Error('Inventory not found');
    return inventory;
  }

  // ─── Inventory Mutations ───────────────────────────────────────────────────────

  async createInventoryMutation(data: unknown): Promise<InventoryMutation> {
    const parsed: CreateInventoryMutationInput = createInventoryMutationSchema.parse(data);
    const mutation = await this.repo.createInventoryMutation(parsed);
    if (!mutation) throw new Error('Failed to create inventory mutation');
    return mutation;
  }

  async getAllInventoryMutations(): Promise<InventoryMutation[]> {
    return this.repo.getAllInventoryMutations();
  }

  async getInventoryMutationById(id: number): Promise<InventoryMutation> {
    const mutation = await this.repo.getInventoryMutationById(id);
    if (!mutation) throw new Error('Inventory mutation not found');
    return mutation;
  }

  // ─── Inventory Mutation Items ───────────────────────────────────────────────

  async createInventoryMutationItem(data: unknown): Promise<InventoryMutationItem> {
    const parsed: CreateInventoryMutationItemInput = createInventoryMutationItemSchema.parse(data);
    const item = await this.repo.createInventoryMutationItem(parsed);
    if (!item) throw new Error('Failed to create mutation item');
    return item;
  }

  async getMutationItemsByMutationId(mutationId: number): Promise<InventoryMutationItem[]> {
    return this.repo.getMutationItemsByMutationId(mutationId);
  }
}
