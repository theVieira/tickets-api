import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TicketCategory, TicketStatus } from '../../../entities/ticket/TicketProps'
import { OrderType } from '../../../types/OrderType'

const SECRET = process.env.SECRET_KEY ?? ''

export class ListFinishedUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(token: string, order: OrderType) {
		const { permissions } = verify(token, SECRET) as IPayload

		if (permissions.admin !== true) throw new Error('ForbiddenError')

		const allTickets: Ticket[] = await this.ticketRepository.list()

		const finishedTickets: Ticket[] = allTickets.filter(
			(ticket) => ticket.status === TicketStatus.finished
		)

		switch (order) {
			case OrderType.all: {
				return finishedTickets
			}

			case OrderType.daily: {
				const dailys = finishedTickets.filter(
					(ticket) => ticket.category == TicketCategory.daily
				)
				return dailys
			}

			case OrderType.delivery: {
				const deliverys = finishedTickets.filter(
					(ticket) => ticket.category == TicketCategory.delivery
				)

				return deliverys
			}

			case OrderType.budget: {
				const budgets = finishedTickets.filter(
					(ticket) => ticket.category == TicketCategory.budget
				)

				return budgets
			}
		}
	}
}
