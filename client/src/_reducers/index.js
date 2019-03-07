import {combineReducers} from 'redux';

import {authentification} from "./authentification.reducer";
import {users} from "./user.reducer";
import {alert} from "./alert.reducer";
import {registration} from "./registration.reducer";


const rootReducer = combineReducers({
    authentification,
    registration,
    users,
    alert
});

export default rootReducer;