import React,{Component} from 'react';


import {GetSelectConferences} from "../getSelectConferences";
import {userService} from "../../_services";
import {Button, FormGroup, FormControl, FormLabel,Form} from "react-bootstrap";

export class AddWorkshop extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedConf: null,
            name: '',
            subject: '',
            location: '',
            date_begin: new Date(),
            date_end: new Date(),
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
        return this.state.selectedConf != null &&  this.state.name.length > 0 &&  this.state.subject.length > 0 && this.state.location.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = this.state;
        payload._id = JSON.parse(localStorage.getItem('user'))._id
        userService.addWorkshop(payload)
            .then(result => {
                console.log("Requete réussis")
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

                <FormGroup controlId="subject" bsSize="large">
                    <FormLabel>Sujet du workshop :</FormLabel>
                    <FormControl
                        type="text"
                        autoFocus
                        value={this.state.subject}
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


                <Button
                    type="submit"
                    size="lg"
                    disabled={!this.validateForm()}
                >
                    Créer Workshop
                </Button>
            </Form>
        );
    }
}
