import axios from 'axios';

export const adminServices = {
    getUsers,
    getConferences,
    delUser,
    confirmerUser,

    getUsersConfirme,
    getUsersNConfirme,

    getConferencesC,
    getConferencesN,

    delConference,
    confirmeConference
}


//Gestion de requete sécurisé avec vérification du token
function requeteSec(req,payload){
    payload.token = JSON.parse(localStorage.getItem('user')).token;
    return axios.post(req,payload)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

function getUsers(){
    return requeteSec('/users',{})
}

function getUsersConfirme(){
    return requeteSec('/usersConfirme',{})
}

function getUsersNConfirme(){
    return requeteSec('/usersNConfirme',{})
}

function getConferences(){
    return requeteSec("/conferences",{})
}



function delUser(id){
    return requeteSec("/delConferencier",{id:id})
}

function confirmerUser(id){
    return requeteSec("/confirmationConferencier",{value:id})
}

function getConferencesC(){
    return requeteSec("/conferencesC",{})
}

function getConferencesN(){
    return requeteSec("/conferencesN",{})
}

function delConference(id){
    return requeteSec('/delConference',{conf_id:id})
}

function confirmeConference(id){
    return requeteSec('/confirmeConference',{conf_id:id})
}
