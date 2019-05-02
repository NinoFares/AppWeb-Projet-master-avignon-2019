import React,{Component} from 'react';

import {UserProfile} from '../UserProfile'
import {AdminNav} from "../Nav";

class HomeAdmin extends Component{
    constructor(props) {
        super(props);

        this.state={}

    }

    render() {
        return(
            <div>
                <UserProfile/>
                <AdminNav/>
            </div>
        )
    }

}

export {HomeAdmin};