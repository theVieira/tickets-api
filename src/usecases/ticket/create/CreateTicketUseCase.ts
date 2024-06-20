import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { Ticket } from "../../../entities/ticket/Ticket";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { MapTicketPriority } from "../../../services/utils/MapTicketPriority";

config();
const SECRET = process.env.SECRET_KEY || "";

export class CreateTicketUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(
    description: string,
    priority: "urgent" | "high" | "medium" | "low",
    clientName: string,
    token: string
  ): Promise<Ticket> {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(Object.assign(this, permissions), "admin") === false) {
      throw new Error("ForbiddenError");
    }

    const ticket = new Ticket({
      clientName,
      priority: MapTicketPriority(priority),
      description,
    });

    const created = await this.ticketRepository.create(ticket);

    return created;
  }
}
