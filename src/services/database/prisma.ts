import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const client_gateway = prisma.client
const tech_gateway = prisma.tech
const ticket_gateway = prisma.ticket

export { client_gateway, tech_gateway, ticket_gateway }
