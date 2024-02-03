import React from 'react'
import '../../../../styles/forms.css'
import DatePicker from "react-datepicker"
import {Form} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"

class FormGroupEditor extends React.Component{

    constructor(props) {
        super(props)
        this.props = props

    }

    render() {

        let description = this.props.data.description === null ? '' : this.props.data.description
        let nation = this.props.data.nation === null ? '' : this.props.data.nation.id
        let subNation = this.props.data.subNation === null ? '' : this.props.data.subNation.id
        let dateOn = this.props.data.dataOn === null ? null : new Date( this.props.data.dataOn )
        let dateOff = this.props.data.dataOff === null ? null : new Date( this.props.data.dataOff )

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
            <div className={'mx-auto text-center rounded-circle'}>
                <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="120" height="120"></img>
            </div>


    return(

        <Form  className={"container border text-secondary p-1 m-0 small"} onSubmit={this.props.handleSubmit}>

            <div className={'row border-bottom p-0 m-0 pb-2 my-head-group'} style={{backgroundColor: 'rgb(238, 238, 238)'}}>
                <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3'}>
                    {iconImage}
                </div>
            </div>

            <div className={'p-2'}>


                <div className='row p-0 m-0'>
                    <div className={'col-12'}><i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i></div>
                </div>

                <Form.Group controlId="formName" className={'mt-1 mb-1'}>
                    <Form.Control type="text" autoComplete="off" name="name" className={'text-secondary'} placeholder={"Nome Gruppo"} value={this.props.data.name} onChange={this.props.handleChange} />
                </Form.Group>

                <Form.Group controlId="formDateOn" className={'mt-1 mb-1'}>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={dateOn}
                        onChange={this.props.handleDateChangeOn}
                        className="form-control form-control-sm text-secondary"
                        placeholderText="Seleziona una data di Apertura"
                    />
                </Form.Group>

                <Form.Group controlId="formDateOff" className={'mt-1 mb-1'}>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={dateOff}
                        onChange={this.props.handleDateChangeOff}
                        className="form-control form-control-sm text-secondary"
                        placeholderText="Seleziona una data di Chiusura"
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className={'mt-1 mb-1'}>
                    <Form.Control size="sm" as="textarea" rows={5} placeholder={'Descrizione Gruppo'} className={'text-secondary'} name="description" value={description} onChange={this.props.handleChange} />
                </Form.Group>

            {/* mast to do add labels and mtype */}

                <Form.Select size="sm" className={"text-secondary mt-1"} name={'nation'} onChange={this.props.handleChange} value={nation}>
                    {nationsOptions}
                </Form.Select>

                <Form.Select size="sm" className={"text-secondary mt-1"} name={'subNation'} onChange={this.props.handleChange} value={subNation}>
                    {subNationsOptions}
                </Form.Select>

                <Form.Group controlId="formPhoto" className={'mt-1 mb-1'}>
                    <Form.Control type="file" className={'text-secondary'} size="sm" name="photo" label="Carica un'immagine" onChange={this.props.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="submit" value={'Salva Gruppo'} className={'btn btn-outline-secondary'} />
                </Form.Group>

            </div>
        </Form>

    )

    }
}


export default FormGroupEditor