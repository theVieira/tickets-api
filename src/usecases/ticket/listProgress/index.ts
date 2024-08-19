import { TicketRepository } from '../../../repositories/ticket/TicketRepository'
import { ListProgressController } from './ListProgressController'
import { ListProgressUseCase } from './ListProgressUsecase'

const repository = new TicketRepository()
const usecase = new ListProgressUseCase(repository)
const listProgressController = new ListProgressController(usecase)

export { listProgressController }
