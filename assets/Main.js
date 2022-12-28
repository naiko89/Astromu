import React from 'react';
import Navbar from "./component/bars/Navbar"
import { Outlet } from "react-router-dom";

const $ = require('jquery');

class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: $('#app').data('user')
        }
    }


    render() {

        return (
            <div className="Main">
                <Navbar nomeUser = {this.state.name}/>

                <div id="resizable" className="bg-danger"></div>

                <div className="">
                    <Outlet></Outlet>
                </div>
            </div>

        );
    }
}

export default Main;
