import React from 'react';
// import ColumnCard from "../editor/EditorComposition";
import ListGroup from "../component/lists/ListGroup"

class ShowGroup extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            creatorEdit: { trigger:false },
            // header: { links: [ { name:'#home', ID:0 }, { name:'#profile', ID:1 }, { name:'#messages', ID:2 } ] },
            // layout: { component:'FirstViewer' },
            group: [ ],
            handleValues: { trigger:false, textarea:'', id:'', select:false },
            viewMode: {show:false, group: {id:null}}
        }

        this.handleShowGroupEdit = this.handleShowGroupEdit.bind(this)
        this.handleHideGroupEdit = this.handleHideGroupEdit.bind(this)
    }

    handleShowGroupEdit(id){
        let tempState = this.state
        tempState.viewMode.show = true
        tempState.viewMode.group.id = id
        this.setState(tempState)
    }

    handleHideGroupEdit(){
        let tempState = this.state
        tempState.viewMode.show = false
        this.setState(tempState)
    }


    render() {
        let View = this.state.viewMode.show ?
             <div>editor del creator</div> :
             <ListGroup showEditComp={this.handleShowGroupEdit}  id={this.state.viewMode.group.id}></ListGroup>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>


        );
    }
}

export default ShowGroup;


//<ul className="nav" id="myTab">
//{linksCardsHeader}
//</ul>


// <BoxedColumMenu cardTitle='Titolo ShowCompositions Column'> </BoxedColumMenu>