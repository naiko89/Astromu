import React from 'react';
import '../styles/forms.css';

class FormFirstInsert extends React.Component{

    constructor(props) {
        super(props)
        this.props = props
        this.handleCompositionAdd = props.add
        this.handleCompositionRedit = props.redit

        this.state= {textarea:'',select:''}

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        alert('form montanto')
    }




    handleSubmit(event){
        event.preventDefault()
        this.handleCompositionAdd({'type':this.state.select, 'text': this.state.textarea})
        if(!this.props.modify.trigger) {
            alert('aggiungi sub')
            this.setState({textarea:'',select:''})
        }
        else if(this.props.modify.trigger) {
            alert('modifica sub')
            // this.setState((state, props) => ({
            //    textarea: state.textarea,
            //    select: state.select
            //}));
        }

    }

    onChange(event){
        this.setState({[event.target.name] : event.target.value})
    }


    render() {
        let value = new Date()
        // alert(JSON.stringify(this.state))
        // console.log('<----->') console.log(this.props) console.log('<----->')
        // alert(JSON.stringify(this.modify))

        // alert('rendering del form 1 -->'+ JSON.stringify(this.props))
        // alert('rendering del form 2 -->'+ JSON.stringify(this.modify))
        // alert('rendering del form 3 -->'+ JSON.stringify(this.props.modify))


        console.log(this.state)

        //this.setState(this.props.modify)

        return(
            <>
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
                            <input className={"btn btn-success"} type='submit' value="Aggiungi"/>
                        </div>
                    </div>
                </form>
                <h3></h3>
            </>
        )
    }
}


export default FormFirstInsert