//state ข้อมูลเดิมที่ยังไม่เปลี่ยนแปลง อยู่ใน store
//action ที่รับมาจาก action.js

import { ITEMTYPES_FETCH } from '../actions/type'

export default function(state = [], action){
    switch (action.type){
        case ITEMTYPES_FETCH:
            return action.payload
        default:
            return state
    }
}  