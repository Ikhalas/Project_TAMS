import { DEPARTMENTS_FETCH, DEPARTMENT_FETCH, DEPARTMENT_CREATE, DEPARTMENT_UPDATE } from '../actions/type'

export default function(state = [], action){
    switch (action.type){
        case DEPARTMENTS_FETCH:
        case DEPARTMENT_FETCH:
            return action.payload
        case DEPARTMENT_CREATE:
            return { saved: true, msg: "บันทึกสำเร็จ" }
        case DEPARTMENT_UPDATE:
            return { ...state, saved: true, msg: "บันทึกสำเร็จ" }
        default:
            return state
    }
}