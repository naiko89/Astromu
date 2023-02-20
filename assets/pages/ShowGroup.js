import React from 'react';
import ListGroup from "../component/lists/ListGroup"
import EditorGroup from "../editor/EditorGroup";

class ShowGroup extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            creatorEdit: { trigger:false },
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

    handleHideGroupEdit(id){
        let tempState = this.state
        tempState.viewMode.show = false
        this.setState(tempState)
    }

    render() {
        let View = this.state.viewMode.show ?
             <EditorGroup groupId={this.state.viewMode.group.id}>editor del creator</EditorGroup> :
             <ListGroup showEditGroup={this.handleShowGroupEdit}  id={this.state.viewMode.group.id}></ListGroup>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>
        );
    }
}

export default ShowGroup;