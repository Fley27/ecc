import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from './user';
import game from './game';
import exercice from './exercice';

export default combineReducers({
    alert,
    auth,
    user,
    game,
    exercice
});