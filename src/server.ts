import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { router } from './router'
import morgan from 'morgan'
import { createWriteStream } from 'node:fs'
import path from 'node:path'

config()
const PORT = process.env.PORT

const app = express()

const customLogFormat =
	':date[web] :remote-addr :method :url :status :res[content-length] - :response-time ms'
const logStream = createWriteStream(path.join(__dirname, '../access.log'), {
	flags: 'a',
})

app.use(morgan(customLogFormat, { stream: logStream }))

app.use(
	cors({
		origin: '*',
		methods: '*',
	})
)

app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`server running ${PORT}`))
