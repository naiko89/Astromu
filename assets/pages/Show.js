import React from 'react';
import { ResizeLayout } from "../component/layout/ResizeLayout";
import ColumnCard from "../component/card/ColumnCard";
import FormFirstInsert from "../forms/FormFirstInsert";
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
            structure: { component:'FirstViewer' },
            composition: [],
            handleValues:{trigger:false, textarea:'',id:'', select:'null'}
        }
        this.handleCompositionFormAdd = this.handleCompositionFormAdd.bind(this)
        this.handleCompositionFormRedit = this.handleCompositionFormRedit.bind(this)

        this.handleCompositionRedit = this.handleCompositionRedit.bind(this)
        this.handleCompositionRemove = this.handleCompositionRemove.bind(this)
        this.onChangeSup = this.onChangeSup.bind(this)


        this.handlerFirstClick = this.handlerFirstClick.bind(this)
        this.handlerSecondClick = this.handlerSecondClick.bind(this)
        this.handlerThirdClick = this.handlerThirdClick.bind(this)
    }

    handleCompositionFormAdd(obj) {
        alert('aggiungi'+JSON.stringify(obj))
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
        alert('modifica nel form Redit')
    }

    handleCompositionRedit(id, type, text) {
        alert('dentro Composition Redit'+'---->'+id+'---->'+type+'---->'+text)
        this.setState({handleValues:{trigger:true, textarea:text, id:id, select:type}})
    }

    onChangeSup(fild,value){
        let handleValues = this.state.handleValues
        handleValues[fild] = value
        this.setState({handleValues: handleValues})
    }




    /////////////////////////////////
    handlerFirstClick = (event) => {
        this.setState({structure:{component: 'FirstViewer'}})
    }

    handlerSecondClick = (event) => {
        this.setState({structure:{component:'StructureFirstLevel'}})
    }

    handlerThirdClick = (event) => {
        this.setState({structure:{component:'StructureSecondLevel'}})
    }

    render() {
        let BoxedColumnDx, boxedColumnSx, peces

         console.log('**** Show ****')
         console.log(this.state.handleValues)
         console.log('****')


        switch (this.state.structure.component) {
            case 'FirstViewer':
                boxedColumnSx = FormFirstInsert
                peces = this.state.composition
                BoxedColumnDx = FirstViewer
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
                <ResizeLayout enable ={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>

                    <ColumnCard cardTitle='Titolo Show Column'
                                cardLinks={this.state.header.links}
                                onChangeSup={this.onChangeSup}
                                onClickHandlers={[this.handlerFirstClick, this.handlerSecondClick,this.handlerThirdClick]}
                                handleCompositionFormAdd={this.handleCompositionFormAdd}
                                handleCompositionFormRedit={this.handleCompositionFormRedit}
                                handle={this.state.handleValues}>
                    </ColumnCard>

                    <BoxedColumnDx peces={peces}
                                   handleCompositionRemove={this.handleCompositionRemove}
                                   handleCompositionRedit={this.handleCompositionRedit}>
                    </BoxedColumnDx>

                </ResizeLayout>
            </div>
        );
    }
}

export default Show;
