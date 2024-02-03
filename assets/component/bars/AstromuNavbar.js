import React, {useContext} from 'react';
import {Buttons, Dropdown, ExitButton} from "./NavFragment";
import ContextGlobally from "../../context/ContextGlobally";


class AstromuNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    static contextType = ContextGlobally;

    toggleNavbar = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    closeNavbar = (isActive) => {
        isActive && navigate(0)
        this.setState({
            isOpen: false
        });
    }

    render() {
        let navbarClass = 'navbar-collapse collapse';
        if (this.state.isOpen) {
            navbarClass += ' show';
        }

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light border border-bottom-1 p-0 m-0 my-navbar">
                <div className="container-fluid p-0 m-0">
                    <img src={window.location.origin + this.context.changes.photo.navbar} alt="" height={'70'} width={'70'} />
                    <div className="navbar-brand p-0 ms-1">
                        <span className="text-secondary my-brand">Astro<span className="text-dark">Mu</span></span>
                    </div>

                        <div className="navbar-nav w-100 p-0 m-0">

                            <div className={'row w-100 p-0 m-0'}>
                                <div className="col-10 p-0 m-0 d-flex">
                                    <Buttons classIcon="bi bi-person-fill icon-nav-item-collapse" urlTo="/index/show_crea" text={this.context.changes.creator.plural} navbarHandle={this.closeNavbar} />
                                    <Buttons classIcon="bi bi-people-fill icon-nav-item-collapse" urlTo="/index/show_group" text={this.context.changes.group.plural}  navbarHandle={this.closeNavbar} />
                                    <Buttons classIcon="bi bi-archive icon-nav-item-collapse" urlTo="/index/show_cont" text={this.context.changes.container.plural} navbarHandle={this.closeNavbar} />
                                    <Buttons classIcon="bi bi-book-fill icon-nav-item-collapse" urlTo="/index/show_comp" text={this.context.changes.composition.plural} navbarHandle={this.closeNavbar} />
                                </div>

                                <div className='col-2 p-0 m-0 pe-1'>
                                    <ExitButton classIcon="bi bi-eject-fill text-warning" urlTo="/index/logout" text="Logout"/>
                                </div>
                            </div>

                        </div>

                </div>
            </nav>
        );
    }
}

export default AstromuNavbar;