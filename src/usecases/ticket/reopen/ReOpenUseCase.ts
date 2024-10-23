import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class ReOpenUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, token: string) {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		if (checkPermission(Object.assign(this, permissions), 'admin') === false) {
			throw new Error('ForbiddenError')
		}

		const ticket = await this.ticketRepository.reopen(id)

		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')
		await redisClient.del('ticket:finish')

		return ticket
	}
}
