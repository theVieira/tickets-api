import { Ticket } from "./Ticket";

export interface ITicketRpository {
  findById(id: string): Promise<Ticket>;
  create(ticket: Ticket): Promise<Ticket>;
  list(): Promise<Ticket[]>;
  delete(id: string): Promise<void>;
  setFinished(id: string, techName: string): Promise<Ticket>;
  setProgress(id: string): Promise<Ticket>;
  reopen(id: string): Promise<Ticket>;
}
