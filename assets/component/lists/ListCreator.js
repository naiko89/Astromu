import React from "react";
import FormResearch from "../forms/FormResearch";
import ItemCreator from "../items/ItemCreator";
import FormCreatorFastAdd from "../forms/fastAdd/FormCreatorFastAdd";


class ListCreator extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state={ searchValue: '', list:[], formCreator:false }
        this.onChange = this.onChange.bind(this)
        this.toggleModalCreator = this.toggleModalCreator.bind(this)
        this.getList = this.getList.bind(this)
        this.handleChildRender = this.handleChildRender.bind(this)
        this.showEditCreator = this.showEditCreator.bind(this)
    }

    getList(value){
        fetch(`/api/creator?text=${value}`, { //`/api/compositions?text=${value}
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

    toggleModalCreator(val){
        this.setState({formCreator:val})
    }

    onChange(event){

        let value = event.target.value ? event.target.value : ''
        this.setState({searchValue:event.target.value})
        this.getList(value)
    }
    showEditCreator(id){
        this.props.showEditCrea(id)
    }

    render() {

        let value = this.state.searchValue
        let listItems = this.state.list.map(
            (item, index) => <ItemCreator key={index} value={item} childRend={this.handleChildRender}
                                              showEditCrea={this.showEditCreator}>
            </ItemCreator>)
        let displayCreator = this.state.formCreator

        return(
            <>
                <nav className="navbar navbar-light bg-light justify-content-between border-bottom">
                    <a className="navbar-brand"></a>
                    <div className={'form-inline my-2 my-lg-0 me-2 d-flex'}>
                        <button id='toggle-modal-composition' onClick={()=>this.toggleModalCreator(true)} className="btn btn-outline-success btn-sm me-1" style={{fontSize: '14px'}}>+</button>
                        <FormResearch onChangeSup={this.onChange} value={value}></FormResearch>
                    </div>
                </nav>
                <div className={'container'}>
                    <ul className={'list-unstyled d-flex flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-2'}>
                        {listItems}
                    </ul>
                </div>
                <FormCreatorFastAdd displayHandle={this.toggleModalCreator} display={displayCreator} childRend={this.handleChildRender}></FormCreatorFastAdd>
            </>
        )
    }


}

export default ListCreator;