import React from "react";
import update from "immutability-helper";

class EditorCreator extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            creator:{id:props.creatorId, name:''},
            groups:[],
            containers:[],
            compositions:[],
            handleValues: {trigger:false, textarea:'',id:'', select: false}
        }

        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
        console.log('Vai con la Query per le Informazioni del Creatore')
    }

    render() {
        return(
            <>
                <h5>Sei dentro l editor del creatore {this.state.creator.id}</h5>
            </>
        )
    }
}

export default EditorCreator;