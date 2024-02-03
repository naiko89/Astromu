import React from "react";
import {ListGroup, Card} from 'react-bootstrap';
import FormCreatorEditor from "../component/forms/editors/dataDescrEditor/FormCreatorEditor";
import DataListCreator from "../component/lists/editor/DataListCreator";
import '../styles/editor.css';


import queryString from "query-string";
import Resizer from "react-image-file-resizer";
import ContextGlobally from "../context/ContextGlobally";

class EditorCreator extends React.Component {

    constructor(props) {
        super(props)
        this.props=props
        this.state = {
            creator:{ id:props.creatorId},
            form:{id: props.creatorId, name:'', firstname: '', surname: '', dateBirth: null, nation: '', subNation: '', description: '', photo: null, activeMod: true},
            groups:[],
            containers:[],
            compositions:[],
            nations:[{ id: 0, name: 'Seleziona una Nazione', className: null},
                { id: 118, name: 'Italia', value: 'IT' }],
            subNations:[],
            handleValues: { trigger:false, textarea:'',id:'', select: false, fileSize : 30000}
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDateChangeDateBirth = this.handleDateChangeDateBirth.bind(this)
        this.handleChangeFrom = this.handleChangeFrom.bind(this)
        this.toggleDataBox = this.toggleDataBox.bind(this)
    }

    static contextType = ContextGlobally;

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
                tempState.form.activeMod = (data.creator.firstname !== null && data.creator.surname !== null)
                this.setState(tempState)

                console.log(tempState)

            })
            .catch(error => console.error(error))
    }

    async handleChange(event) {
        const target = event.target;
        const name = target.name;
        let tempState = this.state

        function getBase64(file) {
            return new Promise((resolve, reject) => {
                Resizer.imageFileResizer(
                    file,
                    120,
                    120,
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

        const value = target.type === 'file' ? target.files[0] : target.value;
        tempState['form'][name] = value

        if(target.type === 'file'){ //there isn't problem of file size ( we compressed it with react-image-file-resizer)
            tempState['form'][name]= await getBase64(value).then((phStr)=>{
                    return phStr
            })
        }

        // console.log(tempState)
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
        let dateBirth, uriFragment
        let tempState = this.state
        if(tempState.form.firstname !== null && tempState.form.surname !== null && tempState.form.nation !== null && tempState.form.subNation !== null && tempState.form.dateBirth !== null){
            dateBirth = new Date(tempState.form.dateBirth)
            tempState.form.dateBirth = dateBirth.toISOString().substring(0, 10)
            tempState.form.activeMod = true
            uriFragment = queryString.stringify({data:JSON.stringify(tempState.form)})
            fetch(`/api/creator/editor?${uriFragment}`, {
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

    handleDateChangeDateBirth(date){
        let tempState = this.state
        tempState.form.dateBirth = date
        this.setState(tempState) 
    }

    toggleDataBox(){
        let tempState = this.state
        tempState.form.activeMod = !tempState.form.activeMod
        this.setState(tempState)
    }

    render() {
        let listGroups = Object.values(this.state.groups).map((item, index) => {
            let containers = item.team.associationCont
                .sort((a, b) => {return new Date(a.container.datePublish) - new Date(b.container.datePublish)})
                .map((item, index) =>{
                let datePub = item.container.datePublish === null ? '' : new Date(item.container.datePublish).toLocaleDateString()
                return <ListGroup.Item className={'mt-0 mb-0 pt-1 pb-0 border-0 small border-bottom creator-list-group-container-border'} key={item.id}>
                    <div className={'row'}>
                        <div className="col-11 me-2">
                            <blockquote className="m-0 p-0">
                            {item.container.name}
                            </blockquote>
                            <figcaption className="date-publish-list">
                                <span className={'text-secondary small'}> {datePub}</span>
                            </figcaption>
                        </div>
                    </div>

                </ListGroup.Item>
            })
            return  <Card key={item.id} className={'mt-2 border-0 border-top rounded-0'}>
                <Card.Body className={'p-0'}>
                    <Card.Header className={'border-0 m-0 pb-0 pt-0 bg-white'}>
                        <div className={'row d-flex justify-content-between align-items-center text-secondary'}>
                            <span className="col-10 me-2 fw-bold">{ item.team.name }</span>
                            <span className="col-1 p-0 m-0"></span>
                        </div>
                    </Card.Header>

                    <ListGroup className={'ps-2 rounded-0'}>
                        {containers}
                    </ListGroup>
                </Card.Body>
            </Card>
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

        let creatorBox = this.state.form.activeMod === true ?
            <DataListCreator data={this.state.form}
                             nations={this.state.nations}
                             subNations={this.state.subNations}
                             toggle={this.toggleDataBox}/> :
            <FormCreatorEditor data={this.state.form}
                               handleChange={this.handleChange}
                               handleDateChangeBirth={this.handleDateChangeDateBirth}
                               handleChangeFrom={this.handleChangeFrom}
                               handleSubmit={this.handleSubmit}
                               nations={this.state.nations}
                               subNations={this.state.subNations}
                               toggle={this.toggleDataBox}/>


        return(
            <div className={'container mt-2 p-3 pt-0 container-editor'}>

                <div className={'row m-0 p-0'}>

                    <div className={'col-sm-12 col-md-12 col-lg-4 me-0 pe-0 ps-0 mb-1'}>
                        {creatorBox}
                    </div>
                    <div className={'col-sm-12 col-md-12 col-lg-8 me-0 pe-0 ps-0 mb-1'}>
                        <div className={'row h-100 p-0 m-0'}>
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
                                                {this.context.changes.group.plural}
                                            </h5>
                                        </div>
                                        <div className={'col-1 justify-content-center align-items-center'}></div>
                                    </div>
                                    <div className="container overflow-auto">
                                        <ListGroup as="ol" className={'list-group-flush mx-0 small'}>
                                            {listGroups}
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

export default EditorCreator;