import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { SECRET_KEY } from '../../../utils/env'
import { IPayload } from '../../../services/jwt/IPayload'
import { ITechRepository } from '../../../entities/tech/ITechRepository'
import { TicketNote } from '../../../entities/ticket/TicketProps'
import { INote } from '../../../repositories/note/INote'
import { randomUUID } from 'crypto'
import redisClient from '../../../lib/cache/redis'

export class AddNoteUseCase {
	constructor(
		private ticketRepository: ITicketRepository,
		private noteRepository: INote,
		private techRepository: ITechRepository
	) {}

	async execute(id: string, note: string, token: string) {
		const { name } = verify(token, SECRET_KEY) as IPayload

		if (note.length > 500) {
			throw new Error('char limit over (max 500)')
		}

		const tech = await this.techRepository.findByName(name)

		const ticket = await this.ticketRepository.findById(id)

		if (!ticket) throw new Error('ticket not found!')

		const _note: TicketNote = {
			id: randomUUID(),
			note,
			techId: tech.id,
			time: new Date(),
			ticketId: ticket.id,
			techName: tech.name,
		}

		const res = await this.noteRepository.create(_note)

		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')
		await redisClient.del('ticket:finish')

		return res
	}
}
