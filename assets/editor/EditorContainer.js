import React from "react";
import update from "immutability-helper";
import {Form, ListGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";


class EditorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            form:{id:this.props.id, name:'',datePublish: null, comp_number : '', genre:'', label:'', productor:'', description:'', prize_temp:'', isAssociated:'', photo:'' },
            compositions:'',
            makers:'',
            handleValues: {trigger:false, textarea:'',id:'', select: false}
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        fetch(`/api/container/editor/?id=${this.props.containerId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                data = JSON.parse(data)
                let tempState = this.state
                tempState.form = data.container
                tempState.makers = data.makers
                tempState.compositions = data.compositions
                this.setState(tempState)
            })
            .catch(error => console.error(error));
    }

    handleChange(event) {
        const target = event.target
        const name = target.name
        let tempState = this.state
        const value = target.type === 'file' ? target.files[0] : target.value;
        tempState['form'][name] = value
        this.setState(tempState);
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.form)

        // Qui puoi fare qualcosa con i dati del form
    }

    handleDateChangeDateCreation(date){
        let tempState = this.state;
        tempState.form.selectedDate = date
        this.setState(tempState)
    }


    render() {


        let listMakers = Object.values(this.state.makers).map((item, index) => {
            return <ListGroup.Item key={index} className={'pe-1 small'} value={item.name}>
                <div className={'row pe-0 me-0'}>
                    <span className="col-11">{ item.name }</span>
                    <span className="col-1 p-0 m-0"><i className="bi bi-file-earmark-minus"></i></span>
                </div>

            </ListGroup.Item>
        })
        let listCompositions =  Object.values(this.state.compositions).map((item, index) => {
            return <ListGroup.Item key={index} className={'pe-1 small'} value={index}>
                <div className={'row pe-0 me-0'}>
                    <span className="col-11">{ item.composition.name }</span>
                    <span className="col-1 p-0 m-0"><i className="bi bi-file-earmark-minus"></i></span>
                </div>
            </ListGroup.Item>
        })

        let tempCompositions = JSON.stringify(this.state.compositions)

        return(
            <div className={'container pt-1'}>
                <div className={'row'}>
                    <div className={'col-sm-12 col-md-4 col-lg-4 me-0 pe-0 ps-0 mb-1'}>

                        <div className={'border p-2'} align={'center'}>
                            <div className={'row'}>
                                <div className={'col align-self-center'}>
                                    <div className={'icon-profile d-flex justify-content-center align-items-center mb-1'}>
                                        <i className="bi bi-book"></i>
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

                            <Form onSubmit={this.handleSubmit}> {/* reactive form with creator's data */}
                                <Form.Group controlId="formName" className={'mt-1 mb-1'}>
                                    <Form.Control type="text" name="name" placeholder={"Nome Contenitore"} value={this.state.form.name} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formDateCreation" className={'mt-1 mb-1'}>
                                    <DatePicker
                                        selected={this.state.form.datePublish}
                                        startDate={this.state.form.datePublish}
                                        onChange={this.handleDateChangeDateCreation}
                                        className="form-control form-control-sm"
                                        placeholderText="Seleziona una data di Apertura"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLabel" className={'mt-1 mb-1'}>
                                    <Form.Control type="text" name="label" placeholder={"Nome Etichetta"} value={this.state.form.label} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formDescription" className={'mt-1 mb-1'}>
                                    <Form.Control size="sm" as="textarea" placeholder={'Descrizione Contentiore'} name="description" value={this.state.form.description} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formPhoto" className={'mt-1 mb-1'}>
                                    <Form.Control className={'text-secondary'} type="file" size="sm" name="photo" label="Carica un'immagine"/>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Control type="submit" value={'Salva Contenitore'} className={'btn btn-success'} />
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
                                        <h5>Creatori <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup>
                                    {listMakers}
                                </ListGroup>
                            </div>

                            <div className={'col-sm-12 col-md-12 col-lg-6'}>
                                <div className={'row'}>
                                    <div className={'col-11 me-0 pe-0'}>
                                        <h5>Composizioni <i className="bi bi-plus-circle text-success add-elements-icon"></i></h5>
                                    </div>
                                    <div className={'col-1 justify-content-center align-items-center'}></div>
                                </div>
                                <ListGroup>
                                    {listCompositions}
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

export default EditorContainer;