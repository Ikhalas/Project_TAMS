import axios from 'axios';
import { DEPARTMENT_FETCH } from './type'

export const departmentFetch = () => {
    return dispatch => {
        axios.get("http://localhost:3001/Department").then(
            res => {
                dispatch({ type: DEPARTMENT_FETCH , payload: res.data })
            }
        )
    }  
}

export const departmentDelete = id => {
    return dispatch => {
        axios.delete("http://localhost:3001/Department/" + id).then(res => {
            axios.get("http://localhost:3001/Department").then(
                res => {
                    dispatch({ type: DEPARTMENT_FETCH , payload: res.data })
            })  
        })
    }
}