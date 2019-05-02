import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    addConference,
    getConferece,
    addSession,
    addWorkshop,
    addArticle,
    getSession,
    getProfil,
    getListUsersConf
};

function login(username,password){
    let payload = {
        email: username,
        password: password
    };
    return axios.post(
        '/login',
        payload)
        .then(response => {
            return handleResponse(response);
        })
        .catch(error => {
                return Promise.reject("Authentification refusé");
            }
        ).then( user =>{
            if(user.name) {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
            }
        else{
            return Promise.reject("Authentification refusé")
         }
        });
}

function logout(){
    localStorage.removeItem('user');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios('logout');
}


function register(user){
    return axios.post('/register',user)
        .then(response =>{
            console.log(response)
        })
        .catch(err =>{
            Promise.reject('Erreur, Registration failed')
        });
}

function addConference(payload){
    return axios.post('/addConference',payload)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

function addSession(payload){
    return axios.post('/createSession',payload)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

function addWorkshop(payload){
    return axios.post('/createWorkshop',payload)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

function addArticle(payload){
    return axios.post('/createArticle',payload)
        .then(response =>{
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

function getConferece(id){
    return axios.post('/getUserConference', {user_id: id})
        .then(result => {
            return result.data
        })
        .catch(err => {
            return Promise.reject('Erreur, get User Conference');
        });
}

function getSession(id){
    return axios.post('/getUserSession', {conf_id: id})
        .then(result => {
            return result.data
        })
        .catch(err => {
            return Promise.reject('Erreur, get User Conference');
        });
}


function handleResponse(response) {

    if (response.data.name){
        let data = response.data;
        return data;
    }
    else{
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = response.data;
            return Promise.reject(error);
        }
}

function getProfil(id){
    return axios.post('/getProfil', {user_id: id})
        .then(result => {
            return result.data
        })
        .catch(err => {
            return Promise.reject('Erreur, get User Profil');
        });
}

function getListUsersConf(id_conference){
    return axios.post('/getListUsersConf', {conf_id: id_conference})
        .then(result => {
            return result.data
        })
        .catch(err => {
            return Promise.reject('Erreur, get List Users Conference');
        });
}