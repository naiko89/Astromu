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
            handleValues:{trigger:false, textarea:'',id:'', select:'null'}
        }
        this.handleCompositionFormAdd = this.handleCompositionFormAdd.bind(this)
        this.handleCompositionFormRedit = this.handleCompositionFormRedit.bind(this)

        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
        //this.onChangeSup = this.onChangeSup.bind(this)


        this.handlerHeaderClick = this.handlerHeaderClick.bind(this)
    }

    handleCompositionFormAdd(obj) {
        this.setState({ composition: [...this.state.composition, obj] })
        this.setState({handleValues:{trigger:false, textarea:'',id:'', select:'null'}})
    }

    handleCompositionRemove(id) {
        this.setState((prevState) => ({
            composition: update(prevState.composition, {$splice: [[id, 1]]})
        }))
        this.setState({handleValues:{trigger:false, textarea:'',id:'', select:'null'}})
    }

    handleCompositionFormRedit(id) {
        // alert('modifica nel form Redit')
    }

    handleCompositionRedit(id, type, text) {
        // alert('dentro Composition Redit'+'---->'+id+'---->'+type+'---->'+text)
        this.setState({handleValues:{trigger:true, textarea:text, id:id, select:type}})
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
                BoxedColumnListText = FirstViewer
                BoxedColumMenu = ColumnCard
                break;
            case 'StructureFirstLevel':
                boxedColumnSx = FormSecondTemp
                BoxedColumnDx = SecondViewer
                break;
            case 'StructureSecondLevel':
                boxedColumnSx = FormThirdTemp
                BoxedColumnDx= ThirdViewer
                break;
        }


        return (
            <div className="container-fluid m-0 p-0" style={{height: '93vh'}}>
                    <ul className="nav" id="myTab">
                        {linksCardsHeader}
                    </ul>

                        <BoxedColumMenu cardTitle='Titolo Show Column'
                                        cardLinks={this.state.header.links}
                                        handleCompositionFormAdd={this.handleCompositionFormAdd}
                                        handleCompositionFormRedit={this.handleCompositionFormRedit}
                                        handleValues={this.state.handleValues}>
                        </BoxedColumMenu>

            </div>
        );
    }
}

export default Show;

/*<BoxedColumnListText peces={peces}
                              handleCompositionRemove={this.handleCompositionRemove}
                              handleCompositionRedit={this.handleCompositionRedit}>
                    </BoxedColumnListText>

 */