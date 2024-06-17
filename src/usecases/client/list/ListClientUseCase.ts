import { Client } from "../../../entities/client/Client";
import { IClientRepository } from "../../../entities/client/IClientRepository";

export class ListClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.list();
    return clients;
  }
}
