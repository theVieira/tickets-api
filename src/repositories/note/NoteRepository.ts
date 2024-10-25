import { TicketNote } from '../../entities/ticket/TicketProps'
import { note_gateway } from '../../services/database/prisma'
import { INote } from './INote'

export class NoteRepository implements INote {
	async create({
		id,
		note,
		techId,
		ticketId,
		time,
	}: TicketNote): Promise<TicketNote> {
		const res = await note_gateway.create({
			data: {
				id,
				note,
				time,
				techId,
				ticketId,
			},
			include: { tech: true },
		})

		return {
			id: res.id,
			note: res.note,
			techName: res.tech.name,
			techId: res.techId,
			ticketId: res.ticketId,
			time: res.time,
		}
	}
}
