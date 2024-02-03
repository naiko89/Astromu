import React from 'react';
import '../../styles/forms.css';

class FormCompositionEditor extends React.Component{

    constructor(props) {
        super(props)
        this.props = props
        //this.state = {select: this.props.select, textarea: this.props.textarea}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.onChangeForm = this.onChangeForm.bind(this)

    }

    onChangeForm(event){
        this.props.onChangeCompositionForm(event)
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.handleSubmitCard()
        //this.setState({select:'',textarea:''})
    }

    handleModify(event){
        event.preventDefault()
        this.props.handleModifyCard()
    }

    render() {
        let textarea = this.props.formValues.textarea //-->here to textarea new line
        let select = this.props.formValues.select
        let typePiece = ['Strofa', 'Ritornello', 'Ripetizione Ritornello']
        typePiece = this.props.placeholder.pieces
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
                            <select id="tipo-testo" value={select || false} className="form-select form-select-sm text-center text-secondary" onChange={this.onChangeForm} name="select">
                                <option value="false">Seleziona la Definizione</option>
                                <option value="S">{typePiece.S}</option>
                                <option value="R">{typePiece.R}</option>
                                <option value="RR">{typePiece.RR}</option>
                            </select>
                        </div>

                        <div className="col-12 mt-2">
                            <textarea
                                className="form-control form-control-sm textarea-compact p-1"
                                id="textarea-peace"
                                onChange={this.onChangeForm}
                                value={textarea || ""}
                                name="textarea"
                                rows="4"
                                placeholder="Inserisci il testo qui..."
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className={"btn btn-outline-secondary col-6 btn-sm align-items-end"} type="submit">
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












