import React from "react";
import FormResearch from "../../forms/FormResearch";

class CompositionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state={searchValue: false, list:[]}
        this.onChange = this.onChange.bind(this)
    }

    getList(value){
        return fetch(`/api/compositions/${value}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                this.setState({list:JSON.parse(data)})
            })
            .catch(error => console.error(error));
    }

    componentDidMount() {
        this.getList(false)
    }

    onChange(event){
        let value = event.target.value ? event.target.value : null
        this.setState({searchValue:event.target.value})
        this.getList(value)
    }

    render() {

        let value = this.state.searchValue ? this.state.searchValue : ''
        let temp = JSON.stringify(this.state)

        return(
            <>
            <nav className="navbar navbar-light bg-light justify-content-between border-bottom">
                <a className="navbar-brand"></a>
                        <FormResearch onChangeSup={this.onChange} value={value}></FormResearch>
            </nav>
            <div>{temp}</div>
            </>
        )
    }


}



export default CompositionsList;