import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { Ticket } from '../../../entities/ticket/Ticket'
import { TechRepository } from '../../../repositories/tech/TechRepository'
import { IPayload } from '../../../services/jwt/IPayload'

const SECRET = process.env.SECRET_KEY ?? ''

export class SetFinishedUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(
		id: string,
		techName: string,
		token: string,
		report: string
	): Promise<Ticket> {
		verify(token, SECRET) as IPayload
		const techRepository = new TechRepository()
		const tech = await techRepository.findByName(techName)

		if (!report) {
			throw new Error('report must be passed')
		}

		const find: Ticket = await this.ticketRepository.findById(id)

		if (find.report) {
			const dateFormat = `${new Date().getUTCDate()}/${(new Date().getUTCMonth() + 1)
				.toString()
				.padStart(2, '0')}/${new Date().getUTCFullYear()} ${
				new Date().getUTCHours() - 4
			}:${new Date().getUTCMinutes()}`

			const msg = `${
				find.report
			}\n${techName.toUpperCase()}\n${dateFormat}\n${report}`

			const ticket = await this.ticketRepository.setFinished(
				id,
				tech,
				msg,
				new Date()
			)

			return ticket
		}

		const ticket = await this.ticketRepository.setFinished(
			id,
			tech,
			report,
			new Date()
		)
		return ticket
	}
}
