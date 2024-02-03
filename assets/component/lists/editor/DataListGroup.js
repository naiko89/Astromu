import React from 'react'
import {ListGroup} from "react-bootstrap";



class DataListGroup extends React.Component{

    constructor(props) {
        super(props)
        this.state = {descriptionToggle: true}
        this.props = props
        this.toggleDescription = this.toggleDescription.bind(this)
    }

    toggleDescription = ()=>{
        let tmp = this.state
        let descriptionDivElement = document.getElementById('description');
        tmp.descriptionToggle = ! tmp.descriptionToggle
        descriptionDivElement.scrollBy(300, 300)
        this.setState(tmp)

    }

    render() {
        let nationId = this.props.data.nation === null ? '' : this.props.data.nation.id
        let subNation = this.props.data.subNation === null ? '' : this.props.data.subNation.id
        let dateOn = this.props.data.dataOn === null ? null : new Date( this.props.data.dataOn )
        let dateOff = this.props.data.dataOff === null ? null : new Date( this.props.data.dataOff )
        let dateOnString = dateOn === null ? '' : dateOn.toLocaleDateString()
        let dateOffString = dateOff === null ? '' : dateOff.toLocaleDateString()
        let description = this.props.data.description !== null ?
            this.state.descriptionToggle ? this.props.data.description.trim().split(' ').slice(0,20).join(' ').concat('...')  : this.props.data.description
            : ''
        // console.log('questo') console.log(this.props.data)

        let nationName = nationId === undefined ? '' : this.props.nations.map((item) =>{
            if(item.id === parseInt(nationId)){
                return item.name
            }
        }).join('')

        let subnationName = subNation === undefined ? '' : this.props.subNations.map((item) =>{
            if(item.id === parseInt(subNation)){ return item.name }
        }).join('')

        let iconImage = (this.props.data.photo === null || this.props.data.photo === undefined || this.props.data.photo === '') ?
            '' : //-->here you must go in server side to adjust the null/undefind/'' string
            <div className={'mx-auto text-center rounded-circle'}>
                <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="180" height="180"></img>
            </div>

        return(
            <div className={'container border p-0 m-0'}>

                <div className={'row border-bottom m-0'}>
                    <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3 my-head-group'}>
                        {iconImage}
                    </div>
                </div>

                <div className={'container-fluid text-secondary small pb-2'}>

                    <div className='row p-0 m-0'>
                        <div className={'col-12'}><i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i></div>
                    </div>

                    <div className={'row'}>
                        <div className="container overflow-auto">
                            <ListGroup as="ol" className="list-group-flush mx-0">
                                <ListGroup.Item as="li" key="0" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Nome Gruppo</span>
                                    <span>{this.props.data.name}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="1" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Data Fondazione</span>
                                    <span>{dateOnString}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="2" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Data Scioglimento</span>
                                    <span>{dateOffString}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="3" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Nazione</span>
                                    <span>{nationName}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="4" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Regione</span>
                                    <span>{subnationName}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="7" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <div className="row p-0 m-0 w-100">
                                        <div className="col-4 fw-bold text-start p-0 m-0">Descrizione</div>
                                        <div className='col-8 p-0 m-0 text-end' onClick={this.toggleDescription} id='description'>{description}</div>
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


export default DataListGroup

