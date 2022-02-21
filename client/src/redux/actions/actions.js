import  axios from 'axios';
import { GET_ALL } from './constants';

export let getAll = () => {
    return async (dispatch) =>  {
        let response = await axios.get("http://localhost:3001/dog")
        dispatch({type:GET_ALL , payload: response.data })
    }
}