import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { Ticket } from "../../../entities/ticket/Ticket";
import { TechRepository } from "../../../repositories/tech/TechRepository";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class SetProgressUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(id: string, techName: string, token: string): Promise<Ticket> {
    verify(token, SECRET);
    const techRepository = new TechRepository();
    const tech = await techRepository.findByName(techName);

    const ticket = await this.ticketRepository.setProgress(
      id,
      tech,
      new Date()
    );
    return ticket;
  }
}
