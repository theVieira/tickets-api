import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";

config();

const SECRET = process.env.SECRET_KEY || "";

export class ListTicketsUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(token: string) {
    const tickets = await this.ticketRepository.list();
    const openTickets = tickets.map((ticket) => ticket.status === "open");

    const jwt = verify(token, SECRET) as IPayload;
    if (jwt.permissions.admin) {
      return tickets;
    }

    return openTickets;
  }
}
