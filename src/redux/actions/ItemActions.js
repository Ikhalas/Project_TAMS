import axios from 'axios'
import { ITEM_FETCH } from '../types'

export const itemFetch = () => {                       //ปกติ return เป็น obj แต่ใช้ reduxThunk เพิ่มความสามารถให้ return เป็น func ได้

    return dispatch => {
        axios.get('http://localhost:3001/Items').then(
            res => {
                dispatch({ type: ITEM_FETCH, payload: res.data })
            }
        ).catch(err => console.log(err))
    }
}