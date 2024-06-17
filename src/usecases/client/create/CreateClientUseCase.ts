import { verify } from "jsonwebtoken";
import { Client } from "../../../entities/client/Client";
import { IClientRepository } from "../../../entities/client/IClientRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
config();

const SECRET = process.env.SECRET_KEY || "";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(name: string, token: string): Promise<Client> {
    const jwt = verify(token, SECRET) as IPayload;
    if (jwt.admin === false) throw new Error("must be admin");
    const client = new Client({ name });
    const aClient = await this.clientRepository.create(client);
    return aClient;
  }
}
