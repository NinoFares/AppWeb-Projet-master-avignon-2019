import React,{Component} from 'react';
import {AdminNav} from "../Nav";
import {adminServices, userService} from "../../_services";
import {Button, FormGroup, FormControl, ButtonGroup, Form, Col, InputGroup, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';



class HomeAdmin extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        userService.getProfil()
            .then(result =>{
                this.setState(()=>{
                    return {data:result}
                })
            })
            .catch(err =>{
                console.log(err);
            })
    }

    render() {
        return(
            <div>
                <h1>Profil de l'administrateur</h1>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Prénom *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Prénom"

                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Nom"

                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username *</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail">
                        <Form.Label>Email  *</Form.Label>
                        <Form.Control type="email" placeholder="nano@nano.com" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formBasicPassword">
                        <Form.Label>Mot de passe *</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formBasicPassword">
                        <Form.Label>Confirmer le mot de passe *</Form.Label>
                        <Form.Control type="password" placeholder="Confimer votre mot de passe." />
                    </Form.Group>
                </Form.Row>



                <Button type="submit">Modifier</Button>

                <AdminNav/>
            </div>
        )
    }
}

export {HomeAdmin};
