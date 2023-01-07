import React from 'react';
import { ResizeLayout } from "../component/layout/ResizeLayout";
import ColumnCard from "../component/card/ColumnCard";
import FormSecondTemp from "../forms/FormSecondTemp";
import FormThirdTemp from "../forms/FormThirdTemp";
import FirstViewer from "../box/show/FirstViewer";
import SecondViewer from "../box/show/SecondViewer";
import ThirdViewer from "../box/show/ThirdViewer";

import update from 'immutability-helper';

class Show extends  React.Component {
    constructor(props) {
        super(props);
        const user = props.nomeUser
        this.state = {
            header: { links: [{ name:'#home', ID:0 }, { name:'#profile', ID:1 }, { name:'#messages', ID:2 }] },
            layout: { component:'FirstViewer' },
            composition: [],
            handleValues:{trigger:false, textarea:'',id:'', select:false}
        }

        //this.onChangeSup = this.onChangeSup.bind(this)
        this.handlerHeaderClick = this.handlerHeaderClick.bind(this)
    }

    /////////////////////////////////
    handlerHeaderClick = (event) => {
        switch (event.target.href){
            case this.state.header.links[0].name :{
                this.setState({structure:{component: 'FirstViewer'}})
            }
            case this.state.header.links[1].name :{
                this.setState({structure:{component: 'SecondViewer'}})
            }
            case this.state.header.links[2].name :{
                this.setState({structure:{component: 'ThirdViewer'}})
            }
        }
    }

    render() {
        let BoxedColumnDx, boxedColumnSx, peces, BoxedColumnListText, BoxedColumMenu

         // console.log('**** Show ****')
         // console.log(this.state.handleValues)
         // console.log('****')

        const linksCardsHeader = this.state.header.links.map((link) =>
            <li className="nav-item" style={{fontSize: 15}} key={link.ID}>
                <a href={link.name} className="nav-link card-anchor" data-bs-toggle="tab" onClick={this.handlerHeaderClick}> {link.name.replace('#','')} </a>
            </li>
        );

        //this.props.onClickHandlers[link.ID]

        switch (this.state.layout.component) {
            case 'FirstViewer':
                peces = this.state.composition
                BoxedColumMenu = ColumnCard
                break;
            case 'StructureFirstLevel':
                boxedColumnSx = FormSecondTemp
                break;
            case 'StructureSecondLevel':
                boxedColumnSx = FormThirdTemp
                break;
        }


        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                    <ul className="nav" id="myTab">
                        {linksCardsHeader}
                    </ul>
                        <BoxedColumMenu cardTitle='Titolo Show Column'> </BoxedColumMenu>
            </div>
        );
    }
}

export default Show;