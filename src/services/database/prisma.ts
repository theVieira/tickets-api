import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const client_gateway = prisma.client
const tech_gateway = prisma.tech
const ticket_gateway = prisma.ticket
const note_gateway = prisma.ticketNote

export { client_gateway, tech_gateway, ticket_gateway, note_gateway }
