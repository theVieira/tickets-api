/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process')
const { config } = require('dotenv')
const { sign } = require('jsonwebtoken')

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

async function checkStatus() {
	const res = await fetch(baseUrl + '/ticket/listProgress/all', {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})

	const data = await res.json()

	const now = new Date()

	data.forEach(async (el) => {
		const timeProgress = new Date(el.progress)
		const timeDiff = now.getTime() - timeProgress.getTime()
		const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60))

		if (diffInHours <= 24) return

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

		exec(
			`echo '**Ticket time for finish expired** \nTicket reopen: \nId: ${data.id} \nClient: ${data.clientName} \nDescrição: ${data.description} \n' >> status.log`
		)
	})
}

setTimeout(() => checkStatus(), 1000 * 60 * 60 * 4) // exec every 4h
