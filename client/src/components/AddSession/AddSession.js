import React,{ Component } from 'react';

import {GetSelectConferences} from "../getSelectConferences";
import {userService} from "../../_services";
import {Button, FormGroup, FormControl, FormLabel,Form} from "react-bootstrap";
import DataPicker from 'react-datepicker';

import Swal from 'sweetalert2';
import {history} from "../../_helpers";

import "react-datepicker/dist/react-datepicker.css";

export class AddSession extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedConf: null,
            name: '',
            location: '',
            session_chear: '',
            description: '',
            date_begin: new Date(),
            date_end: new Date(),
            heure_debut: new Date()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBegin = this.handleChangeBegin.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleChangeBegin = (date) =>{
        this.setState({
            date_begin: date
        })
    }
    handleChangeEnd = (date) =>{
        this.setState({
            date_end: date
        })
    }
    handleChangeHeure = (date) =>{
        date.setHours(date.getHours())
        this.setState({
            heure_debut: date
        })
    }

    validateForm() {
        return this.state.selectedConf != null &&  this.state.name.length > 0 && this.state.location.length > 0 && this.state.session_chear.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = this.state;
        payload._id = JSON.parse(localStorage.getItem('user'))._id
        userService.addSession(payload)
            .then(result => {
                Swal.fire(
                    'Session crée',
                    'Votre session a bien été créer',
                    'success'
                )
                history.push('/HomeUser/ListSessions')
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

        render() {
            return (
                <div>
                    <br/>
                    <h2>Ajouter une session :</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="SelectConferences">
                            <Form.Label>Choisir la conférence :</Form.Label>
                            <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
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

                        <FormGroup controlId="location" bsSize="large">
                            <FormLabel>Location :</FormLabel>
                            <FormControl
                                type="text"
                                autoFocus
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="session_chear" bsSize="large">
                            <FormLabel>Session Chear :</FormLabel>
                            <FormControl
                                type="text"
                                autoFocus
                                value={this.state.session_chear}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="description" bsSize="large">
                            <FormLabel>Description :</FormLabel>
                            <FormControl
                                type="text"
                                autoFocus
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </FormGroup>


                        <FormGroup controlId="date_begin" bsSize="large">
                            <FormLabel>Date begin : &nbsp;&nbsp;</FormLabel>
                            <DataPicker selected={this.state.date_begin} onChange={this.handleChangeBegin}/>
                        </FormGroup>

                        <FormGroup controlId="date_end" bsSize="large">
                            <FormLabel>Date End : &nbsp;&nbsp;</FormLabel>
                            <DataPicker selected={this.state.date_end} onChange={this.handleChangeEnd}/>
                        </FormGroup>

                        <FormGroup controlId="heure_debut" bsSize="large">
                            <FormLabel>Heure : &nbsp;&nbsp;</FormLabel>
                            <DataPicker
                                selected={this.state.heure_debut}
                                onChange={this.handleChangeHeure}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="h:mm aa"
                                timeCaption="Time"
                            />
                        </FormGroup>


                        <Button
                            type="submit"
                            size="lg"
                            disabled={!this.validateForm()}
                        >
                            Créer Session
                        </Button>
                    </Form>
                </div>
            );
    }
}