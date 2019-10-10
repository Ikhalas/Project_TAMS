import axios from 'axios'
import { ITEMTYPE_FETCH } from '../types'

export const itemtypeFetch = () => {                       //ปกติ return เป็น obj แต่ใช้ reduxThunk เพิ่มความสามารถให้ return เป็น func ได้

    return dispatch => {
        axios.get('http://localhost:3001/itemType').then(
            res => {
                dispatch({ type: ITEMTYPE_FETCH, payload: res.data })
            }
        ).catch(err => console.log(err))
    }
}