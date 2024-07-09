import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { orderTickets } from "../../../services/utils/OrderTickets";

config();
const SECRET = process.env.SECRET_KEY || "";

export class ListTicketsUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(token: string, order: "all" | "delivery" | "daily" | "budget") {
    const jwt = verify(token, SECRET) as IPayload;

    const allTickets = await this.ticketRepository.list();
    const openTickets = allTickets.filter(
      (ticket) => ticket.status != "finished"
    );

    if (
      checkPermission(Object.assign(this, jwt.permissions), "admin") === true
    ) {
      return orderTickets(allTickets, order);
    }

    return orderTickets(openTickets, order);
  }
}
