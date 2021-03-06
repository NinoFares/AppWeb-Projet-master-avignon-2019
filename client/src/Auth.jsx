/**
 * Route spécial pour la rediréction si l'utilisateur est deja connecté en vérifiant le token.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Login } from './components/Login'

import axios from 'axios';

export default function withAuth(ComponentToProtect) {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
            };
        }


        componentDidMount() {
            if(localStorage.getItem('user')){
                axios.post('/checkToken', {token: JSON.parse(localStorage.getItem('user')).token})
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({loading: false});
                        } else {
                            const error = new Error(res.error);
                            throw error;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        this.setState({loading: false, redirect: true});
                    });
            }
            else
                this.setState({loading:false,redirect:true})

        };



        render() {
            const {loading, redirect} = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" component={Login}/>;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    };

};