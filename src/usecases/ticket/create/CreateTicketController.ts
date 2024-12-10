import { Request, Response } from 'express'
import { CreateTicketUseCase } from './CreateTicketUseCase'
import { getToken } from '../../../services/jwt/GetToken'

export class CreateTicketController {
	constructor(private createTicketUseCase: CreateTicketUseCase) {}

	async handle(req: Request, res: Response) {
		const { description, clientName, priority, category, createdBy } = req.body

		try {
			const token = getToken(req)
			const ticket = await this.createTicketUseCase.execute(
				description,
				priority,
				clientName,
				category,
				createdBy,
				token
			)

			return res.status(201).json(ticket)
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({ error: error.message })
			}
		}
	}
}
