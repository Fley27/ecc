import axios from "axios";
import {
    LINK,
    GET_EXERCICE_REQUEST,
    GET_EXERCICE_SUCCESS,
    GET_EXERCICE_FAIL,
} from "../consts";
import { setAlert } from "./alert";


export const sendExercice = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  GET_EXERCICE_REQUEST,
    });
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post(
            `${LINK}/exercice`,
            body,
            config
        );      
        dispatch({
            type: GET_EXERCICE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_EXERCICE_FAIL,
            payload: error.response.data
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};