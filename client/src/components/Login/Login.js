import React, { Component } from "react";
import {Button, FormGroup, FormControl, ButtonGroup} from "react-bootstrap";
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import "./Login.css";

import {userActions} from "../../_actions";

class Login extends Component {
  constructor(props) {
    super(props);

    //this.props.dispatch(userActions.logout())

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit =  event => {
    event.preventDefault();
    const {email, password } = this.state;
    const { dispatch } = this.props;
    if(email && password){
        dispatch(userActions.login(email,password));
    }
  };



  render() {
      return (
          <div className="Login">
              <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="email" bsSize="large" >
                      <label>Email</label>
                      <FormControl
                          autoFocus
                          type="email"
                          value={this.state.email}
                          onChange={this.handleChange}

                      />
                  </FormGroup>
                  <FormGroup controlId="password" bsSize="large">
                      <label>Password</label>
                      <FormControl
                          value={this.state.password}
                          onChange={this.handleChange}
                          type="password"
                      />
                  </FormGroup>
                  <ButtonGroup
                      size="lg"
                  >
                      <Button
                          size="lg"
                          disabled={!this.validateForm()}
                          type="submit"
                      >
                          Login
                      </Button>
                      <Link
                          to="/register"
                      >
                          <Button
                              size="lg"
                          >Register</Button>
                      </Link>
                  </ButtonGroup>
              </form>
              <br/><br/>
              <p>{this.state.statusMsg}</p>
          </div>
      );
  }
}

function mapStateToProps(state){
    const {loggingIn} = state.authentification;
    return{
        loggingIn
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }