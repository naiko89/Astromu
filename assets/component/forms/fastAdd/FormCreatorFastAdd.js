import React from 'react';
import queryString from 'query-string';
import { Modal, Button, Form, ListGroup } from "react-bootstrap"

class FormCreatorFastAdd extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.state = { form: { creator:'' } };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleShow = () => {
        this.props.displayHandle(true)
    }

    handleClose = () => {
        this.props.displayHandle(false)
    }

    handleSubmit(event) {
        event.preventDefault()
        let uriFragment = queryString.stringify(this.state.form)

        console.log(this.state.form)

        if(this.state.form.creator !=='')
        {
            fetch(`/api/creator/form?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({ form: { creator: '', creatorId: '', creatorSel: false }})
                    this.handleClose()
                    this.props.childRend()

                } )
                .catch(error => console.error(error));
        }

        else{
            alert('Inserimento non corretto')
        }
    }

    onChangeContainer = (event) =>{
        let tempState= this.state;
        tempState.form.creator = event.target.value;
        this.setState(tempState);
    }

    onChangeCreator = (event) =>{
        let tempState= this.state
        tempState.form.creator = event.target.value
        this.setState(tempState)


    }
    render() {

        let display=this.props.display

        return (
            <>
                <Modal show={display} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Cantante</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formValOne" className={'mb-2'}>
                            <Form.Control type="text" autoComplete="off" placeholder="Inserisci Cantante" onChange={this.onChangeCreator} value={this.state.form.creator}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit">
                            Salva
                        </Button>
                        {/*
                        <Button variant="secondary">
                            Salva e Apri
                        </Button>
                        */}
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}


export default FormCreatorFastAdd