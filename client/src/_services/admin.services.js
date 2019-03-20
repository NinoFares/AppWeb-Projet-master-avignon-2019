import axios from 'axios';

export const adminServices = {
    getUsers,
    getConferences
}

function getUsers(){
    return axios.post('/users')
        .then(response=> {
            return response.data;
        })
        .catch(err =>{
            return Promise.reject("Erreur, import users")
        })
}

function getConferences(){
    return axios.post("/conferences")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return Promise.reject("Erreur, import conferences")
        })
}

