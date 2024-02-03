import React from 'react'
import {ListGroup} from "react-bootstrap";

class DataListContainer extends React.Component{

    constructor(props) {
        super(props);
        this.props = props
    }


    render() {

        let datePublish = this.props.data.datePublish === null ? null : new Date( this.props.data.datePublish )
        let datePublishString = datePublish === null ? '' : datePublish.toLocaleDateString()
        let textareaText = this.props.data.description === null ? '' : this.props.data.description
        let label = this.props.data.label === null ? '' : this.props.data.label
        let iconImage = (this.props.data.photo === null || this.props.data.photo === undefined || this.props.data.photo === '') ?
             '' :
            <div className={'mx-auto text-center rounded-circle'}>
                <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="180" height="180"></img>
            </div>

        return(
            <div className={'container border p-0 m-0'}>

                <div className={'row border-bottom m-0'}>
                    <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3 my-head-container'}>
                        {iconImage}
                    </div>
                </div>

                <div className={'container-fluid text-secondary small pb-2'}>

                    <div className={'row p-0 m-0'}>
                        <div className={'col-12'}><i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i></div>
                    </div>

                    <div className={'row'}>

                        <div className="container overflow-auto">
                            <ListGroup as="ol" className="list-group-flush mx-0">
                                <ListGroup.Item as="li" key="0" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Titolo</span>
                                    <span>{this.props.data.name}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="1" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Date Pubblicazione</span>
                                    <span>{datePublishString}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="3" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Etichetta</span>
                                    <span>{label}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="7" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <div className="row p-0 m-0 w-100">
                                        <div className="col-4 fw-bold text-start p-0 m-0">Descrizione</div>
                                        <div className="col-8 text-end p-0 m-0">{textareaText}</div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>

                    </div>
                </div>

            </div>

        )
    }



}




export default DataListContainer;