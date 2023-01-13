import React from 'react';

class FormComposition extends React.Component{

    constructor(props) {
        super(props);
        this.props=props
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        //this.setState({showModal: false})
    }
    handleDisplay(val){
        this.props.displayHandle(val)
    }

    handleSubmit(event){
        event.preventDefault()
    }

    render(){
        let display=this.props.display
        // alert(JSON.stringify(this.state))

        return(
            <>
                <div className={`modal ${display ? 'show d-block' : ''}`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" onClick={()=>this.handleDisplay(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h4>Form 2</h4>
                                <form>
                                    <label>
                                        Valore Uno:
                                        <input type="text"/>
                                    </label>
                                    <input type='submit' value="Submit"/>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default FormComposition