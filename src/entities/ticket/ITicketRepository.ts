import { TicketStatus } from '@prisma/client'
import { Tech } from '../tech/Tech'
import { Ticket } from './Ticket'
import { TicketCategory } from './TicketProps'

export interface ITicketRepository {
	findById(id: string): Promise<Ticket>
	create(ticket: Ticket): Promise<Ticket>
	list(): Promise<Ticket[]>
	delete(id: string): Promise<Ticket>
	setFinished(id: string, tech: Tech, report: string, date: Date): Promise<Ticket>
	setProgress(id: string, tech: Tech, date: Date): Promise<Ticket>
	reopen(id: string): Promise<Ticket>
	editTicket(
		id: string,
		description: string,
		category: TicketCategory,
		status: TicketStatus,
		techName?: string | null
	): Promise<Ticket>
	addNote(id: string, note: string): Promise<Ticket>
	open(id: string): Promise<Ticket>
}
