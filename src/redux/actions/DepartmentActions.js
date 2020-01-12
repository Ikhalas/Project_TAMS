import axios from 'axios'
import { DEPARTMENT_FETCH } from '../types'

export const departmentFetch = () => {     //ปกติ return เป็น obj แต่ใช้ reduxThunk เพิ่มความสามารถให้ return เป็น func ได้

    return dispatch => {
        axios.get('http://localhost:3001/Department').then(
            res => {
                dispatch({ type: DEPARTMENT_FETCH, payload: res.data })
            }
        ).catch(err => console.log(err))
    }
}