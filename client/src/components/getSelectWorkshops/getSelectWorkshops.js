/**
 * Select qui affiche les workshop par rapport a une conference choisi
 */

import React,{Component} from 'react';

import Select from 'react-select'
import {userService} from "../../_services";

export class GetSelectWorkshop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
            options: []
        }
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        this.props.changeSelectWorkshop(selectedOption.value);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.confSelected !== prevProps.confSelected) {

            userService.getWorkshop(this.props.confSelected)
                .then(result => {
                    let tmp = [result.length]
                    for (let i = 0; i < result.length; i++) {
                        tmp[i] = new Object();
                        tmp[i].value = result[i].id;
                        tmp[i].label = result[i].title
                    }
                    return this.setState({
                        options: tmp,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
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