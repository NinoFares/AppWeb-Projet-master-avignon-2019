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
import {AddSession} from "../AddSession"
import {AddWorkshop} from "../AddWorkshop"
import {AddArticle} from "../AddArticle"
import {ListUsersConference} from '../ListUsersConference'
import withAuth from "../../Auth"


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
                                <NavItem eventKey="AddSession">
                                    <NavIcon>
                                        <i className="fas fa-plus" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Nouvelle Session
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="AddWorkshop">
                                    <NavIcon>
                                        <i className="fas fa-plus" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Nouveau Workshop
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="AddArticle">
                                    <NavIcon>
                                        <i className="fas fa-plus" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Nouveau Article
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
                                <NavItem eventKey="ListUsersConf">
                                    <NavIcon>
                                        <i className="fas fa-users" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Liste des Users
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
                            <Route path="/HomeUser/AddSession" component={withAuth(props => <AddSession />)} />
                            <Route path="/HomeUser/AddWorkshop" component={withAuth(props => <AddWorkshop />)} />
                            <Route path="/HomeUser/AddArticle" component={withAuth(props => <AddArticle />)} />
                            <Route path="/HomeUser/ListUsersConf" component={withAuth(props => <ListUsersConference />)} />
                        </main>
                    </React.Fragment>
                )}
                />
            </BrowserRouter>


        )
    }
}

export {UserNav};