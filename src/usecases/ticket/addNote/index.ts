import { NoteRepository } from '../../../repositories/note/NoteRepository'
import { TechRepository } from '../../../repositories/tech/TechRepository'
import { TicketRepository } from '../../../repositories/ticket/TicketRepository'
import { AddNoteController } from './AddNoteController'
import { AddNoteUseCase } from './AddNoteUseCase'

const techRepository = new TechRepository()
const noteRepository = new NoteRepository()
const repository = new TicketRepository()
const usecase = new AddNoteUseCase(repository, noteRepository, techRepository)
const addNoteController = new AddNoteController(usecase)

export { addNoteController }
