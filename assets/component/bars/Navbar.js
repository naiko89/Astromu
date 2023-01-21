import React from 'react';
import {Buttons, Dropdown} from "./NavFragment";

class Navbar extends  React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const user= this.props.nomeUser

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light border border-bottom-1 p-0 m-0">
                    <div className="container-fluid">
                        <img src={window.location.origin +'/Images/icon_recicle_.png'} alt=""/>
                        <div className="navbar-brand p-0">
                            <span className="text-secondary">Nome<span className="text-dark">Sito</span></span>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarToggler" aria-controls="navbarToggler"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarToggler" >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Buttons className="nav-link border-bottom-2 text-center p-0 m-0"
                                         classIcon={"bi bi-book-fill navbar-icon"}
                                         urlTo="/index/show" text="Composizioni"></Buttons>
                                <Buttons className="nav-link border-bottom-2 text-center p-0 m-0" classIcon={"bi bi-pencil-square navbar-icon"} urlTo="/index/edit" text="Modifica"></Buttons>
                                <Dropdown href="#" id="navbarDropdown" text="Lista" classLink={"nav-link border-bottom-2 text-center p-0 m-0"} classIcon={"bi bi-three-dots navbar-icon"}
                                          buttonList={[
                                                      {className:'nav-link text-center', urlTo:'/index/page-one#', text:'Pagina 1'},
                                                      {className:'nav-link text-center', urlTo:'/index/page-two#', text:'Pagina 2'},
                                                      {className:'nav-link text-center', urlTo:'/index/page-three#', text:'Pagina 3'}]
                                                  }>
                                </Dropdown>
                            </ul>
                            <ul className="navbar-nav d-flex float-end">
                                   <li className="nav-item float-end">
                                       <a className="btn btn-outline-warning" href="/index/logout" type="submit">Logout</a>
                                   </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );

    }

}

export default Navbar;