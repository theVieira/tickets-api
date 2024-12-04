import { Request, Response, Router } from 'express'
import { createTicketController } from '../usecases/ticket/create'
import { setFinishedController } from '../usecases/ticket/setFinished'
import { setProgressController } from '../usecases/ticket/setProgress'
import { reOpenTicketController } from '../usecases/ticket/reopen'
import { deleteTicketController } from '../usecases/ticket/delete'
import { editDescriptionController } from '../usecases/ticket/edit'
import { openTicketController } from '../usecases/ticket/open'
import { listOpenController } from '../usecases/ticket/listOpen'
import { listProgressController } from '../usecases/ticket/listProgress'
import { listFinishedController } from '../usecases/ticket/listFinished'

const ticketRoutes = Router()

ticketRoutes.get('/listOpen/:order', (req: Request, res: Response) => {
	listOpenController.handle(req, res)
})

ticketRoutes.get('/listProgress/:order', (req: Request, res: Response) => {
	listProgressController.handle(req, res)
})

ticketRoutes.get('/listFinished/:order', (req: Request, res: Response) => {
	listFinishedController.handle(req, res)
})

ticketRoutes.post('/create', (req: Request, res: Response) => {
	createTicketController.handle(req, res)
})

ticketRoutes.put('/edit', (req: Request, res: Response) => {
	editDescriptionController.handle(req, res)
})

ticketRoutes.put('/finished', (req: Request, res: Response) => {
	setFinishedController.handle(req, res)
})

ticketRoutes.put('/progress', (req: Request, res: Response) => {
	setProgressController.handle(req, res)
})

ticketRoutes.put('/reopen', (req: Request, res: Response) => {
	reOpenTicketController.handle(req, res)
})

ticketRoutes.put('/open', (req: Request, res: Response) => {
	openTicketController.handle(req, res)
})

ticketRoutes.delete('/delete', (req: Request, res: Response) => {
	deleteTicketController.handle(req, res)
})

export { ticketRoutes }
