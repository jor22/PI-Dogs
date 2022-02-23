import  axios from 'axios';
import { GET_ALL , GET_BY_ID } from './constants';

export let getAll = () => {
    // return fetch("http://localhost:3001/dog")
    // .then( response => response.json() )
    // .then( (response) =>   dispatch({ type: GET_ALL, payload: response }) )   
    return async (dispatch) =>  {
        let response = await axios.get("http://localhost:3001/dog")
        dispatch({type:GET_ALL , payload: response.data })
    }
}

export let getDogDetails = (id) => {
   
    return async(dispatch) => {
        let response = await axios.get(`http://localhost:3001/dog/${id}`)
        dispatch({type:GET_BY_ID , payload: response.data})
    }
}