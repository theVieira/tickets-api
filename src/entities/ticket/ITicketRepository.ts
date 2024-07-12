import { Tech } from "../tech/Tech";
import { Ticket } from "./Ticket";

export interface ITicketRpository {
  findById(id: string): Promise<Ticket>;
  create(ticket: Ticket): Promise<Ticket>;
  list(): Promise<Ticket[]>;
  delete(id: string): Promise<Ticket>;
  setFinished(id: string, tech: Tech): Promise<Ticket>;
  setProgress(id: string, tech: Tech): Promise<Ticket>;
  reopen(id: string): Promise<Ticket>;
  editDescription(id: string, description: string): Promise<Ticket>;
}
