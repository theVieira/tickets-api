import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TechRepository } from '../../../repositories/tech/TechRepository'
import { SECRET_KEY } from '../../../utils/env'
import redisClient from '../../../lib/cache/redis'

export class SetProgressUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, techName: string, token: string): Promise<Ticket> {
		verify(token, SECRET_KEY)
		const techRepository = new TechRepository()
		const tech = await techRepository.findByName(techName)

		const ticket = await this.ticketRepository.setProgress(id, tech, new Date())

		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')
		await redisClient.del('ticket:finish')

		return ticket
	}
}
