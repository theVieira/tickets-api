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

		const formatNote = `\n🧑 ${techName}\n💬 ${note}\n`

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
