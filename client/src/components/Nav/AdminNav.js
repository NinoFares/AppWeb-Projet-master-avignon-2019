import React,{ Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {BrowserRouter,Route} from 'react-router-dom';
import {HomeUser} from "../Home";
import {userActions} from "../../_actions";
import {Users} from '../Users'
import {Conferences} from "../Conferences";
import { history } from "../../_helpers";
import withAuth from "../Routes";



class AdminNav extends Component{

    constructor(props) {
        super(props);

        this.state = {

        }

    }


    logout(){
        userActions.logout();
    }


    render() {
        return(
            <BrowserRouter>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/HomeAdmin/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="home">
                                <NavItem eventKey="home">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Home
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Conferences">
                                    <NavIcon>
                                        <i className="fas fa-address-card" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Conferences
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Users" >
                                    <NavIcon>
                                        <i className="fas fa-users" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Users
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Logout" onClick={this.logout}>
                                    <NavIcon>
                                        <i className="fas fa-power-off" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Log Out
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                            <Route path="/" exact component={withAuth(props => <HomeUser />)} />
                            <Route path="/HomeAdmin/Users" component={withAuth(props => <Users />)} />
                            <Route path="/HomeAdmin/Conferences" component={withAuth(props => <Conferences />)} />
                        </main>
                    </React.Fragment>
                )}
                />
            </BrowserRouter>


        )
    }
}

export {AdminNav};