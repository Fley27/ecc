import axios from "axios";
import {
    LINK,
    GET_GAME_REQUEST,
    GET_GAME_SUCCESS,
    GET_GAME_FAIL,
    GET_GAME_INFO_REQUEST,
    GET_GAME_INFO_SUCCESS,
    GET_GAME_INFO_FAIL,
    GET_ADD_PLAYER_REQUEST,
    GET_ADD_PLAYER_SUCCESS,
    GET_ADD_PLAYER_FAIL,
    GET_RESULT_GAME_USER_DASHBOARD_REQUEST,
    GET_RESULT_GAME_USER_DASHBOARD_SUCCESS,
    GET_RESULT_GAME_USER_DASHBOARD_FAIL,
    GET_INCORRECT_ANSWER_LIST_REQUEST,
    GET_INCORRECT_ANSWER_LIST_SUCCESS,
    GET_INCORRECT_ANSWER_LIST_FAIL,
    SET_STATUS_REQUEST,
    SET_STATUS_SUCCESS,
    SET_STATUS_FAIL,
} from "../consts";
import { setAlert } from "./alert";




import io from 'socket.io-client';
import feathers from '@feathersjs/client';
const socket = io("http://localhost:5000");
const client = feathers();
client.configure(feathers.socketio(socket));


export const setStatus = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    dispatch({
        type:  SET_STATUS_REQUEST,
    });
    try {
        const res = await axios.put(
            `${LINK}/game/status`,
            formData,
            config
        );      
        dispatch({
            type: SET_STATUS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: SET_STATUS_FAIL,
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const incorrectAnswers = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    dispatch({
        type:  GET_INCORRECT_ANSWER_LIST_REQUEST,
    });
    const {game, player} = formData;
    try {
        const res = await axios.get(
            `${LINK}/game/bad-answers/${game}/${player}`,
            config
        );      
        dispatch({
            type: GET_INCORRECT_ANSWER_LIST_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_INCORRECT_ANSWER_LIST_FAIL,
        });
        console.log(error.response.data.msg);
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const resultDashboard = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    dispatch({
        type:  GET_RESULT_GAME_USER_DASHBOARD_REQUEST,
    });
    const {game, player} = formData;
    try {
        const res = await axios.get(
            `${LINK}/game/result/${game}/${player}`,
            config
        );      
        dispatch({
            type: GET_RESULT_GAME_USER_DASHBOARD_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_RESULT_GAME_USER_DASHBOARD_FAIL,
        });
        console.log(error.response.data.msg);
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const addPlayer = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  GET_ADD_PLAYER_REQUEST,
    });
    try {
        const res = await axios.put(
            `${LINK}/game/add/player`,
            formData,
            config
        );      
        dispatch({
            type: GET_ADD_PLAYER_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ADD_PLAYER_FAIL,
        });
        console.log(error.response.data.msg);
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const getGameInfo = (params) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  GET_GAME_INFO_REQUEST,
    });
    try {
        const res = await axios.get(
            `${LINK}/game/${params.id}`,
            config
        );      
        dispatch({
            type: GET_GAME_INFO_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_GAME_INFO_FAIL,
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const getGameInfoByCode = (params) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  GET_GAME_INFO_REQUEST,
    });
    try {
        const res = await axios.get(
            `${LINK}/game/code/${params.id}`,
            config
        );      
        dispatch({
            type: GET_GAME_INFO_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: GET_GAME_INFO_FAIL,
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};

export const createGame = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    dispatch({
        type:  GET_GAME_REQUEST,
    });
    try {
        const res = await axios.post(
            `${LINK}/game`,
            formData,
            config
        );      
        dispatch({
            type: GET_GAME_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert(`Game created succesfully \n Please share & enjoy our platform`, "success"));
    } catch (error) {
        dispatch({
            type: GET_GAME_FAIL,
        });
        dispatch(setAlert(error.response.data.msg, "error"));
    }
};