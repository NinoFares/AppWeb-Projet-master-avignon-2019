import {adminConstants} from "../_constants";
import {adminServices} from "../_services";
import { alertActions } from './';
import { history } from "../_helpers";
import {store} from "../_helpers";

export const adminActions = {
    getUser,
    getConferences
}

function getUser(){
    console.log("Action")
    return dispatch => {
        console.log("Action1")
        dispatch(request());
        console.log("Action2")
        adminServices.getUsers()
            .then(
                users =>{
                    dispatch(success(users));
                    console.log("Actions : "+users)
                    return users;
                })
            .catch(error => {
                    dispatch(faillure(error));
                    dispatch(alertActions.error(error.toString()));
                    return Promise.reject()
                }
            );
    };

    function request(){ return {type: adminConstants.GETALL_REQUEST}}
    function success(users){ return {type: adminConstants.GETALL_SUCCESS,users}}
    function faillure(users){ return {type: adminConstants.GETALL_FAILURE,users}}
}

function getConferences(){

}