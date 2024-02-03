import React from 'react'
import {ListGroup, Button, Modal, Form, Container, Row, Dropdown, FormCheck } from "react-bootstrap"
import makeAnimated from 'react-select/animated';

class FormAddHash extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state = {hyphenation: [], selectedHash:'', cleanCheckBox: true}
        this.animate = makeAnimated()
        this.selectHyphenation = this.selectHyphenation.bind(this)
        this.selectedHash = this.selectedHash.bind(this)

    }

    selectHyphenation(string){
        let tmpstate= this.state
        let nRemoveToggle=false
        tmpstate.cleanCheckBox = false
        tmpstate.hyphenation.forEach((hypenation, n)=>{
            if(hypenation===string){
                nRemoveToggle=n
            }
        })
        nRemoveToggle !== false ? delete tmpstate.hyphenation[nRemoveToggle] : tmpstate.hyphenation.push(string);
        this.setState(tmpstate)
    }

    selectedHash(string, nVerse, nWord){
        this.props.selectHash(string, nVerse, nWord, this.state.hyphenation, false)
    }

    render(){
        let vocal = ['a', 'e', 'i', 'o', 'u']
        let isHyphenated = this.props.value.sillabation
        let stringForGen = this.props.value.tempHash.replace('#','')
        let isInDb = this.props.value.isInDb === false ? 'no' : 'si'
        let cases = this.props.value.hashes !== [] ? this.props.value.hashes : ['Non definito'] //--->important if for the building cases

        let nVerse = this.props.nVerse
        let nWord = this.props.nWord

        let generatedCases = []
        let selectedHash = this.props.value.selectedHash === false ? 'no' : this.props.value.selectedHash

        stringForGen.split("").forEach((character, n) => {
            if (isHyphenated === null) {
                isHyphenated = stringForGen
            }
            if (vocal.includes(character)) {
                generatedCases.push(stringForGen.substring(0, n) + '#' + stringForGen.substring(n))
            }
        })
        generatedCases.push(stringForGen)

        let checkedBox = this.state.cleanCheckBox === true ? false : ''

        let optionsHyphe = generatedCases.map((item,key)=>{
            return <Form.Check key={key} type={"checkbox"} label={item} value={item} onChange={() => this.selectHyphenation(item)} inline/>
        })

        let definedHashes = this.state.hyphenation.length !==0 ? this.state.hyphenation.map((item,key)=>{
            return <Form.Check checked={checkedBox} key={key} type={"radio"} name={'group'} label={item} value={item}
                               onChange={() => this.selectedHash(item, nVerse, nWord)} inline/>
        }) : ''

        definedHashes = this.state.hyphenation.length !== 0 ? <div className={'form-control-sm border pt-1 pb-0 mb-1'}>{definedHashes}</div>
            : <div className={'form-control-sm border pt-1 pb-0 mb-1 text-secondary'}> Possibili </div>

        return(
            <>
                <div className={'container mb-2 mt-1 pt-2 border-top'}>
                    <h6>Inserimento : </h6>
                    <div className={'row'}>
                        <Form className={"col-md-8"} action={'#'}>
                            <div className={'row'}>
                                {/*
                                <Form.Group className={'col-2 pb-1 d-flex justify-content-center align-items-center'}>
                                <Button variant="primary" type="submit" className={'m-1 w-100 h-75'}>
                                  Modifica
                                </Button>
                                </Form.Group>
                                */}
                                <Form.Group className={'col-12'}>
                                    <Form.Control className={'col-2 mb-1'} name='text' type="text" autoComplete="off"
                                                  placeholder={'word'} value={this.props.value.text} onChange={this.props.redefineWord} size={'sm'}/>
                                    {definedHashes}

                                    <div className={'form-control-sm border pt-1 pb-0 mb-1'}>
                                        {optionsHyphe}
                                    </div>
                                    <Form.Control type={'hidden'} name="nVerse" value={nVerse} />
                                    <Form.Control type={'hidden'} name="nWord" value={nWord} />
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
                                    {JSON.stringify(generatedCases)}
                                    <span className="badge bg-info">Acc Generati</span>
                                </li>
                            </ul>

                            <ul className="list-group small">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {isHyphenated}
                                    <span className="badge bg-info">Acc Generati</span>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default FormAddHash