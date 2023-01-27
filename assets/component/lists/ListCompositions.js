import React from "react";
import FormResearch from "../forms/FormResearch";
import ItemComposition from "../items/ItemComposition";
import FormComposition from "../forms/FormComposition";


class ListCompositions extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state={ searchValue: '', list:[], formComposition:false }
        this.onChange = this.onChange.bind(this)
        this.toggleModalComposition = this.toggleModalComposition.bind(this)
        this.getList = this.getList.bind(this)
        this.handleChildRender = this.handleChildRender.bind(this)
        this.showEditComposition = this.showEditComposition.bind(this)
    }

    getList(value){
        fetch(`/api/compositions?text=${value}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())  //--> why the response.json does not give me a JSON object but a string? for that do the parsing later....review this part
            .then(data => {
                console.log(data)
                this.setState({list:JSON.parse(data)})
            })
            .catch(error => console.error(error));
    }

    handleChildRender(){
        this.getList(this.state.searchValue)
    }

    componentDidMount() {
        this.getList('')
    }

    toggleModalComposition(val){
        this.setState({formComposition:val})
    }

    onChange(event){
        let value = event.target.value ? event.target.value : ''
        this.setState({searchValue:event.target.value})
        this.getList(value)
    }
    showEditComposition(id){
        this.props.showEditComp(id)
    }

    render() {

        let value = this.state.searchValue
        let listItems = this.state.list.map(
            (item, index) => <ItemComposition key={index} value={item} childRend={this.handleChildRender}
                                              showEditComp={this.showEditComposition}>
            </ItemComposition>)
        let displayComposition = this.state.formComposition

        return(
            <>
            <nav className="navbar navbar-light bg-light justify-content-between border-bottom">
                <a className="navbar-brand"></a>
                <div className={'form-inline my-2 my-lg-0 me-2 d-flex'}>
                    <button id='toggle-modal-composition' onClick={()=>this.toggleModalComposition(true)} className="btn btn-outline-success btn-sm me-1" style={{fontSize: '14px'}}>+</button>
                    <FormResearch onChangeSup={this.onChange} value={value}></FormResearch>
                </div>

            </nav>
            <div className={'container'}>

                <ul className={'list-unstyled d-flex flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-2'}>
                    {listItems}
                </ul>
            </div>
                <FormComposition displayHandle={this.toggleModalComposition} display={displayComposition} childRend={this.handleChildRender}></FormComposition>
            </>
        )
    }


}

export default ListCompositions;