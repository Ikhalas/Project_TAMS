import { DEPARTMENT_FETCH } from '../actions/type'

export default function(state = [], action){
    switch (action.type){
        case DEPARTMENT_FETCH:
            return action.payload
        default:
            return state
    }
}