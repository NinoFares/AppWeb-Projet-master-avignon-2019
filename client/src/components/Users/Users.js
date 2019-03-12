import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices} from "../../_services";

import 'react-table/react-table.css'


class Users extends Component{

    constructor(props){
        super(props);

        this.state={
            data : [],
            columns : [
                {
                    Header : 'ID',
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


    componentDidMount() {
        adminServices.getUsers()
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
                <h2>Users : </h2>
                <ReactTable
                data={this.state.data}
                columns={this.state.columns}
                />
            </div>
        );
    }
}

export {Users}
