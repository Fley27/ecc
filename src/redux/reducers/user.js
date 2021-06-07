import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from "../consts";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
    msg: "",
    loading: false,
    errors: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_REQUEST:
            return {
            ...state,
            isAuthenticated: false,
            loading: true
        };
        case SIGNUP_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
        };
        case SIGNUP_FAIL:
            localStorage.removeItem("token");
            return {
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            errors: payload.errors,
            msg: payload.msg,
        };
        default:
            return state;
    }
}