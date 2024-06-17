import { Client } from "./Client";

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  list(): Promise<Client[]>;
}
