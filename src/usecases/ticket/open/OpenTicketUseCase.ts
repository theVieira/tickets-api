import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { IPayload } from "../../../services/jwt/IPayload";

export class OpenTicketUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string) {
    const { permissions } = verify(
      token,
      process.env.SECRET_KEY ?? ""
    ) as IPayload;

    if (permissions.admin != true) {
      throw new Error("ForbiddenError");
    }

    const data = await this.ticketRepository.open(id);
    return data;
  }
}
