import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { OrderType } from '../../../types/OrderType'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TicketStatus } from '../../../entities/ticket/TicketProps'
import { orderTickets } from '../../../services/utils/OrderTickets'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class ListProgressUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		verify(token, SECRET_KEY)

		const key: string = 'ticket:progress'

		let allTickets: Ticket[] = []

		const cache = await redisClient.get(key)

		if (!cache) {
			allTickets = await this.ticketRepository.list()
			await redisClient.set(key, JSON.stringify(allTickets))
		} else {
			allTickets = JSON.parse(cache)
		}

		const progressTickets: Ticket[] = allTickets.filter(
			(ticket) => ticket.status === TicketStatus.progress
		)

		return orderTickets(progressTickets, order)
	}
}
