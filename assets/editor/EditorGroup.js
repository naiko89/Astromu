import React from "react";
import update from "immutability-helper";

class EditorGroup extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            group:{ id:this.props.groupId, name:'' },
            creators:[],
            containers:[],
            compositions:[],
            handleValues: { trigger:false, textarea:'',id:'', select: false }
        }

        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
        console.log('Vai con la Query per le Informazioni del Gruppo')
    }

    render() {
        return(
            <>
                <h5>Sei dentro l editor del gruppo {this.state.group.id}</h5>
            </>
        )
    }
}

export default EditorGroup;