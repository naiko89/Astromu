import React from 'react';
import '../styles/forms.css';

class FormFirstInsert extends React.Component{

    constructor(props) {
        super(props)
        this.props = props
        this.state= {textarea:'',select:''}
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        //alert('costruttore')

    }

    onChange(event){
          let formValues = this.state
          formValues[event.target.name] = event.target.value
          this.setState({handleValues: formValues})
          //    this.props.onChangeSup(event)
    }

    handleSubmit(event){
        event.preventDefault()
        if(this.props.formValues.trigger===false){
            this.props.handleSubmitCard(this.state)
            alert('aggiungi')
            this.setState({textarea:'',select:''})

        }

        else{
            this.props.handleSubmitCard(this.state)
            alert('modifica')
        }


    }


    render() {
        let value = new Date()
        let SubmitValue = this.state.trigger = true ? 'Modifica' : 'Aggiungi'

        // alert(JSON.stringify(this.state))
        // console.log('<----->') console.log(this.props) console.log('<----->')
        // alert(JSON.stringify(this.modify))

        //alert('render del form')




        //console.log(this.state)

        //this.setState(this.props.modify)

        return(
            <>

                {JSON.stringify(this.props.formValues)}

                <form className="container p-0" onSubmit={this.handleSubmit}>
                    <div className="row mb-2">
                        <div className="col-12 mb-2">
                            <select id="tipo-testo" value={this.state.select} className="form-select text-center" onChange={this.onChange} name="select">
                                <option value="null">Seleziona il tipo di testo</option>
                                <option value="S">S</option>
                                <option value="R">R</option>
                                <option value="RM">RM</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <textarea className="form-control textarea-compact p-1" onChange={this.onChange} value={this.state.textarea || ""} name="textarea"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <input className={"btn btn-success"} type='submit' value='Aggiungi'/>
                        </div>
                    </div>
                </form>
                <h3></h3>
            </>
        )
    }
}


export default FormFirstInsert