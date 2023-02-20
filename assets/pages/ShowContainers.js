import React from 'react';
//import ColumnCard from "../editor/EditorComposition";
import ListContainers from "../component/lists/ListContainers"
import EditorContainer from "../editor/EditorContainer";

class ShowContainers extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            compositionEdit: { trigger:false },
            layout: { component:'FirstViewer' },
            container: [ ],
            handleValues: { trigger:false, textarea:'', id:'', select:false },
            viewMode: {show:false, container: {id:null}}
        }

        this.handleShowContainerEdit = this.handleShowContainerEdit.bind(this)
        this.handleHideContainerEdit = this.handleHideContainerEdit.bind(this)
    }

    handleShowContainerEdit(id){
        let tempState = this.state
        tempState.viewMode.show = true
        tempState.viewMode.container.id = id
        this.setState(tempState)
    }

    handleHideContainerEdit(){
        let tempState = this.state
        tempState.viewMode.show = false
        this.setState(tempState)
    }


    render() {

        let View = this.state.viewMode.show ?
            <EditorContainer containerId={this.state.viewMode.container.id}>editor del contenitore</EditorContainer> :
            <ListContainers showEditCont={this.handleShowContainerEdit}  id={this.state.viewMode.container.id}></ListContainers>;

        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                {View}
            </div>
        );
    }
}

export default ShowContainers;
