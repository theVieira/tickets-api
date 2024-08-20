import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { TicketStatus } from '../../../entities/ticket/TicketProps'
import { Ticket } from '../../../entities/ticket/Ticket'
import { OrderType } from '../../../types/OrderType'
import { orderTickets } from '../../../services/utils/OrderTickets'

const SECRET = process.env.SECRET_KEY ?? ''

export class ListOpenUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		verify(token, SECRET)

		const allTickets: Ticket[] = await this.ticketRepository.list()

		const openTickets: Ticket[] = allTickets.filter((ticket) => {
			if (ticket.status !== TicketStatus.finished) return ticket
		})

		return orderTickets(openTickets, order)
	}
}
