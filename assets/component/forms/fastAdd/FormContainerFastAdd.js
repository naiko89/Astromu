import React from 'react';
import queryString from 'query-string';
import { Modal, Button, Form, ListGroup } from "react-bootstrap"

class FormContainerFastAdd extends React.Component{

    constructor(props) {
        super(props);
        this.props=props

        this.state = { form: { container: '', selectedAuthors:[], authorSel: false },
            temp:{ author:'' },
            list: { authors: { creator:[], group:[] } }
        };

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChangeContainer = this.onChangeContainer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectAuthor = this.selectAuthor.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.removeAuthorFromList = this.removeAuthorFromList.bind(this)

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
        dataSend.selectedAuthors = JSON.stringify(dataSend.selectedAuthors)
        let uriFragment = queryString.stringify(dataSend)
        //alert(uriFragment)

        if(this.state.form.container !=='' && this.state.form.selectedAuthors.length !== 0)
        {
            fetch(`/api/container/form?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                .then(data => {
                    this.setState({ form: { container: '', selectedAuthors:[], authorSel: false },
                        temp:{ author:'' },
                        list: { authors: { creator:[], group:[] } }
                    })
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

    onChangeAuthor = (event) =>{ //-->this search could be better, we have the container in the input for more targeted search
        let tempState= this.state
        let uriFragment
        if(!tempState.form.authorSel) {
            tempState.temp.author = event.target.value
            uriFragment = queryString.stringify({'text' : tempState.temp.author})
            if (event.target.value !== '') {
                fetch(`/api/container/form?${uriFragment}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
                    .then(data => {
                        tempState.list.authors = JSON.parse(data)
                        this.setState(tempState)
                    })
                    .catch(error => console.error(error));
            } else {
                tempState.list.authors = ''
                this.setState(tempState)
            }
        }
        else{
            alert('vuoto')
            tempState.list.authors = ''
            tempState.form.authorSel= false
            this.setState(tempState)
        }

    }

    selectAuthor = (item, type) =>{
        let tempState=this.state
        tempState.temp.author = ''
        tempState.list.authors = { creator:[], group:[] }

        let find = (item) => {
            let found = false
            tempState.form.selectedAuthors.map(i => {
                if (item.name === i.name) {
                    console.log("Hai già inserito questo Creatore "+i.name);
                    found=true
                }
            })
            return found
        }

        if(tempState.form.selectedAuthors.length === 0 || find(item) === false){
            tempState.form.selectedAuthors.push({'id':item.id, 'name':item.name, 'type':type})
            tempState.temp.author = ''
        }
        else{
            alert('Hai già inserito questo Creatore')
        }
        this.setState(tempState)
    }

    removeAuthorFromList = (item) => {
        alert('remove item (removeAuthor)')
    }
    render() {

        let display=this.props.display
        let contSel = this.state.form.authorSel
        let listAuthor = this.state.list.authors || {creator:[], group:[]}

        let authorListMerge = listAuthor.creator
            .map((item, index) => {
            return <ListGroup.Item key={index + '-a'} type={'creator'} className={'item-search-creator'} value={item.name} onClick={() => this.selectAuthor(item, 'creator')}>
                {item.name}
            </ListGroup.Item>
        })
            .concat(listAuthor.group.map((item, index) =>{
            return <ListGroup.Item key={index + '-g'} type={'group'} className={'item-search-group'} value={item.name} onClick={() => this.selectAuthor(item, 'group')}>
                {item.name}
            </ListGroup.Item>
        }))


        let listSelectedAuthor = Object.values(this.state.form.selectedAuthors).map((item, index) => {
            return <ListGroup.Item key={index} className={'rounded-pill me-1 item-search-'+item.type} value={item.name} onClick={()=>this.removeAuthorFromList(item)}>
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
                            <Form.Control type="text" list="containerOptions" autoComplete="off" placeholder="Aggiungi il Creator o Group Primario" onChange={(e) => this.onChangeAuthor(e)} value={this.state.temp.author}/>
                            <ListGroup className={'mt-2'}>
                                {contSel ? '' : authorListMerge}
                            </ListGroup>
                        </Form.Group>

                        <Form.Group>
                            <ListGroup horizontal className={'mt-2'}>
                                { listSelectedAuthor }
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


export default FormContainerFastAdd