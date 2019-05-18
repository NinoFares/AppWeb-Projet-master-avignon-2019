import React,{Component} from 'react';

import {Button, FormGroup, FormControl, FormLabel,Form} from "react-bootstrap";
import DataPicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import {userService} from "../../_services";
import Swal from 'sweetalert2'
import {Route} from 'react-router-dom'
import {history} from "../../_helpers";


// TODO: Arranger l'envoie de photo

class AddConference extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            logo: '',
            date_begin: new Date(),
            date_end: new Date(),
            topic: ''
        };

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

    validateForm() {
        return this.state.name.length > 0 && this.state.topic.length > 0;
    }

    handleSubmit(event){
        event.preventDefault();
        let payload = this.state;
        payload._id = JSON.parse(localStorage.getItem('user'))._id
        userService.addConference(payload)
            .then(result => {
                Swal.fire(
                    'Conference crée',
                    'Votre conférence sera modifiable que quand un administrateur la validera',
                    'success'
                );
                history.push('/HomeUser/ListConferences');
            })
            .catch(err =>{
                console.log("Requete refusé !")
            })

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <br/>
                <h2>Ajouter une conférence :</h2>
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup controlId="name" bsSize="large">
                        <FormLabel>Nom :</FormLabel>
                        <FormControl
                            type="text"
                            autoFocus
                            value={this.state.name}
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

                    <FormGroup controlId="logo" bsSize="large">
                        <FormLabel>Logo :</FormLabel>
                        <FormControl
                            type="file"
                            autoFocus
                            value={this.state.logo}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="date_begin" bsSize="large">
                        <FormLabel>Date begin :</FormLabel>
                        <DataPicker selected={this.state.date_begin} onChange={this.handleChangeBegin}/>
                    </FormGroup>

                    <FormGroup controlId="date_end" bsSize="large">
                        <FormLabel>Date End :</FormLabel>
                        <DataPicker selected={this.state.date_end} onChange={this.handleChangeEnd}/>
                    </FormGroup>

                    <FormGroup controlId="topic" bsSize="large">
                        <FormLabel>Topic :</FormLabel>
                        <FormControl
                            type="text"
                            autoFocus
                            value={this.state.topic}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={!this.validateForm()}
                    >
                        Créer
                    </Button>
                </Form>
            </div>
        );
    }
}

export {AddConference}