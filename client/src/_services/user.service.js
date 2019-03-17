import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    addConference,
    getProfil

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
}


function register(user){
    return axios.post(
        '/register',
        JSON.stringify(user))
        .then(response =>{
            console.log(response)
        })
        .catch();
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

function getProfil(id) {
    return axios.post('/profil',
        JSON.stringify(id))
        .then(response =>{
        return response.data;
    })
    .catch (err => {
        return Promise.reject("Erreur, import profil")
    })
}


//function getConferece(id){
  //  return
//}


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