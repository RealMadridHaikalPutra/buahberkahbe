import { StallRepository } from './stall.repository';
import {
  createStallSchema,
  updateStallSchema,
  type CreateStallInput,
  type UpdateStallInput,
} from './stall.schema';
import type { Stall } from '../../database/schema/stalls';

export class StallService {
  constructor(private repo: StallRepository) {}

  async createStall(data: unknown): Promise<Stall> {
    const parsed: CreateStallInput = createStallSchema.parse(data);
    const stall = await this.repo.createStall(parsed);
    if (!stall) throw new Error('Failed to create stall');
    return stall;
  }

  async getAllStalls(): Promise<Stall[]> {
    return this.repo.getAllStalls();
  }

  async getStallById(id: number): Promise<Stall> {
    const stall = await this.repo.getStallById(id);
    if (!stall) throw new Error('Stall not found');
    return stall;
  }

  async updateStall(id: number, data: unknown): Promise<Stall> {
    const parsed: UpdateStallInput = updateStallSchema.parse(data);
    const stall = await this.repo.updateStall(id, parsed);
    if (!stall) throw new Error('Stall not found');
    return stall;
  }

  async deleteStall(id: number): Promise<Stall> {
    const stall = await this.repo.deleteStall(id);
    if (!stall) throw new Error('Stall not found');
    return stall;
  }
}
