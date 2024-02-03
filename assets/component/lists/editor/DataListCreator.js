import React from 'react'
import {ListGroup} from "react-bootstrap";



class DataListCreator extends React.Component{

    constructor(props) {
        super(props);
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
        let dateBirth = this.props.data.dateBirth === null ? null : new Date( this.props.data.dateBirth )
        let dateBirthString = dateBirth === null ? '' : dateBirth.toLocaleDateString()
        // let classDescriptionCompact = this.state.descriptionToggle ? 'col-8 p-0 m-0 custom-truncate' : 'col-8 p-0 m-0';


        let description = this.props.data.description !== null ?
            this.state.descriptionToggle ? this.props.data.description.trim().split(' ').slice(0,20).join(' ').concat('...')  : this.props.data.description
            : ''

        // console.log('questa') console.log(this.props.data) console.log(this.props.nations) alert(nationId)

        let nationName = nationId === undefined ? '' : this.props.nations.map((item) =>{
            if(item.id === parseInt(nationId)){
                return item.name
            }
        }).join('')

        let subnationName = subNation === undefined ? '' : this.props.subNations.map((item) =>{
            if(item.id === parseInt(subNation)){ return item.name }
        }).join('')

        // alert(nationName)

        let iconImage = (this.props.data.photo === null || this.props.data.photo === undefined) ?
            '' :
            <div className={'mx-auto text-center rounded-circle'}>
               <img className='rounded-circle img-bordered m-0 t-0' src={this.props.data.photo} width="180" height="180"></img>
            </div>

        {/* <div className={'icon-profile-box bg-white'} style={{border: '1px solid rgb(128, 128, 128)'}}><i className="bi bi-person-fill icon-profile"></i></div> */}
        return(
            <div className={'container border p-0 m-0'}>

                <div className={'row border-bottom m-0'}>
                    <div className={'col-12 d-flex justify-content-center align-items-center pt-3 pb-3 my-head-creator'}>
                            {iconImage}
                    </div>
                </div>

                <div className={'container-fluid text-secondary small pb-2 m-0'}>

                    <div className={'row p-0 m-0'}>
                        <div className={'col-12 bg-white'}>
                            <i className="bi bi-pencil-square float-end" style={{ fontSize: '20px' }} onClick={this.props.toggle}></i>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="container overflow-auto">
                            <ListGroup as="ol" className="list-group-flush mx-0">
                                <ListGroup.Item as="li" key="0" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Name d'Arte</span>
                                    <span>{this.props.data.name}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="1" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Nome</span>
                                    <span>{this.props.data.firstname}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="2" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Cognome</span>
                                    <span>{this.props.data.surname}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="3" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Data di Nascita</span>
                                    <span>{dateBirthString}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="5" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
                                    <span className="me-2 fw-bold">Nazione</span>
                                    <span>{nationName}</span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" key="6" className="list-group-item d-flex justify-content-between align-items-center my-0" action variant="light">
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




export default DataListCreator