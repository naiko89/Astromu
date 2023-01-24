import React from 'react';
import queryString from 'query-string';
import { Modal, Button, Form } from "react-bootstrap"

class FormComposition extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.state = { form: {composition: '' ,container: '', creator: ''},
            list: {container: '', creator: ''} };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.onChangeCreator = this.onChangeCreator.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleShow = () => {
        this.props.displayHandle(true)
    }

    handleClose = () => {
        this.props.displayHandle(false)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let uriFragment = queryString.stringify(this.state.form)
        if(this.state.form.container === this.state.list.container[0].name && this.state.form.creator === this.state.list.creator[0].name)
        {
            fetch(`/api/compositions?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({ form: {composition: '' ,container: '', creator: ''},
                        list: {container: '', creator: ''} })
                    this.handleClose()
                    this.props.childRend()

                } )
                .catch(error => console.error(error));
        }

        else{
            alert('Inserimento non corretto')
        }


    }

    onChangeComposition = (event) =>{
        let tempState= this.state;
        tempState.form.composition = event.target.value;
        this.setState(tempState);
    }

    onChangeContainer = (event) =>{
        let tempState= this.state
        if(event.target.value!=='') {
            fetch(`/api/container/${event.target.value}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    tempState.list.container=JSON.parse(data)
                })
                .catch(error => console.error(error));
        }
        tempState.form.container = event.target.value
        this.setState(tempState)
    }

    onChangeCreator = (event) =>{
        let tempState= this.state
        if(event.target.value!==''){
            fetch(`/api/creator/${event.target.value}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    tempState.list.creator=JSON.parse(data)
                })
                .catch(error => console.error(error));
        }
        tempState.form.creator=event.target.value
        this.setState(tempState)

    }

    render() {

        let display=this.props.display
        let listContainer = Object.values(this.state.list.container).map((item, index) => {
            return <option key={index} value={item.name}/>
        })
        let listCreator = Object.values(this.state.list.creator).map((item, index) =>{
            return <option key={index} value={item.name}/>
        })

        return (
            <>
                <Modal show={display} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Composizione</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formValOne" className={'mb-2'} onSubmit={this.handleSubmit}>
                            <Form.Control type="text" placeholder="Inserisci Nome" onChange={this.onChangeComposition} value={this.state.form.composition}/>
                        </Form.Group>
                        <Form.Group controlId="formValTwo" className={'mb-2'}>
                            <Form.Control list="containerOptions" placeholder="Aggiungi Container" onChange={this.onChangeContainer} value={this.state.form.container}/>
                            <datalist id="containerOptions">
                                {listContainer}
                            </datalist>
                        </Form.Group>
                        <Form.Group controlId="formValThree" className={'mb-2'}>
                            <Form.Control list="creatorOptions" placeholder="Aggiungi Creator" onChange={this.onChangeCreator} value={this.state.form.creator}/>
                            <datalist id="creatorOptions">
                                {listCreator}
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