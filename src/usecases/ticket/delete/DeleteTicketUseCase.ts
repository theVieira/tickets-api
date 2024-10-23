import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import { Ticket } from '../../../entities/ticket/Ticket'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class DeleteTicketUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, token: string): Promise<Ticket> {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		if (
			checkPermission(permissions, 'delete_ticket') === false &&
			checkPermission(permissions, 'admin') === false
		) {
			throw new Error('ForbiddenError')
		}

		await redisClient.del('ticket:finish')
		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')

		const ticket = await this.ticketRepository.delete(id)

		return ticket
	}
}
