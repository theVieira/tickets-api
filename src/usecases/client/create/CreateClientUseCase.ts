import { decode, verify } from 'jsonwebtoken'
import { Client } from '../../../entities/client/Client'
import { IClientRepository } from '../../../entities/client/IClientRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { config } from 'dotenv'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import { Action } from '../../../services/database/mongo'
config()

const SECRET = process.env.SECRET_KEY ?? ''

export class CreateClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(name: string, token: string): Promise<Client> {
		const { permissions } = verify(token, SECRET) as IPayload
		const decoded = decode(token) as IPayload

		if (checkPermission(Object.assign(this, permissions), 'admin') === false) {
			throw new Error('ForbiddenError')
		}

		const client = new Client({ name })

		const created = await this.clientRepository.create(client)

		Action.create({
			action: 'Cliente criado: ' + client.name,
			author: decoded.name,
		})

		return created
	}
}
