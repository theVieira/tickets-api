import { TicketRepository } from '../../../repositories/ticket/TicketRepository'
import { ListFinishedController } from './ListFinishedController'
import { ListFinishedUseCase } from './ListFinishedUseCase'

const repository = new TicketRepository()
const usecase = new ListFinishedUseCase(repository)
const listFinishedController = new ListFinishedController(usecase)

export { listFinishedController }
