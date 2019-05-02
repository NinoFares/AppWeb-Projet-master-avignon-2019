import React,{Component} from 'react';

import {UserProfile} from '../UserProfile'
import {UserNav} from "../Nav";

class HomeAdmin extends Component{
    constructor(props) {
        super(props);

        this.state={}

    }

    render() {
        return(
            <div>
                <UserProfile/>
                <UserNav/>
            </div>
        )
    }

}

export {HomeAdmin};