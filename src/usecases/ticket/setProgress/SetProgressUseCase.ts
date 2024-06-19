import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();

const SECRET = process.env.SECRET_KEY || "";

export class SetProgressUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string) {
    const { permissions } = verify(token, SECRET) as IPayload;

    checkPermission(
      {
        admin: permissions.admin,
        create_ticket: permissions.create_ticket,
        delete_ticket: permissions.delete_ticket,
      },
      "admin"
    );

    const ticket = await this.ticketRepository.setProgress(id);
    return ticket;
  }
}
