import React from "react";
import FormCompositionEditor from "../component/forms/FormCompositionEditor";
import EditorCompostionHashes from "../component/items/itemModalCompositionAccent/EditorCompostionHashes";
// import {ResizeLayout} from "../component/layout/ResizeLayout";  --> remove this component
import {Form, Button, Image, ListGroup, Card, Navbar, Nav} from 'react-bootstrap';
import ItemCompositionEditorPiece from "../component/items/ItemCompositionEditorPiece";
import update from "immutability-helper";
import { Configuration, OpenAIApi } from "openai";
import queryString from "query-string";
import ContextGlobally from "../context/ContextGlobally";


class PrimaryCard extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            composition:[],
            formValues: {trigger:false,
                textarea:'',
                id:'', idPiece:'', analizedHash: undefined, select: false},
            handleShowForm : false
            //aiAnalyst: {rym:[]}
        }
        this.onChangePieceForm = this.onChangePieceForm.bind(this)
        this.handleCompositionPieceAdd = this.handleCompositionPieceAdd.bind(this)
        this.handleCompositionPieceModify = this.handleCompositionPieceModify.bind(this)
        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
        this.handleCompositionLvOne = this.handleCompositionLvOne.bind(this)
        this.toggleTextarea = this.toggleTextarea.bind(this)
        this.exit = this.exit.bind(this)


    }

    static contextType = ContextGlobally;

    componentDidMount() {
        let uriFragment = queryString.stringify({data:JSON.stringify({id:this.props.id})});
        let pieces
        fetch(`/api/composition/editor/fistanaly?${uriFragment}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                pieces = JSON.parse(data)
                this.setState({ composition: pieces,
                    formValues:{trigger:false, textarea:'',id:'',idPiece:'', select: false, analizedHash: []}
                })

            })
            .catch(error => console.error(error));
    }

    onChangePieceForm(event){
        let formValues = this.state
        formValues.formValues[event.target.name] = event.target.value
        this.setState(formValues)
    }

    handleCompositionPieceAdd() {
        let pieces=this.state.composition
        let dataObj
        let uriFragment = queryString.stringify({data:JSON.stringify({idComp: this.props.id, pieceText: this.state.formValues.textarea, pieceType: this.state.formValues.select})})

        if(this.state.formValues.textarea !== '' && this.state.formValues.select !== false){
            fetch(`/api/composition/editor/fistanaly?${uriFragment}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .then(data => {
                    dataObj = JSON.parse(data)
                    pieces.push({ text : {idPiece: dataObj.idPiece, textarea:this.state.formValues.textarea,
                            select:this.state.formValues.select}, hashes:dataObj.hashes, lvOneToggle:false})
                    this.setState({ composition: pieces,
                        formValues:{trigger:false, textarea:'',id:'',idPiece:'', select: false, analizedHash: []}
                    })

                    console.log('sei nella chiamata ajax submit')
                    console.log(this.state)
                })
                .catch(error => console.error(error));
        }
        else{
            alert('Dati non completi')
        }
    }

    handleCompositionPieceModify(formValues) {
        let pieces = this.state.composition;
        let dataObj
        let uriFragment = queryString.stringify({data:JSON.stringify({idComp: this.props.id, idPiece: this.state.formValues.idPiece, pieceText: this.state.formValues.textarea, pieceType: this.state.formValues.select})})

        fetch(`/api/composition/editor/fistanaly?${uriFragment}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                dataObj = JSON.parse(data)
                if(dataObj.done === true){
                    pieces[this.state.formValues.id]={ text : {idComp: this.props.id, idPiece: this.state.formValues.idPiece, textarea:this.state.formValues.textarea,
                            select:this.state.formValues.select}, hashes:dataObj.hashes, lvOneToggle:false}
                    this.setState({composition: pieces,
                        formValues:{trigger:false, textarea:'',id: '',idPiece: '', select: false, analizedHash: []} })

                    console.log('sei nella chiamata ajax modify')
                    console.log(this.state)
                }

            })
            .catch(error => console.error(error));
    }
    handleCompositionRedit(id, idPiece, type, text) {
        let tempState = this.state
        tempState.formValues = {trigger:true, textarea:text, id:id, idPiece: idPiece ,select: type, analizedHash: []}
        this.setState(tempState)
    }

    handleCompositionRemove(id, idPiece) { //alert(idPiece)

        let uriFragment = queryString.stringify({data:JSON.stringify({idPiece:idPiece})})

        fetch(`/api/composition/editor/fistanaly?${uriFragment}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                alert('Elemento eliminato con Successo')
                this.setState((prevState) => ({
                    composition: update(prevState.composition, {$splice: [[id, 1]]})
                }))
                this.setState({formValues:{trigger:false, textarea:'',id:'', select: false}})
            })
            .catch(error => console.error(error))
    }
    handleCompositionLvOne(id){
        let tempState= this.state
        tempState.composition[id].lvOneToggle = ! tempState.composition[id].lvOneToggle
        this.setState(tempState)
    }

    toggleTextarea(){
        let tempState = this.state
        tempState.handleShowForm = !tempState.handleShowForm
        this.setState(tempState)
    }

    exit(){
        this.props.hideEditComp()
    }

    render() {

        let Form = FormCompositionEditor
        let pieces = this.state.composition
        let classIconToggleForm = this.state.handleShowForm === true ? 'bi bi-arrow-up-square d-md-none float-end' : 'bi bi-arrow-down-square d-md-none float-end'


        console.log('e qesto è del render')
        console.log(this.state)

        return(
            <>
                    <div className={'row p-1 p-0 m-0 d-flex justify-content-center'}>
                        <div className={'col-sm-12 col-md-6 col-lg-4 me-0 pe-1 ps-0 mb-1 form-pieces text-center rounded-0'}>
                            <Card className={'card-content border-1 text-secondary my-form-add-pieces-composition'}>
                                <Card.Title className={'b-0 m-0'}>
                                    <div className={'row pt-1 pb-1 pe-3'}>
                                        <div className={'col-12'}>
                                            <h4>{this.props.name}</h4>
                                            <i className={ classIconToggleForm }
                                               data-bs-toggle="collapse"
                                               data-bs-target="#myForm"
                                               aria-expanded="false"
                                               aria-controls="myForm" style={{ fontSize: '20px' }} onClick={this.toggleTextarea}></i>
                                        </div>
                                    </div>
                                </Card.Title>
                                <Card.Body className={'mt-0 mb-0 pb-0 pt-0'}>
                                    <div className="container-fluid">
                                        <div className="collapse d-md-block row" id="myForm">
                                            <div className="card card-body border-0">
                                                <Form handleSubmitCard={this.handleCompositionPieceAdd}
                                                      handleModifyCard={this.handleCompositionPieceModify}
                                                      formValues={this.state.formValues}
                                                      placeholder={this.context.changes.composition}
                                                      onChangeCompositionForm={this.onChangePieceForm}>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className={'col-sm-12 col-md-6 col-lg-4 scrollable-pieces'}>
                            <ItemCompositionEditorPiece pieces={this.state.composition}
                                                        handleCompositionRemove={this.handleCompositionRemove}
                                                        handleCompositionRedit={this.handleCompositionRedit}
                                                        handleCompositionLvOne={this.handleCompositionLvOne}>
                            </ItemCompositionEditorPiece>
                        </div>
                    </div>

            </>
        )
    }
}

export default PrimaryCard;