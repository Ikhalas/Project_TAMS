// ส่ง action ไปหา reducer เพื่อเปลี่ยนข้อมูล items

import axios from 'axios';
import { ITEMS_FETCH } from './type'

export const itemsFetch = () => {
    return dispatch => {
        axios.get("http://localhost:3001/items").then(
            res => {
                dispatch({ type: ITEMS_FETCH , payload: res.data })
            }
        )
    }
    
}

export const itemDelete = id => {
    return dispatch => {
        axios.delete("http://localhost:3001/item/" + id).then(res => {
            axios.get("http://localhost:3001/items").then(
                res => {
                    dispatch({ type: ITEMS_FETCH , payload: res.data })
            })  
        })
    }
}