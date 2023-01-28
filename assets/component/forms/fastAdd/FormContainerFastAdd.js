import React from 'react';
import queryString from 'query-string';
import { Modal, Button, Form, ListGroup } from "react-bootstrap"

class FormCompositionFastAdd extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.state = { form: { container: '',creator:'', creatorId: '', creatorSel: false },
            list: { creator: '' } };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectCreator = this.selectCreator.bind(this)

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

        if(this.state.list.creator && this.state.list.creator.some(element => element.name === this.state.form.creator))
        {
            fetch(`/api/container/form?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({ form: { container: '', creator: '', creatorId: '', creatorSel: false },
                        list: { creator: '' } })
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
        tempState.form.container = event.target.value;
        this.setState(tempState);
    }

    onChangeCreator = (event) =>{ //-->this search could be better, we have the container in the input for more targeted search
        let tempState= this.state
        let uriFragment
        if(!tempState.form.creatorSel) {
            tempState.form.creator = event.target.value
            uriFragment = queryString.stringify({'text' : tempState.form.creator})
            if (event.target.value !== '') {
                fetch(`/api/container/form?${uriFragment}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                    .then(data => {
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

    selectCreator = (item) =>{
        let tSta=this.state

        this.setState({
            ...tSta,
            form: {
                ...tSta.form,
                ...Object.fromEntries(
                    Object.entries({
                        creator: item.name,
                        creatorSel: true,
                        creatorId: item.id
                    })
                )
            }
        })
    }
    render() {

        let display=this.props.display
        let contSel = this.state.form.creatorSel
        let listCreator = Object.values(this.state.list.creator).map((item, index) => {
                return <ListGroup.Item key={index} value={item.name} onClick={()=>this.selectCreator(item)}>
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
                            <Form.Control type="text" autoComplete="off" placeholder="Inserisci Nome" onChange={this.onChangeContainer} value={this.state.form.container}/>
                        </Form.Group>
                        <Form.Group controlId="formValTwo" className={'mb-2'}>
                            <Form.Control type="text" list="containerOptions" autoComplete="off" placeholder="Aggiungi Container" onChange={(e) => this.onChangeCreator(e)} value={this.state.form.creator}/>
                            <ListGroup>
                                {contSel ? '' : listCreator}
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



/*
                        <Form.Group controlId="formValThree" className={'mb-2'}>
                            <Form.Control list="creatorOptions" autocomplete="off" placeholder="Aggiungi Creator" onChange={this.onChangeCreator} value={this.state.form.creator}/>
                            <datalist id="creatorOptions">
                                {listCreator}
                            </datalist>
                        </Form.Group>

 */

/*
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
 */