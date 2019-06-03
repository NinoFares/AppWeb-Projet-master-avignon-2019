/**
 * Reducers pour REDUX
 */

import {combineReducers} from 'redux';

import {authentification} from "./authentification.reducer";
import {users} from "./user.reducer";
import {alert} from "./alert.reducer";
import {registration} from "./registration.reducer";
import {admin} from './admin.reducer';


const rootReducer = combineReducers({
    authentification,
    registration,
    users,
    alert,
    admin
});

export default rootReducer;