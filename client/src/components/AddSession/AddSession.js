import React,{ Component } from 'react';

import {GetSelectConferences} from "../getSelectConferences";
import {Form} from 'react-bootstrap';

export class AddSession extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return(<div>
            <Form.Group controlId="SelectConferences">
                <Form.Label>Choisir la conférence :</Form.Label>
                <GetSelectConferences/>
            </Form.Group>
        </div>);
    }
}