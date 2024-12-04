import { TicketRepository } from '../../../repositories/ticket/TicketRepository'
import { AddNoteUseCase } from './AddNoteUseCase'
import { AddNoteController } from './AddNoteController'

const repository = new TicketRepository()
const usecase = new AddNoteUseCase(repository)
const addNoteController = new AddNoteController(usecase)

export { addNoteController }
