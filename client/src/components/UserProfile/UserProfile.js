import React,{Component} from 'react'

import { userService} from "../../_services";


export class UserProfile extends Component{

    constructor(props){
        super(props)

        this.state = {
            nom: '',
            username: '',
            email: '',
            nbreconf:0
        };
    }

    componentDidMount() {
        userService.getProfil(JSON.parse(localStorage.getItem('user'))._id)
            .then(result => {
                return this.setState({nom: result[0].name, username: result[0].username, email: result[0].email})
            })
            .catch(err => {
                console.log(err);
            })
        userService.getConference(JSON.parse(localStorage.getItem('user'))._id)
            .then(result => {
                return this.setState({nbreconf: result.length})
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <h1>Profil de l'organisateur</h1>

                <h2>Nom : {this.state.nom}</h2>
                <h2>Username : {this.state.username}</h2>
                <h2>Email : {this.state.email}</h2>
                <h2>Nombre de Conferences : {this.state.nbreconf}</h2>
            </div>
        );
    }
}

