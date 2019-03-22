import React,{Component} from 'react';

import {UserNav} from '../Nav';
import {userService} from "../../_services";
import {Button, FormGroup, FormControl, ButtonGroup, Form, Col, InputGroup, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';



class HomeUser extends Component{
    constructor(props) {
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
                <h1>Profil de l'organisateur</h1>

                <UserNav/>

            </div>
        )
    }

}

export {HomeUser};