export type TicketProps = {
	description: string
	priority: TicketPriority
	category: TicketCategory
	clientName: string
	createdBy: string
}

export type TicketNote = {
	id: string
	note: string
	techId: string
	ticketId: string
	techName: string
	time: Date
}

export enum TicketStatus {
	open = 'open',
	progress = 'progress',
	finished = 'finished',
}

export enum TicketPriority {
	urgent = 'urgent',
	high = 'high',
	medium = 'medium',
	low = 'low',
}

export enum TicketCategory {
	daily = 'daily',
	delivery = 'delivery',
	budget = 'budget',
	maintenance = 'maintenance',
}
