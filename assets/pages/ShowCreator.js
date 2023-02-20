import React from 'react';
import ListCreator from "../component/lists/ListCreator"
import EditorCreator from "../editor/EditorCreator";

class ShowCreator extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            creatorEdit: { trigger:false },
            creator: [ ],
            handleValues: { trigger:false, textarea:'', id:'', select:false },
            viewMode: {show:false, creator: { id:null }}
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
             <EditorCreator creatorId = {this.state.viewMode.creator.id}> </EditorCreator> :
             <ListCreator showEditCrea={this.handleShowCreatorEdit}  id={this.state.viewMode.creator.id}> </ListCreator>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>
        );
    }
}

export default ShowCreator;