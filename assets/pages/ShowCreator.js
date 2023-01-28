import React from 'react';
// import ColumnCard from "../editor/EditorComposition";
import ListCreator from "../component/lists/ListCreator"

class ShowCreator extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            creatorEdit: { trigger:false },
            // header: { links: [ { name:'#home', ID:0 }, { name:'#profile', ID:1 }, { name:'#messages', ID:2 } ] },
            // layout: { component:'FirstViewer' },
            creator: [ ],
            handleValues: { trigger:false, textarea:'', id:'', select:false },
            viewMode: {show:false, creator: {id:null}}
        }

        this.handleShowCreatorEdit = this.handleShowCreatorEdit.bind(this)
        this.handleHideCreatorEdit = this.handleHideCreatorEdit.bind(this)
    }

    handleShowCreatorEdit(id){
        let tempState = this.state
        tempState.viewMode.show = true
        tempState.viewMode.creator.id = id
        this.setState(tempState)
    }

    handleHideCreatorEdit(){
        let tempState = this.state
        tempState.viewMode.show = false
        this.setState(tempState)
    }


    render() {
        let View = this.state.viewMode.show ?
             <div>editor del creator</div> :
             <ListCreator showEditComp={this.handleShowCreatorEdit}  id={this.state.viewMode.creator.id}></ListCreator>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>


        );
    }
}

export default ShowCreator;


//<ul className="nav" id="myTab">
//{linksCardsHeader}
//</ul>


// <BoxedColumMenu cardTitle='Titolo ShowCompositions Column'> </BoxedColumMenu>