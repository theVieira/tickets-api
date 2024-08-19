import { Tech } from '../../entities/tech/Tech'
import { ITicketRepository } from '../../entities/ticket/ITicketRepository'
import { Ticket } from '../../entities/ticket/Ticket'
import { TicketCategory, TicketStatus } from '../../entities/ticket/TicketProps'
import { ticket_gateway } from '../../services/database/prisma'
import { MapTicketCategory } from '../../services/utils/MapTicketCategory'
import { MapTicketPriority } from '../../services/utils/MapTicketPriority'
import { MapTicketStatus } from '../../services/utils/MapTicketStatus'

export class TicketRepository implements ITicketRepository {
	async create(ticket: Ticket): Promise<Ticket> {
		const data = await ticket_gateway.create({
			data: {
				description: ticket.description,
				id: ticket.id,
				priority: ticket.priority,
				category: ticket.category,
				reccurrent: ticket.reccurrent,
				status: ticket.status,
				clientName: ticket.clientName,
			},
			include: {
				client: true,
			},
		})

		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt
		)
	}

	async list(): Promise<Ticket[]> {
		const data = await ticket_gateway.findMany({
			include: {
				client: true,
				tech: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})

		return data.map((ticket) => {
			return new Ticket(
				{
					clientName: ticket.clientName,
					description: ticket.description,
					category: MapTicketCategory(ticket.category),
					priority: MapTicketPriority(ticket.priority),
				},
				ticket.id,
				MapTicketStatus(ticket.status),
				ticket.reccurrent,
				ticket.techName ?? undefined,
				ticket.createdAt,
				ticket.tech?.color,
				ticket.progress ?? undefined,
				ticket.finished ?? undefined,
				ticket.report ?? undefined,
				ticket.note ?? undefined
			)
		})
	}

	async setFinished(
		id: string,
		tech: Tech,
		report: string,
		date: Date
	): Promise<Ticket> {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				status: 'finished',
				techName: tech.name,
				finished: date,
				report,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.tech?.name,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async setProgress(id: string, tech: Tech, date: Date): Promise<Ticket> {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				status: 'progress',
				techName: tech.name,
				progress: date,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async reopen(id: string): Promise<Ticket> {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				status: 'open',
				reccurrent: true,
				techName: null,
				tech: undefined,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async findById(id: string): Promise<Ticket> {
		const data = await ticket_gateway.findFirst({
			where: {
				id,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		if (!data) throw new Error('ticket not found')
		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async delete(id: string): Promise<Ticket> {
		const data = await ticket_gateway.delete({
			where: {
				id,
			},
		})

		return new Ticket(
			{
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
				category: MapTicketCategory(data.category),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt
		)
	}

	async editTicket(
		id: string,
		description: string,
		category: TicketCategory,
		status: TicketStatus,
		techName?: string | null
	) {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				description,
				category,
				status,
				techName,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		return new Ticket(
			{
				category: MapTicketCategory(data.category),
				clientName: data.client.name,
				description: data.description,
				priority: MapTicketPriority(data.priority),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.techName ?? undefined,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async addNote(id: string, note: string): Promise<Ticket> {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				note,
			},
			include: {
				client: true,
				tech: true,
			},
		})

		return new Ticket(
			{
				category: MapTicketCategory(data.category),
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.tech?.name,
			data.createdAt,
			data.tech?.color,
			data.progress ?? undefined,
			data.finished ?? undefined,
			data.report ?? undefined,
			data.note ?? undefined
		)
	}

	async open(id: string): Promise<Ticket> {
		const data = await ticket_gateway.update({
			where: {
				id,
			},
			data: {
				status: 'open',
				techName: null,
				progress: null,
			},
			include: {
				tech: true,
				client: true,
			},
		})

		return new Ticket(
			{
				category: MapTicketCategory(data.category),
				clientName: data.clientName,
				description: data.description,
				priority: MapTicketPriority(data.priority),
			},
			data.id,
			MapTicketStatus(data.status),
			data.reccurrent,
			data.tech?.name,
			data.createdAt,
			data.tech?.color,
			data.progress || undefined,
			data.finished || undefined,
			data.report || undefined,
			data.note || undefined
		)
	}
}
