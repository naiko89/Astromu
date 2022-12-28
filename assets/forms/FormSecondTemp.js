import React from 'react';

class FormSecondTemp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {valueInputOne:'', valueInputTwo:'',valueInputThree:'', valueTextBox:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({valueInputOne: event.target.value})
    }

    handleSubmit(event){
        alert('stai inviando i dati del form 2')
        event.preventDefault()
    }

    render(){
        return(
            <>
                <h4>Form 2</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Valore Uno:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value="Submit"/>
                </form>
            </>
        )
    }
}


export default FormSecondTemp