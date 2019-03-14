import React, { Component } from "react";
import {Button, FormGroup, FormControl, ButtonGroup, Form, Col, InputGroup, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import "./Register.css";

import {userActions} from "../../_actions";

class Register extends Component{

    constructor(props) {
        super(props);

        //this.props.dispatch(userActions.logout())

        this.state = {

        };

        /*this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);*/
    }

    render(){
        return(
            <div className="Register">
            <Form
        noValidate
        //validated={validated}
        onSubmit={e => this.handleSubmit(e)}
      >
      <h3>Informations personnelles : Organisateur</h3>
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

        <Form.Group>
          <Form.Check
            required
            label="Accepter les conditions générales pour valider"
            feedback="Vous devez être d'accord avant de vous soumettre."
          />
        </Form.Group>

        <Button type="submit">Valider</Button>
      </Form>

            </div>
        )
    }
}

export {Register};
