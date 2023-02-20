import React from "react";
import update from "immutability-helper";

class EditorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            container:{id:props.containerId, name:''},
            compositions:[],
            handleValues: {trigger:false, textarea:'',id:'', select: false}
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        console.log('Vai con la Query per le Informazioni del Container')
    }

    render() {
        return(
            <>
                <h5>Sei dentro l editor del container {this.state.container.id}</h5>
            </>
        )
    }
}

export default EditorContainer;