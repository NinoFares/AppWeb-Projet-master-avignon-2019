/**
 * Page qui affiche toutes les conferennces interface administrateur
 */

import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices} from "../../_services";

import 'react-table/react-table.css'
import {Button} from "react-bootstrap";
import Swal from "sweetalert2";


class Conferences extends Component{

    constructor(props){
        super(props);

        this.state={
            data : [],
            columns : [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.id)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    id: "checkbox2",
                    Cell: props => <Button variant="success" onClick={() => this.submitClick2(props.original.id)}><i className="fas fa-check"></i></Button>
                },
                {
                    Header : 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name'
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
                    Header: 'ID_User',
                    accessor: 'id_user'
                },
                {
                    Header: 'Topic',
                    accessor: 'topic'
                },
            ],
            data2 : [],
            columns2 : [
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
                    accessor: 'name'
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
                    Header: 'ID_User',
                    accessor: 'id_user'
                },
                {
                    Header: 'Topic',
                    accessor: 'topic'
                },
            ],
        }

    }


    componentDidMount() {
        adminServices.getConferencesC()
            .then(result =>{
                this.setState(()=>{
                    return {data2:result}
                })
            })
            .catch(err =>{
                console.log(err);
            })
        adminServices.getConferencesN()
            .then(result =>{
                this.setState(()=>{
                    return {data:result}
                })
            })
            .catch(err =>{
                console.log(err);
            })
    }

    submitClick =(value) =>{
        Swal.fire({
            title: 'Suprimmer la conference?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                adminServices.delConference(value)
                Swal.fire(
                    'Supprimé!',
                    'La conference a bien été supprimé.',
                    'success'
                )
            }
            window.location.reload();
        })
    }

    submitClick2 =(value) =>{
        Swal.fire({
            title: 'Confirmer la conference ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Confirmer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                adminServices.confirmeConference(value)
                Swal.fire(
                    'Confirmer!',
                    'La conférencen a bien été confirmé.',
                    'success'
                )
            }
            window.location.reload();

        })
    }


    render() {

        return (
            <div>
                <h2>Conferences : </h2>
                <br/>
                <h3>Conférence non confirmé : </h3>
                <br/>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data}
                    columns={this.state.columns}
                />
                <br/>
                <h3>Conférence confirmé : </h3>
                <br/>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data2}
                    columns={this.state.columns2}
                />
            </div>
        );
    }
}

export {Conferences}
