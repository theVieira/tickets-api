import { Tech } from "./Tech";

export interface ITechRepository {
  findByName(name: string): Promise<Tech>;
  create(tech: Tech): Promise<Tech>;
  list(): Promise<Tech[]>;
  swapStatus(id: string, status: "active" | "inactive"): Promise<Tech>;
  auth(name: string): Promise<Tech>;
}
