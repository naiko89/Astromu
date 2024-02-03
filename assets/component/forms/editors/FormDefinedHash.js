import React from 'react'
import {ListGroup, Button, Modal, Form, Container, Row, Dropdown, FormCheck } from "react-bootstrap"
import makeAnimated from 'react-select/animated';
import queryString from "query-string";

class FormDefinedHash extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state = {hyphenation: [], selectedHash:'', cleanCheckBox: true}
        this.deleteWord = this.deleteWord.bind(this)

    }

    deleteWord(){
        this.props.removeWord(this.props.value.sillabation)
    }

    render(){
        let selectedHash = this.props.value.selectedHash === false ? 'no' : this.props.value.selectedHash
        let isInDb = this.props.value.isInDb === false ? 'no' : 'si'
        let cases = this.props.value.hashes !== [] ? this.props.value.hashes : ['Non definito'] //--->important if for the building cases
        return(
            <>
                <div className={'container mb-2 mt-1 pt-2 border-top'}>
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
                    {/*
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
                    */}
                </div>

                <div className={'container mb-2 mt-1 pt-2 border-top'}>
                    <div className={'row'}>
                        <div className={'row d-flex justify-content-end align-items-end'}>
                            <button className={"btn btn-outline-secondary col-4 btn-sm "} onClick={() => this.deleteWord()}>Elimina</button>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}


export default FormDefinedHash