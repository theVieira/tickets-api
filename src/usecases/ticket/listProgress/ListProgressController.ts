import { Request, Response } from 'express'
import { ListProgressUseCase } from './ListProgressUsecase'
import { getToken } from '../../../services/jwt/GetToken'
import { MapOrder } from '../../../services/utils/MapOrder'

export class ListProgressController {
	constructor(private listProgressUseCase: ListProgressUseCase) {}

	async handle(req: Request, res: Response) {
		try {
			const token = getToken(req)
			const { order } = req.params

			const tickets = await this.listProgressUseCase.execute(token, MapOrder(order))

			return res.status(200).json(tickets)
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ error: error.message })
			}
		}
	}
}
