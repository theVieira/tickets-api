import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { TicketStatus } from '../../../entities/ticket/TicketProps'
import { Ticket } from '../../../entities/ticket/Ticket'
import { OrderType } from '../../../types/OrderType'
import { orderTickets } from '../../../services/utils/OrderTickets'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class ListOpenUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		verify(token, SECRET_KEY)

		const key: string = 'ticket:open'

		const cache: string | null = await redisClient.get(key)

		if (cache) {
			const parsed: Ticket[] = JSON.parse(cache)
			return orderTickets(parsed, order)
		} else {
			const tickets: Ticket[] = await (
				await this.ticketRepository.list()
			).filter((ticket) => ticket.status != TicketStatus.finished)

			redisClient.set(key, JSON.stringify(tickets))
			return orderTickets(tickets, order)
		}
	}
}
