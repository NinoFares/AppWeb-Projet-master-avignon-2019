/**
 * Page pour afficher la liste des conference d'un utilisateur
 */

import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices, userService} from "../../_services";

import 'react-table/react-table.css'
import {Button} from "react-bootstrap";
import {Route} from "react-router-dom";
import Swal from "sweetalert2";


class ListConferences extends Component{

    constructor(props){
        super(props);

        this.state={
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
            ]
        }

    }

    submitClick =(value) =>{
        Swal.fire({
            title: 'Supprimer la conference?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                userService.delConference(value)
                Swal.fire(
                    'Supprimé!',
                    'La conference a bien été supprimé.',
                    'success'
                )
            }
            window.location.reload();

        })
    }



    componentDidMount() {
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        userService.getConference(user_id)
            .then(result =>{
                this.setState(()=>{
                    return {data:result}
                })
            })
            .catch(err =>{
                console.log(err);
            })
    }


    render() {

        return (
            <div>
                <h2>Vos conferences : </h2>
                <br/>
                <Route render={({ location, history }) => (
                    <Button onClick={()=>{
                        history.push("/HomeUser/AddConference")
                    }}>Créer une nouvelle conférence</Button>
                    )}
                    />
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

export {ListConferences}
