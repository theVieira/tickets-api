import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { Ticket } from "../../../entities/ticket/Ticket";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class SetProgressUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string): Promise<Ticket> {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(Object.assign(this, permissions), "admin") === false) {
      throw new Error("ForbiddenError");
    }

    const ticket = await this.ticketRepository.setProgress(id);
    return ticket;
  }
}
