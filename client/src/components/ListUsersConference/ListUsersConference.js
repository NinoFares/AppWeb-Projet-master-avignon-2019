import React,{Component} from 'react';

import ReactTable from "react-table";
import { userService} from "../../_services";

import 'react-table/react-table.css'
import {GetSelectConferences} from "../getSelectConferences";


export class ListUsersConference extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedConf:null,
            data : [],
            columns : [
                {
                    Header : 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'UserName',
                    accessor: 'username'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Phone',
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
            ]
        }

    }


    onChangeSelectConf(newConf){
        this.setState({
            selectedConf: newConf
        })
        userService.getListUsersConf(this.state.selectedConf)
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
                <h2>Liste des utilisateurs de la conference : </h2>
                <GetSelectConferences changeSelectConf={this.onChangeSelectConf.bind(this)}/>
                <ReactTable
                    data={this.state.data}
                    columns={this.state.columns}
                />
            </div>
        );
    }
}
