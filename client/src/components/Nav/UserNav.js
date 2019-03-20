import React,{ Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './index.css'
import {BrowserRouter,Route} from 'react-router-dom';
import {HomeUser} from "../Home";
import { history } from "../../_helpers";
import {userActions} from "../../_actions";

import {AddConference} from "../AddConference";
import {ListConferences} from "../ListConferences";
import withAuth from "../Routes";


class UserNav extends Component{

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
                                const to = '/HomeUser/' + selected;
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
                                <NavItem eventKey="AddConference">
                                    <NavIcon>
                                        <i className="fas fa-plus" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Nouvelle Conference
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="ListConferences">
                                    <NavIcon>
                                        <i className=" fas fa-list-ul" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Liste des Conferences
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
                            <Route path="/HomeUser/AddConference" component={withAuth(props => <AddConference />)} />
                            <Route path="/HomeUser/ListConferences" component={withAuth(props => <ListConferences />)} />
                        </main>
                    </React.Fragment>
                )}
                />
            </BrowserRouter>


        )
    }
}

export {UserNav};