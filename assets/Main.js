import React from 'react';
import AstromuNavbar from "./component/bars/AstromuNavbar"
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
            <div className="Main ">
                <AstromuNavbar nomeUser = {this.state.name}/>

                <div id="resizable" className="bg-danger"></div>

                <div className="pb-sm-2">
                    <Outlet></Outlet>
                </div>
            </div>

        );
    }
}

export default Main;
