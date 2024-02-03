import React from 'react';
import {ListGroup, Button, Modal, Form, Row, FormCheck } from "react-bootstrap";

class FormSetHash extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state = {selectHash: false}
        this.onChangeForm = this.onChangeForm.bind(this)
        this.selectHyphenation = this.selectHyphenation.bind(this)
        this.redefineWord = this.redefineWord.bind(this)


    }


    onChangeForm(event){
        alert('dentro l handle set')
    }

    selectHyphenation(string, nVerse, nWord){
        this.props.selectHash(string, nVerse, nWord, this.props.value.hashes, false)
    }

    redefineWord(){

        this.props.redefineWord()

    }


    render(){
        let isHyphenated = this.props.value.sillabation
        let isInDb = this.props.value.isInDb === false ? 'no' : 'si'
        let cases = this.props.value.hashes !== [] ? this.props.value.hashes : ['Non definito'] //--->important if for the building cases
        let selectedHash = this.props.value.selectedHash === false ? 'no' : this.props.value.selectedHash
        let nVerse = this.props.nVerse
        let nWord = this.props.nWord
        let options = cases.map((item,key)=>{
            return <Form.Check key={key} type={"radio"} name={"group"} label={item} value={item} onChange={() => {this.selectHyphenation(item, nVerse, nWord)}} inline/>
        })


        return(
            <>
            {/*<div><h5>Form Set Hash</h5><div>{JSON.stringify(this.props)}</div></div>*/}
                <div className={'container mb-2 mt-1 pt-2 border-top'}>
                    <h6>Definizione : </h6>
                    <div className={'row'}>
                        <Form className={"col-md-8"}>
                            <div className={'row'}>
                                {/*
                                <Form.Group className={'col-2 pb-1 d-flex justify-content-center align-items-center'}>
                                <Button variant="primary" type="submit" className={'m-1 w-100 h-75'}>
                                  Modifica
                                </Button>
                                </Form.Group>
                                */}
                                <Form.Group className={'col-12'}>
                                    <Form.Control className={'col-2 mb-1'} name='text' type="text" autoComplete="off" placeholder={'word'}
                                                  value={this.props.value.text} onChange={this.props.redefineWord} size={'sm'}/>
                                    <div className={'form-control-sm border pt-1 pb-0 mb-1'}>
                                        {options}
                                    </div>
                                    <Form.Control type={'hidden'} name="nVerse" value={this.props.value.nVerse}/>
                                    <Form.Control type={'hidden'} name="nWord" value={this.props.value.nWord}/>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>
                </div>



                <div className="container">
                    {/*<div><h5>Form Add Hash</h5><div> {JSON.stringify(this.props)}</div><div>{JSON.stringify(checkedBox)}</div></div>*/}
                    <h6>Definizione : </h6>
                    <div className="row">
                        <div className="col-md-6 me-0 pe-0">
                            <ul className="list-group small">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {this.props.value.text}
                                    <span className="badge bg-info">Testo Base</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {selectedHash}
                                    <span className="badge bg-info">Acc Selezionato</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 ms-0">
                            <ul className="list-group small">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {isInDb}
                                    <span className="badge bg-info">In DB</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {this.props.value.tempHash}
                                    <span className="badge bg-info">Temporaneo</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="col-md-12 mt-1">
                            <ul className="list-group small">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {JSON.stringify(cases)}
                                    <span className="badge bg-info">Accenti</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </>
        )
    }




}


export default FormSetHash