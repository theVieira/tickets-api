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
    const jwt = verify(token, SECRET) as IPayload;
    console.log(jwt);

    const allTickets = await this.ticketRepository.list();
    const openTickets = allTickets.map((ticket) => ticket.status === "open");

    if (
      checkPermission(Object.assign(this, jwt.permissions), "admin") === true
    ) {
      return {
        tickets: allTickets,
        tech: jwt,
      };
    }

    return { tickets: openTickets, tech: jwt };
  }
}
