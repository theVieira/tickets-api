import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { SECRET_KEY } from '../../../utils/env'
import redisClient from '../../../lib/cache/redis'
import dayjs from 'dayjs'

export class AddNoteUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, note: string, techName: string, token: string) {
		verify(token, SECRET_KEY)

		if (note.length > 500) {
			throw new Error('char limit over (max 500)')
		}

		const dateFormat = dayjs(new Date()).format('DD/MM/YYYY HH:mm')

		const formattedTechName: string =
			techName.charAt(0).toUpperCase() + techName.substring(1)

		const formatNote = `\n🧑 ${formattedTechName}\n⏰ ${dateFormat}\n💬 ${note}\n`

		const find = await this.ticketRepository.findById(id)

		await redisClient.del('ticket:finish')
		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')

		if (find.note == undefined) {
			const ticket = await this.ticketRepository.addNote(id, formatNote)
			return ticket
		} else {
			const ticket = await this.ticketRepository.addNote(
				id,
				`${find.note}${formatNote}`
			)
			return ticket
		}
	}
}
