import React from "react";
import FormCompositionEditor from "../component/forms/FormCompositionEditor";
// import {ResizeLayout} from "../component/layout/ResizeLayout";  --> remove this component
import {Form, Button, Image, ListGroup, Card, Navbar, Nav} from 'react-bootstrap';
import ItemCompositionEditorPiece from "../component/items/ItemCompositionEditorPiece";
import update from "immutability-helper";
import { Configuration, OpenAIApi } from "openai";

class PrimaryCard extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            composition:[],
            handleValues: {trigger:false, textarea:'',id:'', select: false},
            aiAnalyst: {rym:[]}
        }
        this.onChangePieceForm = this.onChangePieceForm.bind(this)
        this.handleCompositionPieceAdd = this.handleCompositionPieceAdd.bind(this)
        this.handleCompositionPieceModify = this.handleCompositionPieceModify.bind(this)
        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
        this.exit = this.exit.bind(this)

    }

    componentDidMount() {

        let apiKey = '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'
        let tempState = this.state

        const configuration = new Configuration({
            organization: "org-DnbnNyTzFvEZulsBdmUGhxyJ",
            apiKey: apiKey
        });

        const openai = new OpenAIApi(configuration);

        async function aiAnalyst() {
            let text = 'due più due fa'
            let query = `find words in "${text}" containing accent marks`
            query = "remove the consonants from the text : \"hello my name is nicola\""


            let compositionObject = [
                {n:0, verse:'nel-mez-zo-di-cam-min-di-nos-tra-vi-ta', endSyllable : 'via', rym:''},
                {n:1, verse:"mi-ri-tro-va-i-in-una-sel-va-os-cu-ra", endSyllable : 'ra', rym:''},
                {n:2, verse:'che-la-ret-ta-via-era-smar-ri-ta', endSyllable : 'ria', rym:''},
                {n:3, verse: "ahi-quan-to-a-dir-qual-era-è-co-sa-du-ra", endSyllable : 'ra', rym:''},
                {n:4, verse:"esta-sel-va-sel-vag-gio-e-as-pra-e-for-te", endSyllable : 'te', rym:''},
                {n:5, verse:"che-nel-pen-sier-rin-no-va-pa-u-ra", endSyllable : 'ra', rym:''}]


            try {


                const firstReq = '1) The structure of text is [{n,text}] where n is the number of line and the text is the text of line"+\n' +
                    '                                "2) create an array by dividing by \'-\' and take the last syllable of the line" +\n' +
                    '                                "3) just give me back the json object by adding a \\"lastSyllable\\" key that contains the last syllable" +\n' +
                    '                                "4) make a string replace \'\\n\' with \'\' in the response"+\n' +
                    '                                "5) make it for " + JSON.stringify(compositionObject)+""+\n' +
                    '                                "6) give me only the JSON response object'

                console.log('questo è --------')
                console.log(compositionObject)
                console.log('-----------------')

                const responseComp = await openai.createCompletion(
                    {
                        model: "text-davinci-003",
                        prompt: "How are you? This is the Object to analyze :" + JSON.stringify(compositionObject)+"" +
                            "1) put a letter into rym key where endSyllable have the same value" +
                            "2) write the Object JSON modified",
                        temperature: 0.5,
                        max_tokens: 1024, //+""+
                    }
                )
                /*1. take this object JSON"
                            "2. Print in csv\n*/

                console.log(responseComp.data.choices[0])

                return responseComp.data.choices[0]


            } catch (error) {
                console.log(error);
            }
        }

        //aiAnalyst().then((Obj)=>{console.log(Obj)//tempState.aiAnalyst.rym = JSON.parse(Obj)//console.log('questo è il parsing')//console.log(tempState.aiAnalyst.rym)//this.setState(tempState)//tempState.aiAnalyst.rym = JSON.parse(Obj)//this.setState(tempState)})



    }

    onChangePieceForm(event){
        let formValues = this.state
        formValues.handleValues[event.target.name] = event.target.value
        this.setState(formValues)
    }

    handleCompositionPieceAdd() {
        let peces=this.state.composition;
        peces.push({'textarea':this.state.handleValues.textarea,'select':this.state.handleValues.select})

        console.log(this.state.handleValues.textarea)

        //alert('stai cambiando lo stato qui')
        fetch(`/api/composition/editor/fistanaly/?text=${encodeURIComponent(this.state.handleValues.textarea)}`, {
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                //alert('ok')
              /*  data = JSON.parse(data)
                let tempState = this.state
                this.setState(tempState)
               */
            })
            .catch(error => console.error(error));



        this.setState({ composition: peces,
            handleValues:{trigger:false, textarea:'',id:'', select: false}  })
    }

    handleCompositionPieceModify(id) {
        let peces = this.state.composition;
        alert('stai ricambiando lo stato qui')
        peces[this.state.handleValues.id]={'textarea':this.state.handleValues.textarea,'select':this.state.handleValues.select}

        fetch(`/api/composition/editor/fistanaly/?text=${encodeURIComponent(this.state.handleValues.textarea)}`, {
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                //alert('ok')
                /*  data = JSON.parse(data)
                  let tempState = this.state
                  this.setState(tempState)
                 */
            })
            .catch(error => console.error(error));


        this.setState({composition: peces,
            handleValues:{trigger:false, textarea:'',id:'', select: false} })
    }
    handleCompositionRedit(id, type, text) {
        this.setState({handleValues:{trigger:true, textarea:text, id:id, select:type}})
    }

    handleCompositionRemove(id) {
        this.setState((prevState) => ({
            composition: update(prevState.composition, {$splice: [[id, 1]]})
        }))
        this.setState({handleValues:{trigger:false, textarea:'',id:'', select: false}})
    }
    exit(){
        this.props.hideEditComp()
    }

    render() {

        let Form = FormCompositionEditor
        let peces = this.state.composition
        let jsonAi = JSON.stringify(this.state.aiAnalyst)


        return(
            <>




                <Navbar expand="sm" variant="light" bg="light" className="custom-navbar m-1 mb-0 pb-0">
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="container-fluid justify-content-end m-1">
                            <Nav.Item className="custom-item">
                                    <button className="btn btn-danger btn-sm float-end small" onClick={this.exit}>
                                        <i className="bi bi-box-arrow-left"></i>
                                    </button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>



            <div className={'container pt-0 '}>
                <div className={'row p-1'}>

                <div className={'col-3'}>
                    <Card>
                        <Card.Title>

                        </Card.Title>
                        <Card.Body>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home">
                                    <h6 className="card-title">Gestione {this.props.id}</h6>

                                    <Form handleSubmitCard={this.handleCompositionPieceAdd} handleModifyCard={this.handleCompositionPieceModify} formValues={this.state.handleValues} onChangeSup={this.onChangePieceForm}>

                                    </Form>

                                </div>
                            </div>
                        </Card.Body>

                        <Card.Footer>

                            {jsonAi}

                        </Card.Footer>
                    </Card>
                </div>

                <div className={'col-9'}>
                    <ItemCompositionEditorPiece peces={peces}
                                                handleCompositionRemove={this.handleCompositionRemove}
                                                handleCompositionRedit={this.handleCompositionRedit}>
                    </ItemCompositionEditorPiece>
                </div>

                    {/*
                    <div className="card text-center">
                       <div className="card-header">
                           <button className="btn btn-danger btn-sm float-end" onClick={this.exit}>
                               <i className="bi bi-box-arrow-left"></i>
                           </button>
                       </div>
                      <div className="card-body p-2">
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <h6 className="card-title">Gestione {this.props.id}</h6>

                                <Form handleSubmitCard={this.handleCompositionFormAdd} handleModifyCard={this.handleCompositionFormRedit} formValues={this.state.handleValues} onChangeSup={this.onChange}>

                                </Form>

                            </div>
                        </div>
                      </div>
                   </div>
                    */}

                </div>
            </div>
            </>
        )
    }
}

export default PrimaryCard;