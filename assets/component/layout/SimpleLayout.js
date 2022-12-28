import React from 'react';
import { render } from "react-dom";




class SimpleLayout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    render() {

        const mainColumn = (Array.isArray(this.props.children) ? this.props.children[0] : this.props.children) || null;

        return (
            <div className="d-flex flex-row p-3" style={{height: '100%'}}>
                {mainColumn}
            </div>
        );

    }
}



export {SimpleLayout}