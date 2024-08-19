import { verify } from 'jsonwebtoken'
import { ITicketRepository } from '../../../entities/ticket/ITicketRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { config } from 'dotenv'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'

config()
const SECRET = process.env.SECRET_KEY ?? ''

export class ReOpenUseCase {
	constructor(private ticketRepository: ITicketRepository) {}

	async execute(id: string, token: string) {
		const { permissions } = verify(token, SECRET) as IPayload

		if (checkPermission(Object.assign(this, permissions), 'admin') === false) {
			throw new Error('ForbiddenError')
		}

		const ticket = await this.ticketRepository.reopen(id)

		return ticket
	}
}
