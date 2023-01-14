import React from 'react';
import { Modal, Button, Form } from "react-bootstrap"

class FormComposition extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.state = { show: false };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.onChangeCreator = this.onChangeCreator.bind(this)

    }

    handleShow = () => {
        this.props.displayHandle(true)
    }

    handleClose = () => {
        this.props.displayHandle(false)
    }

    onChangeContainer = (event) =>{

        console.log(event.target.value)
    }

    onChangeCreator = (event) =>{

        console.log(event.target.value)
    }

    render() {

        let display=this.props.display

        return (
            <>
                <Modal show={display} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Composizione</Modal.Title>
                    </Modal.Header>
                    <Form>
                    <Modal.Body>
                        <Form.Group controlId="formValOne" className={'mb-2'}>
                            <Form.Control type="text" placeholder="Inserisci Nome" />
                        </Form.Group>
                        <Form.Group controlId="formValTwo" className={'mb-2'}>
                            <Form.Control list="datalistOptions" placeholder="Aggiungi Container" onChange={this.onChangeContainer}/>
                            <datalist id="datalistOptions">
                                <option value="Temp 1" />
                            </datalist>
                        </Form.Group>
                        <Form.Group controlId="formValThree" className={'mb-2'}>
                            <Form.Control list="datalistOptions" placeholder="Aggiungi Creator" onChange={this.onChangeCreator}/>
                            <datalist id="datalistOptions">
                                <option value="Temp 2" />
                            </datalist>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Salva
                        </Button>
                        <Button variant="primary">
                            Salva e Apri
                        </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}


export default FormComposition