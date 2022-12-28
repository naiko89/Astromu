import React from "react";


class PrimaryCard extends React.Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state = {textarea:'',select:''}

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange(event){
        console.log('on change')
        this.props.onChangeSup(event.target.name, event.target.value)
        //this.render()
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.handleCompositionFormAdd({ textarea: this.props.handle.textarea, select: this.props.handle.select })
    }

    render() {

        let thisHandle= ''
        const linksCardHeader = this.props.cardLinks.map((link) =>
            <li className="nav-item" style={{fontSize: 15}} key={link.ID}>
                <a href={link.name} className="nav-link card-anchor" data-bs-toggle="tab" onClick={this.props.onClickHandlers[link.ID]}> {link.name.replace('#','')} </a>
            </li>
        );



        if(this.props.handle.trigger){
            thisHandle= 'deve diventare form di modifica'
        }

        // console.log('********') console.log(this.props) console.log('********')

        // console.log('****** Column Card')
        // console.log(this.props.modify)
        // console.log('***')
        // console.log(this.state)
        // console.log('******')

        return(



            <>
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs justify-content-center" id="myTab">
                            {linksCardHeader}
                        </ul>
                    </div>
                    <div className="card-body p-2">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="home">
                                <h6 className="card-title">Gestione {JSON.stringify(this.props.handle)}</h6>


                                    <form className="container p-0" onSubmit={this.handleSubmit}>

                                        {thisHandle}

                                        <div className="row mb-2">
                                            <div className="col-12 mb-2">
                                                <select id="tipo-testo" value={this.props.handle.select} className="form-select text-center" onChange={this.onChange} name="select">
                                                    <option value="null">Seleziona il tipo di testo</option>
                                                    <option value="S">S</option>
                                                    <option value="R">R</option>
                                                    <option value="RM">RM</option>
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <textarea className="form-control textarea-compact p-1" onChange={this.onChange} value={this.props.handle.textarea || ""} name="textarea"/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <input className={"btn btn-success"} type='submit' value="Aggiungi"/>
                                            </div>
                                        </div>
                                    </form>


                            </div>
                            <div className="tab-pane fade" id="profile">
                                <h6 className="card-title">Possibile menu 2</h6>

                            </div>
                            <div className="tab-pane fade" id="messages">
                                <h6 className="card-title">Possibile menu 3</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PrimaryCard;