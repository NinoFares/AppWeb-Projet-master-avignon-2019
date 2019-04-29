import React,{Component} from 'react';

import Select from 'react-select'
import {userService} from "../../_services";
import {forEach} from "react-bootstrap/es/utils/ElementChildren";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

export class GetSelectConferences extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedOption: null,
            options: []
        }
    }

    handleChange = (selectedOption) =>{
        this.setState({selectedOption});
    }

    componentDidMount() {
        userService.getConferece(JSON.parse(localStorage.getItem('user'))._id)
            .then(result=>{
                console.log(result)

            })
            .catch(err =>{
                console.log(err)
            })

    }

    render() {
        const {selectedOption} = this.state;
        return(
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        )
    }
}
