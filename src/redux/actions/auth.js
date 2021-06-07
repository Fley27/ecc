import axios from "axios";
import {
    LINK,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT_REQUEST,
    SIGN_OUT,
    SIGNOUT_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from "../consts";
import { setAlert } from "./alert";

export const  SignOut = () => async (dispatch) => {
    dispatch({
        type: SIGNOUT_REQUEST,
    });
    try {
        dispatch({
            type: SIGN_OUT,
        });
    } catch (error) {
        dispatch({
            type: SIGNOUT_FAIL,
        });
    }
};

export const signIn = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  SIGNIN_REQUEST,
    });
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post(
            `${LINK}/auth`,
            body,
            config
        );
        dispatch(setAlert('Connected', "success"));
        
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: SIGNIN_FAIL,
            payload: error.response.data
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const getUserInfo = (token) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = {token : token};
    dispatch({
        type:  GET_USER_REQUEST,
    });
    try {
        const res = await axios.put(
            `${LINK}/auth`,
            body,
            config
        );
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert('Welcome', "success"));
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};