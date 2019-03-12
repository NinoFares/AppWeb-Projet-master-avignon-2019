import React,{Component} from 'react';

import {UserNav} from '../Nav';
import {history} from "../../_helpers";

class HomeUser extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h1>User Page</h1>

                <UserNav/>

            </div>
        )
    }

}

export {HomeUser};