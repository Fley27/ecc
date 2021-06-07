import axios from "axios";
import {
    LINK,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from "../consts";
import { setAlert } from "./alert";

export const signUp = (userData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  SIGNUP_REQUEST,
    });
    const body = JSON.stringify(userData);
    try {
        const res = await axios.post(
            `${LINK}/user`,
            body,
            config
        );
        
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};