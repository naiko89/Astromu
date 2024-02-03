import React from 'react';
import EditorCompostionHashes from "./itemModalCompositionAccent/EditorCompostionHashes";

/////rename it!!!!
class ItemCompositionEditorPiece extends React.Component{

    constructor(props) {
        super(props);
        this.props = props
        this.state = {modal: false, pieces : ''}
        this.handleToParentReditPeces = this.handleToParentReditPeces.bind(this)
        this.handleToParentRemovePeces = this.handleToParentRemovePeces.bind(this)
        this.handleToParentHashesPeaces = this.handleToParentHashesPeaces.bind(this)
        this.handleToParentHashesPeaces = this.handleToParentHashesPeaces.bind(this)
        this.handleToChildPieces = this.handleToChildPieces.bind(this)

    }


    componentDidUpdate(prevProps) { // I want define the state from the parent's props. Because use the state here is better for rendering parent's state
        if (this.props.pieces !== prevProps.pieces) {
            this.setState({ pieces: this.props.pieces });
        }
    }

    handleToParentReditPeces(i, idPiece, type, text){
        this.props.handleCompositionRedit(i,idPiece,type,text)
    }

    handleToParentRemovePeces(i, idPiece){
        this.props.handleCompositionRemove(i, idPiece)
    }

    handleToParentHashesPeaces(i){
        this.props.handleCompositionLvOne(i)
        this.setState({modal: !this.state.modal})
    }

    handleToChildPieces(nVerse,nWord,word){
        console.log(nVerse)
        console.log(nWord)
        console.log(word)
    }

    render(){

       /* console.log('///////////////')
        console.log(this.state.peces)
        console.log('///////////////')
        console.log(this.props.peces)
        console.log('---------------')


        Object.entries(this.state.peces).map(([key, value]) =>{
            console.log('!!!!!!!!!!!')
            console.log(value)
            console.log('!!!!!!!!!!!')
        })
        */


        return(


            <>
                <div className={"row m-0 p-0"}>
                        <ul className="list-group col-12 ms-1">
                            {Object.entries(this.state.pieces).map(([key, value]) =>
                                <li className={"list-group-item border-0 p-0 pt-1"} key={key}>
                                    <div className="card">
                                        <div className="card-header m-0 p-1">
                                            <ul className="list-group">
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                                                    {value.text.select}
                                                    <span className="">
                                                        <button className={'badge bg-danger'} onClick={()=>this.handleToParentRemovePeces(key, value.text.idPiece)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                        <button className={'badge bg-warning text-dark'} onClick={()=>this.handleToParentReditPeces(key, value.text.idPiece, value.text.select, value.text.textarea)}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button className={'badge bg-info'} onClick={()=>this.handleToParentHashesPeaces(key)}>
                                                             <i className={'bi bi-hash'}></i>
                                                        </button>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body" style={{whiteSpace: "pre-wrap"}}>
                                            <div className="card-text my-piece-composition">{value.text.textarea}</div>
                                            <div className="card-text">
                                                <EditorCompostionHashes
                                                    show={value.lvOneToggle}
                                                    valueHashesPiece={value.hashes}
                                                    handleModal={this.handleToParentHashesPeaces}
                                                    handleHashesPiece={this.handleToChildPieces}
                                                    id={key}
                                                    idPiece={''}>
                                                </EditorCompostionHashes>
                                            </div>

                                            {/*
                                            <div className={'card-footer'}>
                                                JSON.stringify(value.hashes)
                                            </div>
                                            */}

                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                </div>
            </>
    )}
}

export default ItemCompositionEditorPiece