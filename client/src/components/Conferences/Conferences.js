import React,{Component} from 'react';

import ReactTable from "react-table";
import {adminServices} from "../../_services";

import 'react-table/react-table.css'


class Conferences extends Component{

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


    componentDidMount() {
        adminServices.getConferences()
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
                <h2>Conferences : </h2>
                <ReactTable
                    data={this.state.data}
                    columns={this.state.columns}
                />
            </div>
        );
    }
}

export {Conferences}
