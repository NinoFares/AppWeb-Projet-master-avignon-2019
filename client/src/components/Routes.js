import React,{Component} from 'react'
import {Route, Redirect} from "react-router-dom";

import axios from 'axios';

export default function withAuth(ComponentToProtect){

    return class extends Component{

        constructor(props){
            super(props);

            this.state = {
                loading:true,
                redirect:false
            };
        }

        componentDidMount() {

            axios.post('/checkToken')
                .then(response => {
                    if (response.status === 200){
                        this.setState({loading:false})
                    } else {
                        const error = new Error(response.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {

            const {loading,redirect } = this.state;

            if(loading){
                return null;
            }
            if(redirect){
                return <Redirect to="/login"/>
            }

            return(
                <React.Fragment>
                    <ComponentToProtect {...this.props}/>
                </React.Fragment>
            )
        }
    }

}