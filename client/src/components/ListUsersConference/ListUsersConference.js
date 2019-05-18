import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices, userService} from "../../_services";

import 'react-table/react-table.css'

import {GetSelectConferences} from "../getSelectConferences";
import {Button} from "react-bootstrap";
import Swal from "sweetalert2";


export class ListUsersConference extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedConf:null,
            data : [],
            data2: [],
            columns : [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.email)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    Header : 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Prénom',
                    accessor: 'surname'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Téléphone',
                    accessor: 'phone'
                },
                {
                    Header: 'Profession',
                    accessor: 'profession'
                },
                {
                    Header: 'Pays',
                    accessor: 'pays'
                },
                {
                    Header: 'Session',
                    accessor: 'title'
                },
            ],
            columns2 : [
                {
                    id: "checkbox",
                    Cell: props => <Button variant="danger" onClick={() => this.submitClick(props.original.email)}><i className="fas fa-trash-alt"></i></Button>
                },
                {
                    id: "checkbox",
                    Cell: props => <Button variant="success" onClick={() =>this.submitClick2(props.original.email)}><i className="fas fa-check"></i></Button>
                },
                {
                    Header : 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Prénom',
                    accessor: 'surname'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Téléphone',
                    accessor: 'phone'
                },
                {
                    Header: 'Profession',
                    accessor: 'profession'
                },
                {
                    Header: 'Pays',
                    accessor: 'pays'
                },
                {
                    Header: 'Session',
                    accessor: 'title'
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
                userService.delUser(value)
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
        console.log()
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
                userService.confirmerUser(value)
                Swal.fire(
                    'Confirmer!',
                    'L\'utilisateur a bien été confirmé.',
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
        userService.getListUsersConf(newConf)
            .then(result =>{
                this.setState(()=>{
                    return {data:result}
                })
            })
            .catch(err =>{
                console.log(err);
            })
        userService.getListUsersConfN(newConf)
            .then(result =>{
                this.setState({
                    data2:result
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }

    render() {

        return (
            <div>
                <h2>Liste des utilisateurs de la conference : </h2>
                <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
                <br/>

                <h3>Users non confirmé : </h3>

                <br/>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data2}
                    columns={this.state.columns2}
                />

                <br/>
                <h3>Users confirmé : </h3>
                <ReactTable
                    defaultPageSize={5}
                    data={this.state.data}
                    columns={this.state.columns}
                />
                <br/>
            </div>
        );
    }
}
