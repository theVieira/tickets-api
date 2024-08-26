import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'

const SECRET = process.env.SECRET_KEY ?? ''

export class AddNoteUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, note: string, techName: string, token: string) {
		verify(token, SECRET)

		if (note.length > 500) {
			throw new Error('char limit over (max 500)')
		}

		const dateFormat = `${new Date().getUTCDate()}/${(new Date().getUTCMonth() + 1)
			.toString()
			.padStart(2, '0')}/${new Date().getUTCFullYear()} ${
			new Date().getUTCHours() - 4
		}:${new Date().getUTCMinutes()}`

		const formatNote = `\n🧑 ${techName}\n⏰ ${dateFormat}\n💬 ${note}\n`

		const find = await this.ticketRepository.findById(id)

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
