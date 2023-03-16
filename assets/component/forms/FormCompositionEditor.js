import React from 'react';
import '../../styles/forms.css';

class FormCompositionEditor extends React.Component{

    constructor(props) {
        super(props)
        this.props = props
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleModify = this.handleModify.bind(this)

    }

    handleSubmit(event){
        event.preventDefault()
        this.props.handleSubmitCard()

    }

    handleModify(event){
        event.preventDefault()
        this.props.handleModifyCard()

    }

    render() {
        let textarea = this.props.formValues.textarea //-->here to textarea new line
        let select = this.props.formValues.select
        let submit,formAction

        if(!this.props.formValues.trigger){
            submit='Aggiungi'
            formAction = this.handleSubmit
        }
        else{
            submit='Modifica'
            formAction = this.handleModify
        }

        return(
            <>
                <form className="container p-0" onSubmit={formAction}>
                    <div className="row mb-2">
                        <div className="col-12">
                            <select id="tipo-testo" value={select || false} className="form-select form-select-sm text-center" onChange={this.props.onChangeSup} name="select">
                                <option value="false">Seleziona la Definizione</option>
                                <option value="S">S</option>
                                <option value="R">R</option>
                                <option value="RM">RM</option>
                            </select>
                        </div>

                        <div className="col-12 mt-2">

                            <textarea
                                className="form-control form-control-sm textarea-compact p-1"
                                onChange={this.props.onChangeSup}
                                value={textarea || ""}
                                name="textarea"
                                rows="4"
                                placeholder="Inserisci il testo qui..."
                            />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className={"btn btn-success btn-sm"} type="submit">
                                {submit}
                            </button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}


export default FormCompositionEditor