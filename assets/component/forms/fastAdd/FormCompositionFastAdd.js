import React from 'react';
import queryString from 'query-string';
import { Modal, Button, Form, ListGroup } from "react-bootstrap"

class FormCompositionFastAdd extends React.Component{

    constructor(props) {
        super(props)
        this.props=props
        this.state = { form: { composition: '' , containerId:'', containerSel: false  },
            temp : {container: '' },
            list: { container: [] }
        };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectContainer = this.selectContainer.bind(this)

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
        if(this.state.form.composition && this.state.form.containerId) {
            fetch(`/api/compositions/form?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({form: { composition: '' ,containerId:'', containerSel: false },
                        temp : {container: ''},
                        list: { container: '' } })
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

    onChangeContainer = (event) =>{ //-->this search could be better, we have the container in the input for more targeted search
        let tempState= this.state
        let uriFragment = ''
        if(!tempState.form.containerSel) {
            tempState.temp.container = event.target.value
            uriFragment = queryString.stringify({'text' : tempState.temp.container})
            if (event.target.value !== '') {
                fetch(`/api/compositions/form?${uriFragment}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                    .then(data => {
                        tempState.list.container = JSON.parse(data)
                        this.setState(tempState)
                    })
                    .catch(error => console.error(error));
            } else {
                tempState.list.container = ''

                this.setState(tempState)
            }
        }
        else{
            tempState.list.container = ''
            tempState.form.containerSel= false
            this.setState(tempState)
        }

    }

    selectContainer = (item) =>{
        let tSta=this.state
        tSta.form.containerId = item.id
        tSta.temp.container = item.name
        tSta.list.container = []
        this.setState(tSta)
    }
    render() {

        let display=this.props.display
        let contSel = this.state.temp.containerSel
        let listContainer = Object.values(this.state.list.container).map((item, index) => {
                return <ListGroup.Item key={index} className={'item-search-container'} value={item.name} onClick={()=>this.selectContainer(item)}>
                    { item.name }
                </ListGroup.Item>
        })

        return (
            <>
                <Modal show={display} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Composizione</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formValOne" className={'mb-2'}>
                            <Form.Control type="text" autoComplete="off" placeholder="Inserisci Nome Composizione" onChange={this.onChangeComposition} value={this.state.form.composition}/>
                        </Form.Group>
                        <Form.Group controlId="formValTwo" className={'mb-2'}>
                            <Form.Control type="text" list="containerOptions" autoComplete="off" placeholder="Aggiungi Container" onChange={(e) => this.onChangeContainer(e)} value={this.state.temp.container}/>
                            <ListGroup>
                                {contSel ? '' : listContainer}
                            </ListGroup>
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


export default FormCompositionFastAdd