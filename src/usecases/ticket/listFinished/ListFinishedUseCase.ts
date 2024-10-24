import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TicketStatus } from '../../../entities/ticket/TicketProps'
import { OrderType } from '../../../types/OrderType'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'
import { orderTickets } from '../../../services/utils/OrderTickets'

export class ListFinishedUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		if (permissions.admin !== true) throw new Error('ForbiddenError')

		const key: string = 'ticket:finish'

		const cache: string | null = await redisClient.get(key)

		let allTickets: Ticket[] = []

		if (!cache) {
			allTickets = await this.ticketRepository.list()
			allTickets = allTickets.reverse()
			await redisClient.set(key, JSON.stringify(allTickets), { EX: 600 })
		} else {
			allTickets = JSON.parse(cache)
		}

		const finishedTickets: Ticket[] = allTickets.filter(
			(ticket) => ticket.status === TicketStatus.finished
		)

		return orderTickets(finishedTickets, order)
	}
}
