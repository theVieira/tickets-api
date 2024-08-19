import { OrderType } from '../../types/OrderType'

export function MapOrder(order: string) {
	switch (order) {
		case 'all': {
			return OrderType.all
		}
		case 'daily': {
			return OrderType.daily
		}
		case 'delivery': {
			return OrderType.delivery
		}
		case 'budget': {
			return OrderType.budget
		}
		default: {
			throw new Error('order unknow')
		}
	}
}
