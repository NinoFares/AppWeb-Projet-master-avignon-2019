import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
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
            let user = handleResponse(response);
            console.log(user);
             localStorage.setItem('user',JSON.stringify(user));
            })
        .catch(console.log("Error Axios Post"));
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
        .catch(console.log("Error Axios Post"));
}



function handleError(error){
    logout();
    //location.reload(true);
    return Promise.reject(error);
}

function handleResponse(response) {



    return response.text().then(text => {



        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}