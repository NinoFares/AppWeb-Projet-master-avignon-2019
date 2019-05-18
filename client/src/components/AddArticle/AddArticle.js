import React,{Component} from 'react';


import {GetSelectConferences} from "../getSelectConferences";
import {userService} from "../../_services";
import {Button, FormGroup, FormControl, FormLabel,Form} from "react-bootstrap";
import {GetSelectSessions} from "../getSelectSessions";

import Swal from 'sweetalert2';
import {history} from "../../_helpers";


export class AddArticle extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedConf: null,
            selectedSession: null,
            name: '',
            subject: '',
            auteur: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm() {
        return this.state.selectedSession != null &&  this.state.name.length > 0 &&  this.state.subject.length > 0 && this.state.auteur.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = this.state;
        payload._id = JSON.parse(localStorage.getItem('user'))._id
        userService.addArticle(payload)
            .then(result => {
                Swal.fire(
                    'Article crée',
                    'Votre Article a bien été créer',
                    'success'
                )
                history.push('/HomeUser/ListArticles')
            })
            .catch(err => {
                console.log("Requete refusé !")
            })
    }

    onChangeSelectConf(newConf){
        this.setState({
            selectedConf: newConf
        })
    }

    onChangeSelectSession(newSession){
        this.setState({
            selectedSession: newSession
        })
    }

    render() {
        return (
            <div>
                <br/>
                <h2>Ajouter un article :</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="SelectConferences">
                        <Form.Label>Choisir la conférence :</Form.Label>
                        <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
                    </Form.Group>

                    <Form.Group controlId="SelectSessions">
                        <Form.Label>Choisir la session :</Form.Label>
                        <GetSelectSessions confSelected={this.state.selectedConf} changeSelectSession={this.onChangeSelectSession.bind(this)}/>
                    </Form.Group>

                    <FormGroup controlId="name" bsSize="large">
                        <FormLabel>Nom :</FormLabel>
                        <FormControl
                            type="text"
                            autoFocus
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="subject" bsSize="large">
                        <FormLabel>Sujet du workshop :</FormLabel>
                        <FormControl
                            type="text"
                            autoFocus
                            value={this.state.subject}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="auteur" bsSize="large">
                        <FormLabel>Auteur :</FormLabel>
                        <FormControl
                            type="text"
                            autoFocus
                            value={this.state.auteur}
                            onChange={this.handleChange}
                        />
                    </FormGroup>


                    <Button
                        type="submit"
                        size="lg"
                        disabled={!this.validateForm()}
                    >
                        Créer Workshop
                    </Button>
                </Form>
            </div>
        );
    }
}