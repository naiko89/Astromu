import React from 'react';
import queryString from 'query-string';
import {Modal, Button, Form, ListGroup} from "react-bootstrap"
import ListCreator from "../../lists/ListCreator";

class FormGroupFastAdd extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.state = { form: { group:'', creatorSel: false, selectedMembers:[] },
            temp:{ creator: ''},
            list:{ creator:[] }
        };
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeGroup = this.onChangeGroup.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectCreator = this.selectCreator.bind(this)
        this.removeCreator = this.removeCreator.bind(this)
    }

    handleShow = () => {
        this.props.displayHandle(true)
    }

    handleClose = () => {
        this.props.displayHandle(false)
    }

    handleSubmit(event) {
        event.preventDefault()
        let dataSend = this.state.form
        dataSend.selectedMembers = JSON.stringify(dataSend.selectedMembers)
        let uriFragment = queryString.stringify(dataSend)
        if(this.state.form.group !=='' && this.state.form.selectedMembers.length !== 0) {
            fetch(`/api/group/form?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({ form: { group: '', creatorSel: false, selectedMembers:[] },temp:{ creator: ''}, list:{ creator:[] } })
                    this.handleClose()
                    this.props.childRend()

                } )
                .catch(error => console.error(error));
        }
        else{
            alert('Inserimento non corretto')
        }
    }

    onChangeGroup = (event) =>{
        let tempState= this.state;
        tempState.form.group = event.target.value;
        this.setState(tempState);
    }

    onChangeCreator = (event) =>{
        let tempState= this.state
        let uriFragment
        if(!tempState.form.creatorSel) {
            tempState.temp.creator = event.target.value
            uriFragment = queryString.stringify({'text' : tempState.temp.creator})
            if (event.target.value !== '') {
                fetch(`/api/group/form?${uriFragment}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                    .then(data => {
                        console.log(JSON.parse(data))
                        tempState.list.creator = JSON.parse(data)
                        this.setState(tempState)
                    })
                    .catch(error => console.error(error));
            } else {
                tempState.list.creator = ''
                this.setState(tempState)
            }
        }
        else{
            tempState.list.creator = ''
            tempState.form.creatorSel= false
            this.setState(tempState)
        }
    }

    removeCreator = (item) =>{
        console.log('rimuovi')
    }

    selectCreator = (item) =>{
        let tempState = this.state
        tempState.temp.creator = ''
        tempState.list.creator = []
        let find = (item) => {
            let found = false
            tempState.form.selectedMembers.map(i => {
                if (item.name === i.name) {
                    console.log("Hai già inserito questo Creatore "+i.name);
                    found=true
                }
            })
            return found
        }

        if(tempState.form.selectedMembers.length === 0 || find(item) === false){
            tempState.form.selectedMembers.push({'id':item.id,'name':item.name})
            tempState.temp.creator = ''
        }
        else{
            alert('Hai già inserito questo Creatore')
        }

        this.setState(tempState)
    }

    render() {

        let display=this.props.display
        let contSel = this.state.form.creatorSel
        let listCreator = Object.values(this.state.list.creator).map((item, index) => {
            return <ListGroup.Item key={index} className={'item-search-creator'} value={item.name} onClick={()=>this.selectCreator(item)}>
                { item.name }
            </ListGroup.Item>
        })
        let listSelectedCreator = Object.values(this.state.form.selectedMembers).map((item, index) => {
            return <ListGroup.Item key={index} className={'rounded-pill me-1 item-search-creator'} value={item.name} onClick={()=>this.removeCreator(item)}>
                { item.name }
            </ListGroup.Item>
        })

        return (
            <>
                <Modal show={display} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi Creatore</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>

                        <Form.Group controlId="formValOne" className={'mb-2'}>
                            <Form.Control type="text" autoComplete="off" placeholder="Inserisci Nome" onChange={this.onChangeGroup} value={this.state.form.Group}/>
                        </Form.Group>

                        <Form.Group controlId="formValTwo" className={'mb-2'}>
                            <Form.Control type="text" autoComplete="off" placeholder="Inserisci Creatore" onChange={this.onChangeCreator} value={this.state.temp.creator}/>
                            <ListGroup className={'mt-2'}>
                                { contSel ? '' : listCreator }
                            </ListGroup>
                        </Form.Group>

                        <Form.Group>
                            <ListGroup horizontal className={'mt-2'}>
                                { listSelectedCreator }
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


export default FormGroupFastAdd