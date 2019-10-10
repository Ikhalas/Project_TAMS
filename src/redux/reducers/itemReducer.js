import { ITEM_FETCH } from '../types'

export default function(state = [], action) {
    switch (action.type) {
        case ITEM_FETCH:
            return action.payload
            
        default:
            return state
    }
}