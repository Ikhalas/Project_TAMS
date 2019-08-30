import axios from 'axios';
import { ITEMTYPES_FETCH } from './type'

export const itemtypesFetch = () => {
    return dispatch => {
        axios.get("http://localhost:3001/itemType").then(
            res => {
                dispatch({ type: ITEMTYPES_FETCH , payload: res.data })
            }
        )
    }
    
}

export const itemtypeDelete = id => {
    return dispatch => {
        axios.delete("http://localhost:3001/itemType/" + id).then(res => {
            axios.get("http://localhost:3001/itemType").then(
                res => {
                    dispatch({ type: ITEMTYPES_FETCH , payload: res.data })
            })  
        })
    }
}