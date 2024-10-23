import { verify } from 'jsonwebtoken'
import { Client } from '../../../entities/client/Client'
import { IClientRepository } from '../../../entities/client/IClientRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class ListClientsUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(token: string): Promise<Client[]> {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		const key: string = 'client:all'

		let clients: Client[] = []

		const cache: string | null = await redisClient.get(key)

		if (!cache) {
			clients = await this.clientRepository.list()
			await redisClient.set(key, JSON.stringify(clients), { EX: 600 })
		} else {
			clients = JSON.parse(cache)
		}

		if (checkPermission(Object.assign(this, permissions), 'admin') === true) {
			return clients
		}

		return clients.map((client) => {
			return new Client(Object.assign(this, client), client.id, undefined)
		})
	}
}
