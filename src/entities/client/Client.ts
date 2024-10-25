import { v4 as uuid } from 'uuid'
import { ClientProps } from './ClientProps'
import { Ticket } from '../ticket/Ticket'

export class Client {
	id: string
	name: string
	tickets?: Ticket[]

	constructor(props: ClientProps, id?: string, tickets?: Ticket[]) {
		if (props.name.length > 50) throw Error('name char limit over!')

		this.id = uuid()
		if (id) {
			this.id = id
		}
		if (tickets) {
			this.tickets = tickets
		}

		this.name = FormatName(props.name)
	}
}

function FormatName(name: string): string {
	const names = name.toLowerCase().split(' ')

	const formatNames = names.map((name) => {
		return name.charAt(0).toUpperCase() + name.substring(1)
	})

	const formattedName = formatNames.join(' ')
	return formattedName
}
