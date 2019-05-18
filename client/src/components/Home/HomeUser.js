import React,{Component} from 'react';

import {UserProfile} from '../UserProfile'
import {UserNav} from "../Nav";


class HomeUser extends Component{
    constructor(props) {
        super(props);

        this.state={
            hideToolTip: true,
            component:null
        }

    }

    onChangeComponent = (newComponent)=>{
        if(newComponent != "home")
            this.setState({
                hideToolTip: true
            })
        else
            this.setState({
                hideToolTip:false
            })
    }

    componentDidMount() {
        if(document.URL.endsWith('home') || document.URL.endsWith(('HomeUser')))
            this.setState({
                hideToolTip:false
            })
        else
            this.setState({
                hideToolTip:true
            })
    }

    render() {

        const style = this.state.hideToolTip ? {display: 'none'} : {display: 'block'};

        return(
            <div>
                <div style={style}>
                <UserProfile/>
                </div>
                <UserNav onChangeComponentSelected={this.onChangeComponent.bind(this)}/>
            </div>
        )
    }

}

export {HomeUser};