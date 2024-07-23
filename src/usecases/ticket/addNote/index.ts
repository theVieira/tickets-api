import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { AddNoteController } from "./AddNoteController";
import { AddNoteUseCase } from "./AddNoteUseCase";

const repository = new TicketRepository();
const usecase = new AddNoteUseCase(repository);
const addNoteController = new AddNoteController(usecase);

export { addNoteController };
