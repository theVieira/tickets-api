import { Tech } from "../tech/Tech";
import { Ticket } from "./Ticket";
import { TicketCategory } from "./TicketProps";

export interface ITicketRpository {
  findById(id: string): Promise<Ticket>;
  create(ticket: Ticket): Promise<Ticket>;
  list(): Promise<Ticket[]>;
  delete(id: string): Promise<Ticket>;
  setFinished(id: string, tech: Tech): Promise<Ticket>;
  setProgress(id: string, tech: Tech): Promise<Ticket>;
  reopen(id: string): Promise<Ticket>;
  editTicket(
    id: string,
    description: string,
    category: TicketCategory
  ): Promise<Ticket>;
}
