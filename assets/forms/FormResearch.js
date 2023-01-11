import React from 'react';

class FormResearch extends React.Component{

    constructor(props) {
        super(props);
        this.props = props
    }

    render(){

        let search = this.props.value
        return(
            <form className="form-inline my-2 my-lg-0 me-2">
                <input className="form-control form-control-sm mr-sm-2" type="search" placeholder="Search" value={search || ""} onChange={this.props.onChangeSup} aria-label="Search"/>
            </form>
        )
    }
}


export default FormResearch;