import { TicketNote } from '../../entities/ticket/TicketProps'

export interface INote {
	create(note: TicketNote): Promise<TicketNote>
}
