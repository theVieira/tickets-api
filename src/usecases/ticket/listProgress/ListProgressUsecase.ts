import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { OrderType } from '../../../types/OrderType'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TicketStatus } from '../../../entities/ticket/TicketProps'
import { orderTickets } from '../../../services/utils/OrderTickets'

const SECRET = process.env.SECRET_KEY ?? ''

export class ListProgressUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		verify(token, SECRET)

		const allTickets: Ticket[] = await this.ticketRepository.list()

		const progressTickets: Ticket[] = allTickets.filter(
			(ticket) => ticket.status === TicketStatus.progress
		)

		return orderTickets(progressTickets, order)
	}
}
