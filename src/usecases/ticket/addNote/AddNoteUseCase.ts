import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'

const SECRET = process.env.SECRET_KEY ?? ''

export class AddNoteUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, note: string, token: string) {
		verify(token, SECRET)
		if (note.length > 500) {
			throw new Error('char limit over (max 500)')
		}

		const ticket = await this.ticketRepository.addNote(id, note)
		return ticket
	}
}
