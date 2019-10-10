import axios from 'axios'
import { TYPE_FETCH } from '../types'

export const typeFetch = () => {                       //ปกติ return เป็น obj แต่ใช้ reduxThunk เพิ่มความสามารถให้ return เป็น func ได้

    return dispatch => {
        axios.get('http://localhost:3001/Type').then(
            res => {
                dispatch({ type: TYPE_FETCH, payload: res.data })
            }
        ).catch(err => console.log(err))
    }
}