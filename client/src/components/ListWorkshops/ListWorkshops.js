import React,{Component} from 'react';

import {Route} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import ReactTable from "react-table";
import {GetSelectConferences} from "../getSelectConferences";
import {GetSelectSessions} from "../getSelectSessions";
import {adminServices, userService} from "../../_services";
import Swal from "sweetalert2";


export class ListWorkshops extends Component{


    constructor(props){
        super(props);

        this.state={
            selectedConf: null,
            selectedSession: null,
            data : [],
            columns: [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.id)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name'
                },
                {
                    Header: 'Location',
                    accessor: 'location'
                },
                {
                    Header: 'Subject',
                    accessor: 'subject'
                },
                {
                    Header: 'ID_conference',
                    accessor: 'id_conference'
                },
                {
                    Header: 'ID_session',
                    accessor: 'id_session'
                },
            ]
        }
    }

    submitClick =(value) =>{
        Swal.fire({
            title: 'Suprimmer le workshop?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                userService.delWorkshop(value)
                Swal.fire(
                    'Supprimé!',
                    'Workshop a bien été supprimé.',
                    'success'
                )
            }
            window.location.reload();
        })
    }

    onChangeSelectConf(newConf){
        this.setState({
            selectedConf: newConf
        })

        userService.getWorkshopC(newConf)
            .then(result => {
                this.setState({
                    data:result
                })
            })
            .catch(err =>{

            })
    }

    onChangeSelectSession(newSession) {
        this.setState({
            selectedSession: newSession
        })

        userService.getWorkshopS(newSession)
            .then(result => {
                this.setState({
                    data:result
                })
            })
            .catch(err =>{

            })
    }



    render() {
        return (
            <div>
                <h2>Vos Workshops : </h2>
                <br/>
                <Route render={({ location, history }) => (
                    <Button onClick={()=>{
                        history.push("/HomeUser/AddWorkshop")
                    }}>Créer un nouvel Workshop</Button>
                )}
                />

                <br/>

                <Form.Group controlId="SelectConferences">
                    <Form.Label>Choisir la conférence :</Form.Label>
                    <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
                </Form.Group>

                <br/>

                <Form.Group controlId="SelectSessions">
                    <Form.Label>Choisir la session :</Form.Label>
                    <GetSelectSessions confSelected={this.state.selectedConf} changeSelectSession={this.onChangeSelectSession.bind(this)}/>
                </Form.Group>
                <br/>


                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data}
                    columns={this.state.columns}
                />
            </div>
        );
    }
}