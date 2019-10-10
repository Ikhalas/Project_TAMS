import { ITEMTYPE_FETCH } from '../types'

export default function(state = [], action) {
    switch (action.type) {
        case ITEMTYPE_FETCH:
            return action.payload
            
        default:
            return state
    }
}