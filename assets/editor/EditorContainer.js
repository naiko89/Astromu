import React from "react";
import {Form, ListGroup} from "react-bootstrap";
import FormContainerEditor from "../component/forms/editors/dataDescrEditor/FormContainerEditor";
import Resizer from "react-image-file-resizer";
import queryString from "query-string";
import DataListContainer from "../component/lists/editor/DataListContainer";
import ContextGlobally from "../context/ContextGlobally";

class EditorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            form:{ id:this.props.id, name:'',datePublish: null, comp_number : '', genere:'', label:'', productor:'', description:'', prize_temp:'', isAssociated:'', photo:'', activeMod:'' },
            compositions:'',
            makers:'',
            handleValues: {trigger:false, textarea:'',id:'', select: false }
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.toggleDataBox = this.toggleDataBox.bind(this)

    }

    static contextType = ContextGlobally;

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
                tempState.form.activeMod = (data.container.label !== null && data.container.description !== null)
                this.setState(tempState)
            })
            .catch(error => console.error(error));
    }

    async handleChange(event) {
        const target = event.target
        const name = target.name
        let tempState = this.state
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                Resizer.imageFileResizer(
                    file,
                    180,
                    180,
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

    handleSubmit(event) {
        event.preventDefault()
        let datePublish, uriFragment
        let tempState = this.state

        if(tempState.form.name !== null &&  tempState.form.datePublish !== null  && tempState.form.label !== null && tempState.form.description !== null) {
            datePublish = new Date(tempState.form.datePublish)
            tempState.form.datePublish = datePublish.toISOString().substring(0, 10)
            tempState.form.activeMod = true
            uriFragment = queryString.stringify({data:JSON.stringify(tempState.form)})
            fetch(`/api/container/editor?${uriFragment}`,{
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

    handleChangeDate(date){
        let tempState = this.state;
        tempState.form.datePublish = date
        this.setState(tempState)
    }

    toggleDataBox(){
        let tempState = this.state
        tempState.form.activeMod = !tempState.form.activeMod
        this.setState(tempState)
    }

    render() {

        let listMakers = Object.values(this.state.makers).map((item, index) => {
            return <ListGroup.Item as='li' key={index} className="align-items-center border-0 border-top text-secondary m-0 pb-0 pt-0">
                <div className={'row'}>
                    <div className="col-8 me-2 fw-bold">
                        {item.name}
                    </div>
                    <div className={'col-3 fw-bold date-creator-container'}>
                    </div>
                </div>
            </ListGroup.Item>
        })
        let listCompositions =  Object.values(this.state.compositions).map((item, index) => {
            return <ListGroup.Item as='li' key={index} className="align-items-center border-0 border-top text-secondary m-0 pb-0 pt-0">
                <div className={'row'}>
                    <div className="col-8 me-2 fw-bold">
                        {item.composition.name}
                    </div>
                    <div className={'col-3 fw-bold date-creator-container'}>
                    </div>
                </div>
            </ListGroup.Item>
        })

        let containerBox = this.state.form.activeMod === true ?
            <DataListContainer data={this.state.form}
                               toggle={this.toggleDataBox}></DataListContainer> :
            <FormContainerEditor data={this.state.form}
                                 handleChange={this.handleChange}
                                 handleChangeDate={this.handleChangeDate}
                                 handleSubmit={this.handleSubmit}
                                 toggle={this.toggleDataBox}></FormContainerEditor>

        return(
            <div className={'container mt-2 p-3 pt-0 container-editor'}>
                <div className={'row p-0 m-0'}>
                    <div className={'col-sm-12 col-md-12 col-lg-4 me-0 pe-1 ps-0 mb-1'}>
                        { containerBox }
                    </div>
                    <div className={'col-sm-12 col-md-12 col-lg-8 me-0 pe-0 ps-0 mb-1'}>

                        <div className={'row h-100 p-0 m-0'}>
                            <div className={'col-sm-12 col-md-12 col-lg-6 p-0 m-0 mb-0 pe-1 margin-box-middle'}>
                                <div className={'border h-100'}>
                                    <div className={'row p-0 m-0'}>
                                        <div className={'col-12 me-0 pe-0 title-list border-bottom'}>
                                            <h5 className={'p-0 m-0 pt-1 pb-1'}>
                                                {this.context.changes.creator.plural}
                                            </h5>
                                        </div>
                                        <div className={'col-1 justify-content-center align-items-center'}></div>
                                    </div>
                                    <div className="container overflow-auto pt-2">
                                        <ListGroup as="ol" className={'list-group-flush mx-0 small'}>
                                            {listMakers}
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
                                                {this.context.changes.composition.plural}
                                            </h5>
                                        </div>
                                        <div className={'col-1 justify-content-center align-items-center'}></div>
                                    </div>
                                    <div className="container overflow-auto pt-2">
                                        <ListGroup as="ol" className={'list-group-flush mx-0 small'}>
                                            {listCompositions}
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

export default EditorContainer;