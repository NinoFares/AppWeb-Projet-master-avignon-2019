import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    addConference,
    addSession,
    addWorkshop,
    addArticle,

    getConference,
    getSession,
    getProfil,
    getListUsersConf,
    getListUsersConfN,
    getArticle,
    getWorkshop,
    getSessionWorkshop,

    confirmerUser,

    delConference,
    delSession,
    delArticle,
    delWorkshop,
    delUser,
};

//Fonction qui gére les requetes sécurisé
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

//Fonction pour gérer login des utilisateurs
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

function logout(){
    localStorage.removeItem('user');
}


function register(user){
    return axios.post('/register',user)
        .then(response =>{
        })
        .catch(err =>{
            Promise.reject('Erreur, Registration failed')
        });
}


//requetes pour ajouter
function addConference(payload){
    return requeteSec('/addConference',payload);
}

function addSession(payload){
    return requeteSec('/createSession',payload)
}

function addWorkshop(payload){
    return requeteSec('/createWorkshop',payload)
}

function addArticle(payload){
    return requeteSec('/createArticle',payload)
}


//Requete pour récuprer
function getConference(id){
    return requeteSec('/getUserConference', {user_id: id});
}

function getSession(id){
    return requeteSec('/getUserSession', {conf_id: id});
}

function getSessionWorkshop(id){
    return requeteSec('/getSessionWorkshop', {workshop_id: id});
}

function getWorkshop(id){
    return requeteSec('/getUserWorkshop', {conf_id: id});
}

function getProfil(id){
    return requeteSec('/getProfil', {user_id: id});
}

function getListUsersConf(id_conference){

    return requeteSec('/getListUsersConf', {conf_id: id_conference})
}
function getListUsersConfN(id_conference){
    return requeteSec('/getListUsersConfN',{conf_id:id_conference})
}
function getArticle(id_session){
    return requeteSec('/getArticle',{session_id:id_session})
}


//Suppression
function delConference(id){
    return requeteSec('/delConference',{conf_id:id})
}
function delSession(id){
    return requeteSec('/delSession',{session_id:id})
}
function delWorkshop(id){
    return requeteSec('/delWorkshop',{workshop_id:id})
}
function delArticle(id){
    return requeteSec('/delArticle',{article_id:id})
}
function delUser(id){
    return requeteSec('/delUser',{user_id:id})
}



function confirmerUser(id){
    return requeteSec('/confirmerUser',{user_id:id})
}