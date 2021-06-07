import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGN_OUT,
    SIGNOUT_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from "../consts";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
    errors: null,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USER_REQUEST:
        case SIGNOUT_REQUEST:
        case SIGNIN_REQUEST:
            return {
            ...state,
            isAuthenticated: false,
            user: null,
            loading: true
        };
        case SIGNIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false,
        };
        case GET_USER_SUCCESS:
            return {
            ...state,
            ...payload,
            user: payload
        };
        case SIGNIN_FAIL:
        case SIGN_OUT:
            localStorage.removeItem("token");
            return {
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            user: null,
            errors: payload.errors
        };
        case GET_USER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
}