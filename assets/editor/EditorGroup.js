import React from "react";
import update from "immutability-helper";
import {Form, Image, ListGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";


class EditorGroup extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            group:{ id:this.props.groupId, name:'' },
            form:{ selectedDateOn: null, selectedDateOff: null, name:'', description : '', nation:'', subNation:'', photo:'' },
            creators:'',
            containers:'',
            compositions:'',
            nations:[
                { id: 0, label: 'Seleziona una Nazione'},
                { id: 1, label: 'Italia', value: 'IT' },
                { id: 2, label: 'Francia', value: 'FR' },
                { id: 3, label: 'Germania', value: 'DE' }
            ],
            subNations:[
                { id: 0, nationID: 0, label: 'Seleziona una Regione'},
                { id: 1, nationId: 0, label: 'Veneto', value:"VEN" },
                { id: 2, nationId: 0, label: 'Lombardia', value:'LOM' },
                { id: 3, nationId: 0, label: 'Sicilia', value:'SIC' }
            ],
            handleValues: { trigger:false, textarea:'',id:'', select: false }
        }

        this.handleDateChangeOn = this.handleDateChangeOn.bind(this);
        this.handleDateChangeOff = this.handleDateChangeOff.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        fetch(`/api/group/editor/?id=${this.props.groupId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                console.log(data)
                data = JSON.parse(data)
                let tempState = this.state
                tempState.form = data.group
                tempState.creators = data.creators
                tempState.containers = data.containers
                this.setState(tempState)
            })
            .catch(error => console.error(error));

    }

    handleChangeText(event) {
        const target = event.target
        const name = target.name
        let tempState = this.state
        const value = target.type === 'file' ? target.files[0] : target.value;
        tempState['form'][name] = value
        this.setState(tempState);
    }

    handleDateChangeOn = (date) => {
        let tempState = this.state;
        tempState.form.selectedDateOn = date
        this.setState(tempState)
    }

    handleDateChangeOff = (date) => {
        let tempState = this.state;
        tempState.form.selectedDateOff = date
        this.setState(tempState)
    }

    handleSubmit(event) {
        event.preventDefault();
        // Qui puoi fare qualcosa con i dati del form
    }

    render() {
        let textareaText = this.state.group.description === null ? '' : this.state.group.description
        let nation = this.state.form.nation === null ? '' : this.state.form.nation
        let subNation = this.state.form.subNation === null ? '' : this.state.form.subNation

        let subNationsOptions = this.state.subNations.map((subNation) => {
            return <option key={subNation.id} value={subNation.value}>
                {subNation.label}
            </option>
        }
        );

        const nationsOptions = this.state.nations.map((nation) => {
                return <option key={nation.id} value={nation.value}>
                    {nation.label}
                </option>
        }
        );


        let listComponents = Object.values(this.state.creators).map((item, index) => {
            return <ListGroup.Item key={index} className={'pe-1 small'} value={item.creator.id}>
                <div className={'row pe-0 me-0'}>
                    <span className="col-11">{ item.creator.name }</span>
                    <span className="col-1 p-0 m-0"><i className="bi bi-file-earmark-minus"></i></span>
                </div>
            </ListGroup.Item>
        })

        let listContaners = Object.values(this.state.containers).map((item, index) => {
            let roleCreator = item.container.associationCont.length === 1 ? 'text-primary' : 'text-success'
            return <ListGroup.Item key={index} className={'pe-1 small '+roleCreator} value={item.container.id}>
                <div className={'row pe-0 me-0'}>
                    <span className="col-11">{ item.container.name }</span>
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

                                        <i className="bi bi-people-fill" ></i>

                                    </div>
                                </div>
                            </div>


                            {/* <Image
                                src={window.location.origin +'/Images/user_grey.png'}
                                style={{ maxHeight: '150px' }}
                                className={'border p-2 mb-2'}
                                rounded
                            /> */
                            }

                            <Form onSubmit={this.handleSubmit} className={"text-secondary"}> {/* reactive form with creator's data */}
                                <Form.Group controlId="formName" className={'mt-1 mb-1'}>
                                    <Form.Control type="text" name="name" className={'text-secondary'} placeholder={"Nome Gruppo"} value={this.state.form.name} onChange={this.handleChangeText} />
                                </Form.Group>

                                <Form.Group controlId="formDateOn" className={'mt-1 mb-1'}>
                                    <DatePicker
                                        selected={this.state.form.DataOn}
                                        startDate={this.state.form.DataOn}
                                        onChange={this.handleDateChangeOn}
                                        className="form-control form-control-sm text-secondary"
                                        placeholderText="Seleziona una data di Apertura"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDateOff" className={'mt-1 mb-1'}>
                                    <DatePicker
                                        selected={this.state.form.DataOff}
                                        startDate={this.state.form.DataOff}
                                        onChange={this.handleDateChangeOff}
                                        className="form-control form-control-sm text-secondary"
                                        placeholderText="Seleziona una data di Chiusura"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDescription" className={'mt-1 mb-1'}>
                                    <Form.Control size="sm" as="textarea" placeholder={'Descrizione Gruppo'} className={'text-secondary'} name="description" value={textareaText} onChange={this.handleChangeText} />
                                </Form.Group>

                                {/* mast to do add labels and mtype */}

                                <Form.Select size="sm" className={"text-secondary mt-1"} name={'nation'} onChange={this.handleChangeText} value={nation}>
                                    {nationsOptions}
                                </Form.Select>

                                <Form.Select size="sm" className={"text-secondary mt-1"} name={'subNation'} onChange={this.handleChangeText} value={subNation}>
                                    {subNationsOptions}
                                </Form.Select>

                                <Form.Group controlId="formPhoto" className={'mt-1 mb-1'}>
                                    <Form.Control type="file" className={'text-secondary'} size="sm" name="photo" label="Carica un'immagine"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type="submit" value={'Salva Gruppo'} className={'btn btn-success'} />
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
                                        <h5>Componenti del Gruppo <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup>
                                    {listComponents}
                                </ListGroup>
                            </div>

                            <div className={'col-sm-12 col-md-12 col-lg-6'}>
                                <div className={'row'}>
                                    <div className={'col-11 me-0 pe-0'}>
                                        <h5>Contenitori <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup>
                                    {listContaners}
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

export default EditorGroup;