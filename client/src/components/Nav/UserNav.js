/**
 * Menu de navigation d'utilisateur
 */

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
import {ListSessions} from "../ListSessions";
import {ListWorkshops} from "../ListWorkshops";
import {ListArticles} from "../ListArticles";


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
                                    this.props.onChangeComponentSelected(selected);
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
                                <NavItem eventKey="ListConferences">
                                    <NavIcon>
                                        <i className=" fa fa-address-card" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Conferences
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="ListSessions">
                                    <NavIcon>
                                        <i className="fas fa-plus" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Sessions
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="ListWorkshops">
                                    <NavIcon>
                                        <i className="fas fa-hammer" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Workshops
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="ListArticles">
                                    <NavIcon>
                                        <i className="fas fa-newspaper" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Articles
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
                                        Déconnexion
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>

                        <main>
                            <Route path="/" exact component={withAuth(props => <HomeUser />)} />
                            <Route path="/HomeUser/AddConference" component={withAuth(props => <AddConference />)} />
                            <Route path="/HomeUser/ListConferences" component={withAuth(props => <ListConferences />)} />
                            <Route path="/HomeUser/ListSessions" component={withAuth(props => <ListSessions />)} />
                            <Route path="/HomeUser/ListWorkshops" component={withAuth(props => <ListWorkshops />)} />
                            <Route path="/HomeUser/ListArticles" component={withAuth(props => <ListArticles />)} />
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