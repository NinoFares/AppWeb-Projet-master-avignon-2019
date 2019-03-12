import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from './';
import { history } from "../_helpers";
import {store} from "../_helpers";

export const userActions = {
    login,
    logout,
    register
}

function login(username,password){

    return dispatch => {
        dispatch(request({username}));
        userService.login(username,password)
            .then(
                user =>{
                    dispatch(success(user));
                    if(store.getState(user.role) === 'ROLE_ADMIN')
                        history.push("/HomeAdmin");
                    else
                        history.push('/HomeUser')
                })
            .catch(error => {
                    dispatch(faillure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    return Promise.reject()
                }
            );
    };

    function request(user){ return {type: userConstants.LOGIN_REQUEST,user}}
    function success(user){ return {type: userConstants.LOGIN_SUCCESS,user}}
    function faillure(user){ return {type: userConstants.LOGIN_FAILURE,user}}
}

function logout(){
    userService.logout();
    history.push('/')
    return {type:userConstants.LOGOUT};
}

function register(user){

    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user =>{
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'))
                },
                error => {
                    dispatch(faillure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user){ return {type: userConstants.LOGIN_REQUEST,user}}
    function success(user){ return {type: userConstants.LOGIN_SUCCESS,user}}
    function faillure(user){ return {type: userConstants.LOGIN_FAILURE,user}}
}