import React from 'react'
import '../../../../styles/forms.css'
import DatePicker from "react-datepicker"
import {Form} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"

class FormCreatorEditor extends React.Component{

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {

        let textareaText = this.props.data.description === null ? '' : this.props.data.description
        let nationId = this.props.data.nation === null ? '' : this.props.data.nation.id
        let subNation = this.props.data.subNation === null ? '' : this.props.data.subNation.id
        let firstname = this.props.data.firstname === null ? '' : this.props.data.firstname
        let surname = this.props.data.surname === null ? '' : this.props.data.surname
        let dateBirth = this.props.data.dateBirth === null ? null : new Date( this.props.data.dateBirth ) //console.log(textareaText)


        let subNationsOptions = this.props.subNations.map((subNation) => {
            return <option key={subNation.id} value={subNation.id}>
                {subNation.name}
            </option>
        })

        let nationsOptions = this.props.nations.map((nation) => {
            return <option key={nation.id} value={nation.id}>
                {nation.name}
            </option>
        })

        let iconImage = (this.props.data.photo === null || this.props.data.photo === undefined || this.props.data.photo === '') ?
            '' :
            <div className={'mx-auto text-center'}>
                <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="120" height="120"></img>
            </div>

        return(
            <Form onSubmit={this.props.handleSubmit} className="container border text-secondary p-1 m-0 small">

                <div className={'row border-bottom p-0 m-0 pb-2 my-head-creator'} style={{backgroundColor: 'rgb(238, 238, 238)'}}>
                    <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3'}>
                            {iconImage}
                    </div>
                </div>

                <div className={'p-2'}>
                    <div className={'row p-0 m-0'}>
                        <div className={'col-12'}><i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i></div>
                    </div>

                    <Form.Group controlId="formName" className="mt-1">
                        <Form.Control type="text" autoComplete="off" name="name" className="text-secondary" placeholder="Nome Arte" value={this.props.data.name} onChange={this.props.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formRealName" className="mt-1">
                        <div className="d-flex">
                            <Form.Control type="text" autoComplete="off" name="firstname" className="me-1 text-secondary" placeholder="Nome" value={firstname} onChange={this.props.handleChange} size="sm"/>
                            <Form.Control type="text" autoComplete="off" name="surname" className="ms-1 text-secondary" placeholder="Cognome" value={surname} onChange={this.props.handleChange} size="sm"/>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formDate" className="mt-1">
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={dateBirth}
                            onChange={this.props.handleDateChangeBirth}
                            className="form-control form-control-sm text-secondary"
                            placeholderText="Seleziona una Data di Nascita"
                            showYearDropdown
                        />
                    </Form.Group>

                    <Form.Select size="sm" name="nation" className="text-secondary mt-1" value={nationId} onChange={this.props.handleChangeFrom}>
                        {nationsOptions}
                    </Form.Select>

                    <Form.Select size="sm" name="subNation" className="text-secondary mt-1" value={subNation} onChange={this.props.handleChangeFrom}>
                        {subNationsOptions}
                    </Form.Select>

                    <Form.Group controlId="formDescription" className="mt-1">
                        <Form.Control size="sm" as="textarea" rows={5} className="text-secondary" placeholder="Descrizione Arista" name="description" value={textareaText} onChange={this.props.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formPhoto" className="mt-1">
                        <Form.Control className="text-secondary" type="file" size="sm" name="photo" label="Carica un'immagine" onChange={this.props.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Control type="submit" value="Salva Creatore" className="btn btn-outline-secondary" />
                    </Form.Group>
                </div>
            </Form>

        )
    }
}

export default FormCreatorEditor