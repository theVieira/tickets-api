import { verify } from 'jsonwebtoken'
import { Client } from '../../../entities/client/Client'
import { IClientRepository } from '../../../entities/client/IClientRepository'
import { IPayload } from '../../../services/jwt/IPayload'
import { checkPermission } from '../../../services/checkPermission/CheckPermission'
import redisClient from '../../../lib/cache/redis'
import { SECRET_KEY } from '../../../utils/env'

export class CreateClientUseCase {
	constructor(private clientRepository: IClientRepository) {}

	async execute(name: string, token: string): Promise<Client> {
		const { permissions } = verify(token, SECRET_KEY) as IPayload

		if (checkPermission(Object.assign(this, permissions), 'admin') === false) {
			throw new Error('ForbiddenError')
		}

		const key: string = 'client:all'

		const client = new Client({ name })

		const created = await this.clientRepository.create(client)

		await redisClient.del(key)

		return created
	}
}
