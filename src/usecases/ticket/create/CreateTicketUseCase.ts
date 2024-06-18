import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { Ticket } from "../../../entities/ticket/Ticket";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
config();

const SECRET = process.env.SECRET_KEY || "";

export class CreateTicketUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(
    description: string,
    priority: "urgent" | "high" | "medium" | "low",
    clientName: string,
    token: string
  ) {
    const decoded = verify(token, SECRET) as IPayload;

    if (
      decoded.permissions.admin === false ||
      decoded.permissions.create_ticket === false
    ) {
      throw new Error("not permission");
    }

    const ticket = new Ticket({ clientName, priority, description });

    const aTicket = await this.ticketRepository.create(ticket);
    return aTicket;
  }
}
