import { TicketRepository } from '../../../repositories/ticket/TicketRepository'
import { ListOpenController } from './ListOpenController'
import { ListOpenUseCase } from './ListOpenUseCase'

const repository = new TicketRepository()
const usecase = new ListOpenUseCase(repository)
const listOpenController = new ListOpenController(usecase)

export { listOpenController }
