import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TechRepository } from '../../../repositories/tech/TechRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { SECRET_KEY } from '../../../utils/env'
import redisClient from '../../../lib/cache/redis'
import dayjs from 'dayjs'

export class SetFinishedUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(
		id: string,
		techName: string,
		token: string,
		report: string
	): Promise<Ticket> {
		verify(token, SECRET_KEY) as IPayload
		const techRepository = new TechRepository()
		const tech = await techRepository.findByName(techName)

		if (!report) {
			throw new Error('report must be passed')
		}

		if (report.length > 500) throw new Error('report over char limit max(500)')

		const find: Ticket = await this.ticketRepository.findById(id)

		if (!find) throw new Error('ticket not found!')

		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')
		await redisClient.del('ticket:finish')

		const dateFormat = dayjs(new Date()).format('DD/MM/YYYY HH:mm')
		const formattedTechName: string =
			techName.charAt(0).toUpperCase() + techName.substring(1)

		const formatReport = `\n🧑 ${formattedTechName}\n⏰ ${dateFormat}\n💬 ${report}\n`

		if (find.report == undefined) {
			const ticket = await this.ticketRepository.setFinished(
				find.id,
				tech,
				formatReport,
				new Date()
			)

			return ticket
		} else {
			const ticket = await this.ticketRepository.setFinished(
				find.id,
				tech,
				`${find.report}${formatReport}`,
				new Date()
			)

			return ticket
		}
	}
}
