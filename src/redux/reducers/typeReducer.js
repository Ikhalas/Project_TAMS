import { TYPE_FETCH } from '../types'

export default function(state = [], action) {
    switch (action.type) {
        case TYPE_FETCH:
            return action.payload
        default:
            return state
    }
}