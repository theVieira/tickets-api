import { verify } from "jsonwebtoken";
import { Client } from "../../../entities/client/Client";
import { IClientRepository } from "../../../entities/client/IClientRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";

config();

const SECRET = process.env.SECRET_KEY || "";

export class ListClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(token: string): Promise<Client[]> {
    const jwt = verify(token, SECRET) as IPayload;

    const clients = await this.clientRepository.list();

    if (jwt.permissions.admin === false) {
      const notTickets = clients.map((client) => {
        return new Client({ name: client.name }, client.id);
      });

      return notTickets;
    }

    return clients;
  }
}
