import React, { Component } from "react";
import {Button, FormGroup, FormControl, ButtonGroup, Form, Col, InputGroup, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./Register.css";
import {history} from "../../_helpers";

import {userService} from "../../_services";

class Register extends Component{

    constructor(props) {
        super(props);

        //this.props.dispatch(userActions.logout())

        this.state = {
          nom: '',
          username: '',
          email: '',
          password: '',
          passwordC: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = this.state;
    userService.register(user)
        .then(result => {
          history.push('/login')
        })
        .catch(err => {
          console.log(err)
        });
  }

    validateForm(){
      return (this.state.nom.length > 0 && this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && ( this.state.password === this.state.passwordC));
  }


    render(){
      return (
          <div className="Register">
            <Form
                onSubmit={this.handleSubmit}
            >
              <h3>Informations personnelles : Organisateur</h3>
              <Form.Row>
                <br/>
                <Form.Group as={Col} md="6" controlId="nom">
                  <Form.Label>Nom *</Form.Label>
                  <Form.Control
                      required
                      value={this.state.nom}
                      type="text"
                      placeholder="Nom"
                      onChange={this.handleChange}

                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="username">
                  <Form.Label>Username *</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleChange}
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

                <Form.Group as={Col} md="4" controlId="email">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                      type="email"
                      value={this.state.email}
                      placeholder="test@test.com"
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="password">
                  <Form.Label>Mot de passe *</Form.Label>
                  <Form.Control
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Mot de passe"
                      required/>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="passwordC">
                  <Form.Label>Confirmer le mot de passe *</Form.Label>
                  <Form.Control
                      type="password"
                      value={this.state.passwordC}
                      onChange={this.handleChange}
                      placeholder="Confimer votre mot de passe."
                      required/>
                </Form.Group>
              </Form.Row>

              <ButtonGroup
                  size="lg"
              >
                <Button
                    size="lg"
                    disabled={!this.validateForm()}
                    type="submit"
                >
                  Validate
                </Button>
                <Link
                    to="/login"
                >
                  <Button
                      size="lg"
                  >Cancel</Button>
                </Link>
              </ButtonGroup>
            </Form>

          </div>
      );
    }
}

export {Register};
