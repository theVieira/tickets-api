import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { Ticket } from "../../../entities/ticket/Ticket";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { TicketCategory } from "../../../entities/ticket/TicketProps";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class EditDescriptionUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(
    id: string,
    description: string,
    category: TicketCategory,
    token: string
  ): Promise<Ticket> {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(permissions, "admin") == false) {
      throw new Error("ForbiddenError");
    }

    const findTicket = await this.ticketRepository.findById(id);

    if (findTicket.category != category) {
      const ticket = await this.ticketRepository.editTicket(
        id,
        description,
        category,
        "open",
        findTicket.techName
      );

      return ticket;
    }

    const ticket = await this.ticketRepository.editTicket(
      id,
      description,
      category,
      findTicket.status,
      findTicket.techName
    );
    return ticket;
  }
}
