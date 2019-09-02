import axios from 'axios';
import { DEPARTMENTS_FETCH, DEPARTMENT_FETCH, DEPARTMENT_CREATE, DEPARTMENT_UPDATE } from './type'

export const departmentFetch = id => {
    return dispatch => {
        axios.get("http://localhost:3001/Department/" + id).then(
            res => {
                dispatch({ type: DEPARTMENT_FETCH , payload: res.data })
            }
        )
    }  
}


export const departmentsFetch = () => {
    return dispatch => {
        axios.get("http://localhost:3001/Department").then(
            res => {
                dispatch({ type: DEPARTMENTS_FETCH , payload: res.data })
            }
        )
    }  
}

export const departmentDelete = id => {
    return dispatch => {
        axios.delete("http://localhost:3001/Department/" + id).then(res => {
            axios.get("http://localhost:3001/Department").then(
                res => {
                    dispatch({ type: DEPARTMENTS_FETCH , payload: res.data })
            })  
        })
    }
}

export const departmentCreate = values => {
    return dispatch => {
        axios.post("http://localhost:3001/Department", values ).then(
            res => {
                dispatch({type: DEPARTMENT_CREATE})
            }
        )
    }
}

export const depaetmentUpdate = (id, values) => {
    return dispatch => {
        axios.put("http://localhost:3001/Department" + id, values).then(res => {
            dispatch({ type: DEPARTMENT_UPDATE})
        })
    }
}