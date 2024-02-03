import React from 'react'
import '../../../../styles/forms.css'
import DatePicker from "react-datepicker"
import {Form} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"


class FormContainerEditor extends React.Component{
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {

        console.log(this.props)


        let datePublish = this.props.data.datePublish === null ? null : new Date( this.props.data.datePublish )
        let textareaText = this.props.data.description === null ? '' : this.props.data.description
        let label = this.props.data.label === null ? '' : this.props.data.label
        let iconImage = (this.props.data.photo === null || this.props.data.photo === undefined || this.props.data.photo === '') ?
            '' :
            <div className={'mx-auto text-center'}>
                <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="120" height="120"></img>
            </div>

    return(
        <Form onSubmit={this.props.handleSubmit} className={'container border text-secondary p-1 m-0 small'}> {/* reactive form with creator's data */}

            <div className={'row border-bottom p-0 m-0 pb-2 my-head-container'} style={{backgroundColor: 'rgb(238, 238, 238)'}}>
                <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3'}>
                    {iconImage}
                </div>
            </div>

            <div className={'p-2'}>

                <div className={'row p-0 m-0'}>
                    <div className={'col-12'}><i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i></div>
                </div>

                <Form.Group controlId="formName" className={'mt-1 mb-1'}>
                    <Form.Control type="text" name="name" autoComplete="off" placeholder={"Nome Contenitore"} className={'text-secondary'} value={this.props.data.name} onChange={this.props.handleChange} />
                </Form.Group>


                <Form.Group controlId="formDateCreation" className={'mt-1 mb-1'}>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={datePublish}
                        onChange={this.props.handleChangeDate}
                        className="form-control form-control-sm text-secondary"
                        placeholderText="Seleziona una Data di Apertura"
                    />
                </Form.Group>

                <Form.Group controlId="formLabel" className={'mt-1 mb-1'}>
                    <Form.Control size="sm" type="text" autoComplete="off" className={'text-secondary'} name="label" placeholder={"Nome Etichetta"} value={label} onChange={this.props.handleChange} />
                </Form.Group>

                <Form.Group controlId="formDescription" className={'mt-1 mb-1'}>
                    <Form.Control size="sm" as="textarea" className={'text-secondary'} placeholder={'Descrizione Artista'} name="description" value={textareaText} onChange={this.props.handleChange} />
                </Form.Group>

                <Form.Group controlId="formPhoto" className={'mt-1 mb-1'}>
                    <Form.Control className={'text-secondary'} type="file" size="sm" name="photo" label="Carica un'immagine" onChange={this.props.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="submit" value={'Salva Contenitore'} className={'btn btn-outline-secondary'} />
                </Form.Group>
            </div>
        </Form>
    )


    }
}

export default FormContainerEditor