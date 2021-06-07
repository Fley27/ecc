import {
    GET_EXERCICE_REQUEST,
    GET_EXERCICE_SUCCESS,
    GET_EXERCICE_FAIL,
} from "../consts";

const initialState = {
    loading: false,
    msg: "",
    exercices: [],
    exercice: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EXERCICE_REQUEST:
            return {
            ...state,
            loading: true,
            exercices: [],
            exercice: null,
            msg: ""
        };
        case GET_EXERCICE_SUCCESS:
            return {
            ...state,
            ...payload,
            exercice: payload,
            loading: false
        };
        case GET_EXERCICE_FAIL:
            return {
            ...state,
            loading: false,
            msg: payload.msg,
            exercice: null,
            exercices: []
        };
        default:
            return state;
    }
}