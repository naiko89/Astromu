import React from 'react';
import ColumnCard from "../component/card/EditorComposition";
import ListCompositions from "../component/lists/ListCompositions"

class ShowCompositions extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            compositionEdit: { trigger:false },
            header: { links: [ { name:'#home', ID:0 }, { name:'#profile', ID:1 }, { name:'#messages', ID:2 } ] },
            layout: { component:'FirstViewer' },
            composition: [ ],
            handleValues: { trigger:false, textarea:'', id:'', select:false },
            viewMode: {show:false, composition: {id:null}}
        }

        this.handleShowCompositionEdit = this.handleShowCompositionEdit.bind(this)
        this.handleHideCompositionEdit = this.handleHideCompositionEdit.bind(this)
    }

    handleShowCompositionEdit(id){
        let tempState = this.state
        tempState.viewMode.show = true
        tempState.viewMode.composition.id = id
        this.setState(tempState)
    }

    handleHideCompositionEdit(){
        let tempState = this.state
        tempState.viewMode.show = false
        this.setState(tempState)
    }


    render() {

        let View = this.state.viewMode.show ?
             <ColumnCard id={this.state.viewMode.composition.id} hideEditComp={this.handleHideCompositionEdit}></ColumnCard> :
             <ListCompositions showEditComp={this.handleShowCompositionEdit}  id={this.state.viewMode.composition.id}></ListCompositions>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>


        );
    }
}

export default ShowCompositions;


//<ul className="nav" id="myTab">
//{linksCardsHeader}
//</ul>


// <BoxedColumMenu cardTitle='Titolo ShowCompositions Column'> </BoxedColumMenu>