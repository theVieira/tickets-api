import { Client } from "./Client";

export interface IClientRepository {
  findByName(name: string): Promise<Client>;
  create(client: Client): Promise<Client>;
  list(): Promise<Client[]>;
}
