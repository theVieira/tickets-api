import { z } from 'zod'

const envSchema = z.object({
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_PORT: z.string(),

	PORT: z.string(),

	SECRET_KEY: z.string(),

	DATABASE_URL: z.string(),

	BOT_TOKEN: z.string(),
	CHAT_ID: z.string(),

	USER: z.string(),
	PASSWORD: z.string(),

	BASE_URL: z.string(),
})

const {
	BASE_URL,
	BOT_TOKEN,
	CHAT_ID,
	DATABASE_URL,
	PASSWORD,
	PORT,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
	SECRET_KEY,
	USER,
} = envSchema.parse(process.env)

export {
	BASE_URL,
	BOT_TOKEN,
	CHAT_ID,
	DATABASE_URL,
	PASSWORD,
	PORT,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
	SECRET_KEY,
	USER,
}
