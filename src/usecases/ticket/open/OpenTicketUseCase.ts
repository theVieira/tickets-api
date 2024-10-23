import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class OpenTicketUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, token: string) {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		if (permissions.admin != true) {
			throw new Error('ForbiddenError')
		}

		const data = await this.ticketRepository.open(id)

		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')
		await redisClient.del('ticket:finish')

		return data
	}
}
