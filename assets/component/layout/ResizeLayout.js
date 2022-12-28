import React from 'react';


const $ = require('jquery');


class ResizeLayout extends React.Component{

    constructor(props) {
        super(props)
        this.handleClickCollaps = this.handleClickCollaps.bind(this)
        this.state = {
            style: {startColumn:{ widthBox: 400, collapse: false},
                    endColumn:{ widthBox: window.innerWidth-400, collapse: false},
                    iconClassCollapse: 'bi bi-arrow-bar-left me-1 mt-1'}
        }

    }

    handleClickCollaps(){
        const collapsBool = this.state.style.startColumn.collapse === false
        let startColumWidth = collapsBool === true ? 20 : 400
        let endColumnWidth = window.innerWidth-startColumWidth
        this.setState({ style: {
            startColumn: { widthBox: startColumWidth , collapse: collapsBool},
            endColumn:{ widthBox: endColumnWidth },
            iconClassCollapse: collapsBool === true ? 'bi bi-arrow-bar-right me-1 mt-1' : 'bi bi-arrow-bar-left me-1 mt-1'
         }}, this.collapsBox )
    }

    collapsBox(){
        const width = this.state.style.startColumn.widthBox
        $('#start-column-body').toggle()
        $('#map-box').width(this.state.style.endColumn.widthBox) //i can't pass width in MainMapAddress component
    }


    render() {
        const startColumn = (Array.isArray(this.props.children) ? this.props.children[0] : this.props.children) || null;
        const endColumn = (Array.isArray(this.props.children) ? this.props.children[1] : this.props.children) || null;
        let { iconClassCollapse } = this.state.style



        //alert(this.state.style.startColumn.widthBox+'---'+this.state.style.endColumn.widthBox)


        return (
            <div className="d-flex p-0 m-0" style={{height:"100%"}}>
                    <div className="border-end border-1" style={{width: this.state.style.startColumn.widthBox}}>
                        <div className="text-end" style={{backgroundColor: "rgba(128, 128, 128, 0.18)"}}>
                            <i className={ iconClassCollapse } width="16" height="16" onClick={this.handleClickCollaps}></i>
                        </div>

                        <div className="p-0" id="start-column-body">
                            { startColumn  }
                        </div>
                    </div>
                    <div className="h-100 container-fluid p-0 m-0" id="map-container" style={{width: this.state.style.endColumn.widthBox}}>
                            { endColumn }
                    </div>


            </div>
        );
    }
}



export {ResizeLayout}