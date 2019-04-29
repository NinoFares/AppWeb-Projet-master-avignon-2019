import React,{Composant} from 'react'

import {adminServices} from "../../_services";


class UserProfile extends Composant{

    constructor(props){
        super(props)

        this.state={

        }
    }

    componentDidMount() {
       /* adminServices.getProfil()
            .then(result =>{
            this.setState(()=>{
                return {data:result}
            })
    })
    .catch(err =>{
            console.log(err);
    })*/
    }

    render() {
        return (
            <div>


            </div>
        );
    }
}

