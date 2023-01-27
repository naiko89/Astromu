import React from "react";
import formFirstInsert from "../component/forms/FormFirstInsert";
import {ResizeLayout} from "../component/layout/ResizeLayout";
import ItemCompositionEditorPiece from "../component/items/ItemCompositionEditorPiece";
import update from "immutability-helper";

class PrimaryCard extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            composition:[],
            handleValues: {trigger:false, textarea:'',id:'', select: false}
        }
        this.onChange = this.onChange.bind(this)
        this.handleCompositionFormAdd = this.handleCompositionFormAdd.bind(this)
        this.handleCompositionFormRedit = this.handleCompositionFormRedit.bind(this)
        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
        this.exit = this.exit.bind(this)

    }

    onChange(event){
        let formValues = this.state
        formValues.handleValues[event.target.name] = event.target.value
        this.setState(formValues)
    }

    handleCompositionFormAdd() {
        let peces=this.state.composition;
        peces.push({'textarea':this.state.handleValues.textarea,'select':this.state.handleValues.select})
        this.setState({ composition: peces,
            handleValues:{trigger:false, textarea:'',id:'', select: false}  })
    }

    handleCompositionFormRedit(id) {
        let peces = this.state.composition;
        peces[this.state.handleValues.id]={'textarea':this.state.handleValues.textarea,'select':this.state.handleValues.select}
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

        let Form = formFirstInsert;
        let peces = this.state.composition


        return(

            <>
                <ResizeLayout enable ={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
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
                    <ItemCompositionEditorPiece peces={peces}
                                                handleCompositionRemove={this.handleCompositionRemove}
                                                handleCompositionRedit={this.handleCompositionRedit}>
                    </ItemCompositionEditorPiece>
                </ResizeLayout>
            </>
        )
    }
}

export default PrimaryCard;