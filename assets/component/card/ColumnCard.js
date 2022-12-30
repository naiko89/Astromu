import React from "react";
import formFirstInsert from "../../forms/FormFirstInsert";
import {ResizeLayout} from "../layout/ResizeLayout";
import FirstViewer from "../../box/show/FirstViewer";

class PrimaryCard extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {textarea:'',select:'', composition: []}
        this.handleSubmitCard = this.handleSubmitCard.bind(this)
        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        //this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
    }

    handleSubmitCard(snippet){
        this.props.handleCompositionFormAdd(snippet)
        //alert('cambia lo state della card')
        this.setState(snippet)
    }

    handleCompositionRedit(id, type, text) {
        // alert('dentro Composition Redit'+'---->'+id+'---->'+type+'---->'+text)
        this.setState({handleValues:{trigger:true, textarea:text, id:id, select:type}})
    }

    render() {

        let Form = formFirstInsert;
        let thisHandle= ''
        let peces = this.state.composition

        if(this.props.handleValues.trigger){
            thisHandle= 'deve diventare form di modifica'
        }

        return(

            <>
                <ResizeLayout enable ={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                   <div className="card text-center">
                      <div className="card-body p-2">
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <h6 className="card-title">Gestione

                                    {JSON.stringify(this.props.handleValues)}

                                </h6>

                                <Form handleSubmitCard={this.handleSubmitCard} formValues={this.props.handleValues} onChange={this.onChange}>

                                </Form>

                            </div>
                        </div>
                      </div>
                   </div>


                    <FirstViewer peces={peces}>

                    </FirstViewer>
                </ResizeLayout>
            </>
        )
    }
}

export default PrimaryCard;