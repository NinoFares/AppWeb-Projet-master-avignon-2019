import React,{Component} from 'react';

import {AdminNav} from "../Nav";
import {adminServices, userService} from "../../_services";


class HomeAdmin extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h1>Admin Page</h1>
                <AdminNav/>
            </div>
        )
    }
}

export {HomeAdmin};
