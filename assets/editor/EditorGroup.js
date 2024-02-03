import React from "react";
import update from "immutability-helper";
import {Form, Image, ListGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import FormGroupEditor from "../component/forms/editors/dataDescrEditor/FormGroupEditor";
import DataListGroup from "../component/lists/editor/DataListGroup";
import queryString from "query-string";

import Resizer from "react-image-file-resizer";
import ContextGlobally from "../context/ContextGlobally";

class EditorGroup extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            group:{ id:this.props.groupId, name:'' },
            form:{ DateOn: null, DateOff: null, name:'', description : '', nation:'', subNation:'', photo:'', activeMod: true },
            creators:'',
            containers:'',
            compositions:'',
            nations:[
                { id: 0, name: 'Seleziona una Nazione', className: null},
                { id: 118, name: 'Italia', value: 'IT' }
            ],
            subNations:[
                { id: 0, nationID: 118, name: 'Seleziona una Regione', className: null }
            ],
            handleValues: { trigger:false, textarea:'',id:'', select: false }
        }

        this.handleDateChangeOn = this.handleDateChangeOn.bind(this);
        this.handleDateChangeOff = this.handleDateChangeOff.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleDataBox = this.toggleDataBox.bind(this);

    }

    static contextType = ContextGlobally;

    componentDidMount() {

        fetch(`/api/group/editor/?id=${this.props.groupId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => { //console.log(data)
                data = JSON.parse(data)
                let tempState = this.state
                tempState.form = data.group
                tempState.creators = data.creators
                tempState.containers = data.containers
                tempState.subNations = data.support.nations[0].subnations //_>now only for italy one level array
                tempState.subNations.unshift({ id: 0, nationID: 118, name: 'Seleziona una Regione', className: null})
                tempState.form.activeMod = (data.group.firstname !== null && data.group.dataOn !== null)
                this.setState(tempState)
            })
            .catch(error => console.error(error));

    }

    async handleChangeForm(event) {
        const target = event.target
        const name = target.name
        let tempState = this.state
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                Resizer.imageFileResizer(
                    file,
                    280,
                    280,
                    "PNG",
                    100,
                    0,
                    (uri) => {
                        resolve(uri);
                    },
                    "base64",
                    120,
                    120
                );

            })
        }

        switch (name) {
            case 'nation':
            case 'subNation':
                tempState['form'][name] = { id: target.value }
                break;
            case 'photo':
                tempState['form'][name] = await getBase64(target.files[0]).then((phStr)=>{
                    return phStr
                })
                break;
            default:
                tempState['form'][name] = target.value
                break;
        }
        this.setState(tempState);
    }

    handleDateChangeOn = (date) => {
        let tempState = this.state
        tempState.form.dataOn = date
        this.setState(tempState)
    }

    handleDateChangeOff = (date) => {
        let tempState = this.state;
        tempState.form.dataOff = date
        this.setState(tempState)
    }

    toggleDataBox(){
        let tempState = this.state
        tempState.form.activeMod = !tempState.form.activeMod
        this.setState(tempState)
    }

    handleSubmit(event) {
        event.preventDefault();
        let dateOn,dateOff, uriFragment
        let tempState = this.state

        if(tempState.form.name !== null &&  tempState.form.dataOn !== null  && tempState.form.description !== null && tempState.form.nation && tempState.form.subNation !== null){

            dateOn = new Date(tempState.form.dataOn)
            tempState.form.dataOn = dateOn.toISOString().substring(0, 10)
            tempState.form.dataOff = tempState.form.dataOff === null ? '' : new Date(tempState.form.dataOff).toISOString().substring(0, 10)
            tempState.form.activeMod = true
            uriFragment = queryString.stringify({data:JSON.stringify(tempState.form)})
            fetch(`/api/group/editor?${uriFragment}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.json())
                .then(data => {
                    this.setState(tempState)
                })
        }
        else{
            alert('Non hai inserito i valori necessari')
        }
    }

    render() {
        let listComponent = Object.values(this.state.creators).map((item, index) => {
            return <ListGroup.Item as='li' key={index} className="align-items-center border-0 border-top text-secondary m-0 pb-0 pt-0">
                <div className={'row'}>
                    <div className="col-8 me-2 fw-bold">
                        {item.creator.name}
                    </div>
                    <div className={'col-3 fw-bold date-creator-container'}>
                    </div>
                </div>
            </ListGroup.Item>
        })


        let listContainer = Object.values(this.state.containers)
            .sort((a, b) => {return new Date(a.container.datePublish) - new Date(b.container.datePublish)})
            .map((item, index) => {
                let roleCreator = item.container.associationCont.length === 1 ? ' - Solista' : ''
                let datePub = item.container.datePublish === null ? '' : new Date(item.container.datePublish).toLocaleDateString()
                return <ListGroup.Item as='li' key={index} className="align-items-center border-0 border-top text-secondary m-0 pb-0 pt-0">
                    <div className={'row'}>
                        <div className="col-8 me-2 fw-bold">
                            {item.container.name}
                        </div>
                        <div className={'col-3 fw-bold date-creator-container'}>
                            {datePub}
                        </div>
                    </div>
                </ListGroup.Item>
        })


        let groupBox = this.state.form.activeMod === true ?
            <DataListGroup data={this.state.form}
                           nations={this.state.nations}
                           subNations={this.state.subNations}
                           toggle={this.toggleDataBox}></DataListGroup> :

            <FormGroupEditor data={this.state.form}
                             nations={this.state.nations}
                             subNations={this.state.subNations}
                             handleChange={this.handleChangeForm}
                             handleDateChangeOn={this.handleDateChangeOn}
                             handleDateChangeOff={this.handleDateChangeOff}
                             handleSubmit={this.handleSubmit}
                             toggle={this.toggleDataBox}></FormGroupEditor>
        return(
            <div className={'container mt-2 p-3 pt-0 container-editor'}>
                <div className={'row p-0 m-0'}>


                    <div className={'col-sm-12 col-md-12 col-lg-4 me-0 pe-1 ps-0 mb-1'}>
                        {groupBox}
                    </div>
                    <div className={'col-sm-12 col-md-12 col-lg-8 me-0 pe-0 ps-0 mb-1'}>

                        <div className={'row h-100 p-0 m-0 '}>
                            <div className={'col-sm-12 col-md-12 col-lg-6 p-0 m-0 mb-0 pe-1 margin-box-middle'}>
                                <div className={'border h-100'}>
                                    <div className={'row p-0 m-0'}>
                                        <div className={'col-12 me-0 pe-0 title-list border-bottom'}>
                                            <h5 className={'p-0 m-0 pt-1 pb-1'}>
                                                {this.context.changes.container.plural}
                                            </h5>
                                        </div>
                                        <div className={'col-1 justify-content-center align-items-center'}></div>
                                    </div>
                                    <div className="container overflow-auto pt-2">
                                        <ListGroup as="ol" className={'list-group-flush mx-0 small'}>
                                            {listContainer}
                                        </ListGroup>
                                        <hr className={'mt-0 pt-0 text-secondary'}></hr>
                                    </div>
                                </div>
                            </div>

                            <div className={'col-sm-12 col-md-12 col-lg-6 p-0 m-0 mb-0 pe-1'}>
                                <div className={'border h-100'}>
                                    <div className={'row p-0 m-0'}>
                                        <div className={'col-12 me-0 pe-0 title-list border-bottom'}>
                                            <h5 className={'p-0 m-0 pt-1 pb-1'} >
                                                Componenti del {this.context.changes.group.name}
                                            </h5>
                                        </div>
                                        <div className={'col-1 justify-content-center align-items-center'}></div>
                                    </div>
                                    <div className="container overflow-auto pt-2">
                                        <ListGroup as="ol" className={'list-group-flush mx-0 small'}>
                                            {listComponent}
                                        </ListGroup>
                                        <hr className={'mt-0 pt-0 text-secondary'}></hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditorGroup;