import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { Ticket } from "../../../entities/ticket/Ticket";
import { TechRepository } from "../../../repositories/tech/TechRepository";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class SetFinishedUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, token: string, techName: string): Promise<Ticket> {
    const techRepository = new TechRepository();
    const tech = await techRepository.findByName(techName);

    const ticket = await this.ticketRepository.setFinished(id, tech);
    return ticket;
  }
}
