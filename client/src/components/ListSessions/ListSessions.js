import React,{Component} from 'react';


import {Route} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import ReactTable from "react-table";
import {GetSelectConferences} from "../getSelectConferences";
import {adminServices, userService} from "../../_services";
import Swal from "sweetalert2";


export class ListSessions extends Component{


    constructor(props){
        super(props);

        this.state={
            selectedConf: null,
            data : [],
            columns : [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.id)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    Header : 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'title'
                },
                {
                    Header:'Location',
                    accessor:'location'
                },
                {
                    Header: 'Date Begin',
                    accessor: 'date_begin'
                },
                {
                    Header: 'Date End',
                    accessor: 'date_end'
                },
                {
                    Header: 'ID_conference',
                    accessor: 'id_conference'
                },
                {
                    Header: 'Session Chear',
                    accessor: 'session_chear'
                },
                {
                    Header: 'Description',
                    accessor: 'description'
                },
            ]
        }
    }

    submitClick =(value) =>{
        Swal.fire({
            title: 'Suprimmer la Session?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                userService.delSession(value)
                Swal.fire(
                    'Supprimé!',
                    'Session a bien été supprimé.',
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

        userService.getSession(newConf)
            .then(result =>{
                this.setState({
                    data:result
                })
            })
            .catch(err=>{

            })
    }

    render() {
        return (
            <div>
                <h2>Vos Sessions : </h2>
                <br/>
                <Route render={({ location, history }) => (
                    <Button onClick={()=>{
                        history.push("/HomeUser/AddSession")
                    }}>Créer une nouvelle Session</Button>
                )}
                />
                <br/>

                <Form.Group controlId="SelectConferences">
                    <Form.Label>Choisir la conférence :</Form.Label>
                    <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
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