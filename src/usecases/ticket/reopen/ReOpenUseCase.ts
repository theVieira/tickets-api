import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
config();

const SECRET = process.env.SECRET_KEY || "";

export class ReOpenUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string) {
    const jwt = verify(token, SECRET) as IPayload;

    if (jwt.permissions.admin === false) {
      throw new Error("ForbiddenError");
    }

    const ticket = await this.ticketRepository.reopen(id);

    return ticket;
  }
}
