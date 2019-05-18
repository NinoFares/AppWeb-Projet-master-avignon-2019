import React,{Component} from 'react';

import Select from 'react-select'
import {userService} from "../../_services";

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
        this.props.changeSelectConf(selectedOption.value);
    }

    componentDidMount() {
        userService.getConference(JSON.parse(localStorage.getItem('user'))._id)
            .then(result=>{
                let tmp = [result.length]
                for(let i=0;i<result.length;i++){
                    tmp[i] = new Object();
                    tmp[i].value = result[i].id;
                    tmp[i].label = result[i].name
                }
                return this.setState({
                    options: tmp,
                })
            })
            .catch(err =>{
                console.log(err)
            })

    }


    render() {
        return(
            <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.options}
            />
        )
    }
}

