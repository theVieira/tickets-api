import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { Ticket } from "../../../entities/ticket/Ticket";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class DeleteTicketUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string): Promise<Ticket> {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(permissions, "admin" || "delete_ticket") === false) {
      throw new Error("ForbiddenError");
    }

    const ticket = await this.ticketRepository.delete(id);

    return ticket;
  }
}
