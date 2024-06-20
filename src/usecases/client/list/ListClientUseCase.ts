import { verify } from "jsonwebtoken";
import { Client } from "../../../entities/client/Client";
import { IClientRepository } from "../../../entities/client/IClientRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class ListClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(token: string): Promise<Client[]> {
    const { permissions } = verify(token, SECRET) as IPayload;

    const clients = await this.clientRepository.list();

    if (checkPermission(Object.assign(this, permissions), "admin") === true) {
      return clients;
    }

    return clients.map((client) => {
      return new Client(Object.assign(this, client), client.id, undefined);
    });
  }
}
