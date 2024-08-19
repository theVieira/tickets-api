import { Request, Response } from 'express'
import { ListOpenUseCase } from './ListOpenUseCase'
import { getToken } from '../../../services/jwt/GetToken'
import { MapOrder } from '../../../services/utils/MapOrder'
import { Ticket } from '../../../entities/ticket/Ticket'

export class ListOpenController {
	constructor(private listOpenUseCase: ListOpenUseCase) {}

	async handle(req: Request, res: Response) {
		try {
			const { order } = req.params
			const token = getToken(req)

			const tickets: Ticket[] = await this.listOpenUseCase.execute(
				token,
				MapOrder(order)
			)

			return res.status(200).json(tickets)
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ error: error.message })
			}
		}
	}
}
