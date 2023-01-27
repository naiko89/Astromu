import React from 'react';
const $ = require('jquery');

/////rename it!!!!
class ItemCompositionEditorPiece extends React.Component{

    constructor(props) {
        super(props);
        this.props = props
        this.handleReditPeces = this.handleReditPeces.bind(this)
        this.handleRemovePeces = this.handleRemovePeces.bind(this)
        this.handleCompositionRemove = props.handleCompositionRemove;
        this.handleCompositionRedit = props.handleCompositionRedit;
    }

    handleReditPeces(i,type,text){
        this.handleCompositionRedit(i,type,text)
    }

    handleRemovePeces(i){
        this.handleCompositionRemove(i)
    }

    render(){
        return(
            <>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <ul className="list-group col-5 ms-1">

                            {Object.entries(this.props.peces).map(([key, value]) =>
                                <li className={"list-group-item border-0 p-0 pt-1"} key={key}>
                                    <div className="card">
                                        <div className="card-header m-0 p-1">
                                            <ul className="list-group">
                                                <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                                                    A list item {value.select}
                                                    <span className="">
                                                        <button className={'badge bg-danger'} onClick={()=>this.handleRemovePeces(key)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                        <button className={'badge bg-warning text-dark'} onClick={()=>this.handleReditPeces(key, value.select, value.textarea)}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <p className="card-text">{value.textarea}</p>
                                        </div>

                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </>
    )}
}

export default ItemCompositionEditorPiece