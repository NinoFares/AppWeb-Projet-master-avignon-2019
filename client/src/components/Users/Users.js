/**
 * Page pour afficher tout les utilisateur interface administrateur
 */

import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices} from "../../_services";
import Swal from 'sweetalert2';
import {Button} from 'react-bootstrap'

import 'react-table/react-table.css'


class Users extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            data2: [],
            columns: [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.id)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    id: "checkbox2",
                    Cell: props => <Button variant="success" onClick={() => this.submitClick2({id:props.original.id,email:props.original.email})}><i className="fas fa-check"></i></Button>
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
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Role',
                    accessor: 'roles'
                },
            ],
            columns2:
                [
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
                        Header: 'Email',
                        accessor: 'email'
                    },
                    {
                        Header: 'Role',
                        accessor: 'roles'
                    },
                ]
        }

    }

    submitClick =(value) =>{
        Swal.fire({
            title: 'Suprimmer l\'utilisateur?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                adminServices.delUser(value)
                Swal.fire(
                    'Supprimé!',
                    'L\'utilisateur a bien été supprimé.',
                    'success'
                )
            }
            window.location.reload();
        })
    }

    submitClick2 =(value) =>{
        Swal.fire({
            title: 'Confirmer l\'utilisateur ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Confirmer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.value) {
                console.log(value)
                adminServices.confirmerUser(value)
                Swal.fire(
                    'Confirmer!',
                    'L\'utilisateur a bien été confirmé.',
                    'success'
                )
            }
            window.location.reload();

        })
    }

    componentDidMount() {
        adminServices.getUsersConfirme()
            .then(result =>{
                return this.setState({data2:result}
                )
            })
            .catch(err =>{
                console.log(err);
            })
        adminServices.getUsersNConfirme()
            .then(result =>{
                return this.setState({data:result}
                )
            })
            .catch(err =>{
                console.log(err);
            })
    }


    render() {

        return (
            <div>
                <h2>Users : </h2>
                <br/>
                <h3>Utilisateurs non confirmé : </h3>
                <br/>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data}
                    columns={this.state.columns}
                />
                <br/>
                <h3>Utilisateurs confirmé : </h3>
                <br/>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data2}
                    columns={this.state.columns2}
                />
                <br/>
            </div>
        );
    }
}

export {Users}
