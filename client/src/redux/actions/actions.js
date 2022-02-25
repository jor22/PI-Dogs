import axios from "axios";
import { GET_ALL, GET_BY_ID, GET_BY_NAME } from "./constants";

export let getAll = () => {
  // return fetch("http://localhost:3001/dog")
  // .then( response => response.json() )
  // .then( (response) =>   dispatch({ type: GET_ALL, payload: response }) )
  return async (dispatch) => {
    let response = await axios.get("http://localhost:3001/dog");
    dispatch({ type: GET_ALL, payload: response.data });
  };
};

export let getDogDetails = (id) => {
  return async (dispatch) => {
    let response = await axios.get(`http://localhost:3001/dog/${id}`);
    dispatch({ type: GET_BY_ID, payload: response.data });
  };
};

export let getByName = (name) => {
  return async (dispatch) => {
    let response = await axios.get(`http://localhost:3001/dog?name=${name}`);
    dispatch({ type: GET_BY_NAME, payload: response.data });
  };
};

export function sort(payload) {
  return {
    type: "SORT",
    payload,
  };
}

export let getTemperaments = () => {
    return async (dispatch) => {
        let response = await axios.get("http://localhost:3001/temperament");
        dispatch({ type: "GET_TEMPERAMENTS", payload: response.data });
      };
}


export function filterByTemp(payload) {
    return {
      type: "FILTER_BY_TEMP",
      payload,
    };
  }
  