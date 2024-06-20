import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();
const SECRET = process.env.SECRET_KEY || "";

export class ListTicketsUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(token: string) {
    const { permissions } = verify(token, SECRET) as IPayload;

    const allTickets = await this.ticketRepository.list();
    const openTickets = allTickets.map((ticket) => ticket.status === "open");

    if (checkPermission(Object.assign(this, permissions), "admin") === true) {
      return allTickets;
    }

    return openTickets;
  }
}
