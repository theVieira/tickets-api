import mongoose from 'mongoose'

const ActionSchema = new mongoose.Schema(
	{
		action: String,
		author: String,
	},
	{ timestamps: true }
)

const Action = mongoose.model('Action', ActionSchema)

export { Action }
