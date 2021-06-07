import {
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

const initialState = {
    loading: false,
    games: [],
    game: null,
    userResult: null,
    incorrectAnswers: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_GAME_REQUEST:
        case GET_GAME_INFO_REQUEST:
        case GET_ADD_PLAYER_REQUEST:
        case GET_RESULT_GAME_USER_DASHBOARD_REQUEST:
        case GET_INCORRECT_ANSWER_LIST_REQUEST:
        case SET_STATUS_REQUEST:
            return {
            ...state,
            loading: true,
            games: [],
            game: null,
        };
        case SET_STATUS_SUCCESS:
        case GET_ADD_PLAYER_SUCCESS:
        case GET_GAME_INFO_SUCCESS:
        case GET_GAME_SUCCESS:
            return {
            ...state,
            ...payload,
            game: payload,
            loading: false
        };
        case GET_RESULT_GAME_USER_DASHBOARD_SUCCESS:
            return {
            ...state,
            ...payload,
            userResult: payload,
            loading: false
        };
        case GET_INCORRECT_ANSWER_LIST_SUCCESS:
            return {
            ...state,
            ...payload,
            incorrectAnswers: payload,
            loading: false
        };
        case SET_STATUS_FAIL:
        case GET_ADD_PLAYER_FAIL:
        case GET_GAME_INFO_FAIL:
        case GET_GAME_FAIL:
        case GET_RESULT_GAME_USER_DASHBOARD_FAIL:
        case GET_INCORRECT_ANSWER_LIST_FAIL:
            return {
            ...state,
            loading: false,
            game: null,
            games: [],
            userResult: null,
            incorrectAnswers: []
        };
        default:
            return state;
    }
}