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

		let allTickets: Ticket[] = []

		const cache = await redisClient.get(key)

		if (!cache) {
			allTickets = await this.ticketRepository.list()
			await redisClient.set(key, JSON.stringify(allTickets))
		} else {
			allTickets = JSON.parse(cache)
		}

		const openTickets: Ticket[] = allTickets.filter((ticket) => {
			if (ticket.status !== TicketStatus.finished) return ticket
		})

		return orderTickets(openTickets, order)
	}
}
