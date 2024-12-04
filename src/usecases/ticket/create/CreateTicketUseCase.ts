import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { Ticket } from '../../../entities/ticket/Ticket'
import { config } from 'dotenv'
import { IPayload } from '../../../services/jwt/IPayload'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import { MapTicketPriority } from '../../../services/utils/MapTicketPriority'
import { Telegraf } from 'telegraf'
import { MapTicketCategory } from '../../../services/utils/MapTicketCategory'
import { Translate } from '../../../services/utils/Translate'
import redisClient from '../../../lib/cache/redis'

config()
const SECRET = process.env.SECRET_KEY ?? ''
const BOT_TOKEN = process.env.BOT_TOKEN ?? ''
const CHAT_ID = process.env.CHAT_ID ?? ''

export class CreateTicketUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(
		description: string,
		priority: 'urgent' | 'high' | 'medium' | 'low',
		clientName: string,
		category: 'daily' | 'budget' | 'delivery' | 'maintenance',
		token: string
	): Promise<Ticket> {
		const bot = new Telegraf(BOT_TOKEN)
		const { permissions } = verify(token, SECRET) as IPayload

		if (
			checkPermission(Object.assign(this, permissions), 'admin') === false &&
			checkPermission(Object.assign(this, permissions), 'create_ticket') === false
		) {
			throw new Error('ForbiddenError')
		}

		const ticket = new Ticket({
			clientName,
			priority: MapTicketPriority(priority),
			category: MapTicketCategory(category),
			description,
		})

		const created = await this.ticketRepository.create(ticket)

		await redisClient.del('ticket:finish')
		await redisClient.del('ticket:open')
		await redisClient.del('ticket:progress')

		await bot.telegram.sendMessage(
			CHAT_ID,
			`Novo chamado criado\nCliente: ${ticket.clientName}\nDescrição: ${
				ticket.description
			}\nPrioridade: ${Translate(ticket.priority)}\nCategoria: ${Translate(
				ticket.category
			)}`
		)

		return created
	}
}
