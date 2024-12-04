/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process')
const { config } = require('dotenv')
const { sign } = require('jsonwebtoken')
const { resolve } = require('node:path')

config()

const baseUrl = process.env.BASE_URL
const SECRET = process.env.SECRET_KEY ?? ''
const USERNAME = process.env.USERNAME

const token = sign(
	{
		name: USERNAME,
		status: 'active',
		permissions: {
			admin: true,
			create_ticket: true,
			delete_ticket: true,
		},
	},
	SECRET
)

export async function checkStatus() {
	const res = await fetch(baseUrl + '/ticket/listProgress/all', {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})

	const data = await res.json()

	const now = new Date()

	const date = new Date()
	const formattedDate = date.getDate().toString().padStart(2, '0')
	const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0')
	const formatted = `${formattedDate}/${formattedMonth}/${date.getFullYear()}`

	const verify = []

	data.forEach(async (el) => {
		const timeProgress = new Date(el.progress)
		const timeDiff = now.getTime() - timeProgress.getTime()
		const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60))

		if (diffInHours <= 24) {
			return
		} else {
			const res = await fetch(baseUrl + '/ticket/open', {
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify({
					id: el.id,
				}),
			})

			const data = await res.json()

			console.log(data)

			const path = resolve(__dirname, '..', '..', 'logs', 'status.log')

			exec(
				`echo '**Ticket time for finish expired** \n${formatted} \nTicket reopen: \nId: ${data.id} \nClient: ${data.clientName} \nDescrição: ${data.description} \n' >> ${path}`
			)
			verify.push(el)
		}
	})

	if (verify.length === 0) {
		verify.splice(0, -1)
		return
	}
}

setInterval(() => checkStatus(), 1000 * 60 * 60 * 6) // exec every 6h
