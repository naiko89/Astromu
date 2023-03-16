import React from "react";
import update from "immutability-helper";
import {Form, Button, Image, ListGroup, Card} from 'react-bootstrap';
import Select from 'react-select'
import '../styles/editor.css';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import queryString from "query-string";

class EditorCreator extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            creator:{ id:props.creatorId},
            form:{id: props.creatorId, name:'', firstname: '', surname: '', dateBirth: null, nation: '', subNation: '', description: '', photo: null},
            groups:[],
            containers:[],
            compositions:[],
            nations:[ //the ids in database start with 1 ok for 0 for the default
                { id: 0, name: 'Seleziona una Nazione', className: null},
                { id: 118, name: 'Italia', value: 'IT' }
            ],
            subNations:[
                { id: 0, nationID: 118, name: 'Seleziona una Regione', className: null},
                { id: 20, nationId: 118, name: 'Veneto', value:"VEN" }
            ],
            handleValues: { trigger:false, textarea:'',id:'', select: false }
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDateChangeDateBirth = this.handleDateChangeDateBirth.bind(this)
        this.handleChangeFrom = this.handleChangeFrom.bind(this)
    }

    componentDidMount() {
        fetch(`/api/creator/editor/?id=${this.props.creatorId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                data = JSON.parse(data)
                let tempState= this.state
                tempState.form = data.creator
                tempState.groups = data.groups
                tempState.containers = data.containers
                tempState.subNations = data.support.nations[0].subnations //_>now only for italy one level array
                tempState.subNations.unshift({ id: 0, nationID: 118, name: 'Seleziona una Regione', className: null})
                this.setState(tempState)
            })
            .catch(error => console.error(error));
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let tempState = this.state
        const value = target.type === 'file' ? target.files[0] : target.value;
        tempState['form'][name] = value
        console.log(tempState)
        this.setState(tempState);
    }

    handleChangeFrom(event){
        const name = event.target.name;
        let tempState = this.state
        const value = { id: event.target.value }
        tempState['form'][name] = value
        this.setState(tempState);
    }

    handleSubmit(event) {
        event.preventDefault()
        let tempState = this.state;
        let dat = new Date(tempState.form.dateBirth)
        tempState.form.dateBirth = dat.toISOString().substring(0, 10)
        let uriFragment = queryString.stringify({data:JSON.stringify(this.state.form)})
        console.log(this.state.form)

        fetch(`/api/creator/editor?${uriFragment}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                data = JSON.parse(data)

                this.setState(tempState)
            })
    }

    handleDateChangeDateBirth(date){
        let tempState = this.state
        tempState.form.dateBirth = date
        this.setState(tempState)
    }

    render() {

        let textareaText = this.state.form.description === null ? '' : this.state.form.description
        let nation = this.state.form.nation === null ? '' : this.state.form.nation.id
        let subNation = this.state.form.subNation === null ? '' : this.state.form.subNation.id
        let firstname = this.state.form.firstname === null ? '' : this.state.form.firstname
        let surname = this.state.form.surname === null ? '' : this.state.form.surname
        let dateBirth = null
        if(this.state.form.dateBirth!==null && this.state.form.dateBirth!==''){
            dateBirth = new Date(this.state.form.dateBirth)
        }

        let subNationsOptions = this.state.subNations.map((subNation) => {

            return <option key={subNation.id} value={subNation.id}>
                {subNation.name}
            </option>
        })

        let nationsOptions = this.state.nations.map((nation) => {

            return <option key={nation.id} value={nation.id}>
                {nation.name}
            </option>
        })


        let listGroups = Object.values(this.state.groups).map((item, index) => {
            let containers = item.team.associationCont.map((item, index) =>{
                return <ListGroup.Item className={'mt-0 mb-0 pt-1 pb-1 small'} key={item.id}>{item.container.name}</ListGroup.Item>
            })

            return  <Card key={item.id}>
                <Card.Body>
                    <Card.Title>
                        <div className={'row pe-0 me-0 h6'}>
                            <span className="col-11">{ item.team.name }</span>
                            <span className="col-1 p-0 m-0"><i className="bi bi-file-earmark-minus"></i></span>
                        </div>
                    </Card.Title>
                    <ListGroup>
                        {containers}
                    </ListGroup>
                </Card.Body>
            </Card>
        })


        let listContainer = Object.values(this.state.containers).map((item, index) => {
            let roleCreator = item.container.associationCont.length === 1 ? 'text-primary' : 'text-success'
            return <ListGroup.Item key={index} className={'pe-1 small'}>
                <div className={'row pe-0 me-0'}>
                    <span className={roleCreator+" col-11"}>{item.container.name}</span>
                    <span className="col-1 p-0 m-0"><i className="bi bi-file-earmark-minus"></i></span>
                </div>
            </ListGroup.Item>
        })



        return(
            <div className={'container pt-1'}>
                <div className={'row'}>
                    <div className={'col-sm-12 col-md-4 col-lg-4 me-0 pe-0 ps-0 mb-1'}>

                        <div className={'border p-2'} align={'center'}>
                            <div className={'row'}>

                                <div className={'col align-self-center'}>
                                    <div className={'icon-profile d-flex justify-content-center align-items-center mb-1'}>
                                        <i className="bi bi-person-fill"></i>
                                    </div>
                                </div>
                            </div>


                            {/*
                            <Image
                                src={window.location.origin +'/Images/user_grey.png'}
                                style={{ maxHeight: '150px' }}
                                className={'border p-2 mb-2'}
                                rounded
                            />
                            */}


                            <Form onSubmit={this.handleSubmit} className={'text-secondary'}> {/* reactive form with creator's data */}
                                <Form.Group controlId="formName" className={'mt-1 mb-1'}>
                                    <Form.Control type="text" name="name" className={'text-secondary'} placeholder={"Nome A"} value={this.state.form.name} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formRealName" className={'mt-1 mb-1'}>
                                    <div className="d-flex">
                                    <Form.Control type="text" name="firstname"  className={'me-1 text-secondary'} placeholder={'Nome'} value={firstname} onChange={this.handleChange} size="sm"/>
                                    <Form.Control type="text" name="surname" className={'ms-1 text-secondary'} placeholder={'Cognome'} value={surname} onChange={this.handleChange} size="sm"/>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formDate">
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={dateBirth}
                                        onChange={this.handleDateChangeDateBirth}
                                        className="form-control form-control-sm text-secondary"
                                        placeholderText="Seleziona una data"
                                        showYearDropdown
                                    />
                                </Form.Group>

                                <Form.Select size="sm" name="nation" className={"text-secondary mt-1"} value={nation} onChange={this.handleChangeFrom}>
                                    {nationsOptions}
                                </Form.Select>

                                <Form.Select size="sm" name="subNation" className={"text-secondary mt-1"} value={subNation} onChange={this.handleChangeFrom}>
                                    {subNationsOptions}
                                </Form.Select>

                                <Form.Group controlId="formDescription" className={'mt-1 mb-1'} value={this.state.form.description}>
                                    <Form.Control size="sm" type="textarea" className={'text-secondary'} placeholder={'Descrizione Creatore'} name="description" value={textareaText} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formPhoto" className={'mt-1 mb-1'}>
                                    <Form.Control className={'text-secondary'} type="file" size="sm" name="photo" label="Carica un'immagine" onChange={this.handleChange}/>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Control type="submit" value={'Salva Creatore'} className={'btn btn-success'} />
                                </Form.Group>


                            </Form>
                        </div>
                    </div>
                    <div className={'col-sm-12 col-md-8 col-lg-8 me-0 pe-0 ps-0 mb-1'}>

                        <div className={'border row h-100 m-0 p-2'}>
                            {/* 1- that list are one ot two component (es. listofrelations) eith handlers for all entity*/}
                            <div className={'col-sm-12 col-md-12 col-lg-5 mb-3'}>
                                <div className={'row'}>
                                    <div className={'col-11 me-0 pe-0'}>
                                        <h5>Gruppi <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup className={'small'}>
                                    {listGroups}
                                </ListGroup>
                            </div>

                            <div className={'col-sm-12 col-md-12 col-lg-6'}>
                                <div className={'row'}>
                                    <div className={'col-11 me-0 pe-0'}>
                                        <h5>Contenitori <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup className={'small'}>
                                    {listContainer}
                                </ListGroup>
                            </div>
                            {/* /-1 */}

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default EditorCreator;