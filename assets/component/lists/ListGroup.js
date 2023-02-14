import React from "react";
import FormResearch from "../forms/FormResearch";
import ItemGroup from "../items/ItemGroup";
import FormGroupFastAdd from "../forms/fastAdd/FormGroupFastAdd";


class ListCreator extends React.Component {

    constructor(props) {
        super(props);
        this.props = props
        this.state={ searchValue: '', list:[], formGroup:false }
        this.onChange = this.onChange.bind(this)
        this.toggleModalGroup = this.toggleModalGroup.bind(this)
        this.getList = this.getList.bind(this)
        this.handleChildRender = this.handleChildRender.bind(this)
        this.showEditGroup = this.showEditGroup.bind(this)
    }

    getList(value){
        fetch(`/api/group?text=${value}`, { //`/api/compositions?text=${value}
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

    toggleModalGroup(val){
        this.setState({formGroup:val})
    }

    onChange(event){

        let value = event.target.value ? event.target.value : ''
        this.setState({searchValue:event.target.value})
        this.getList(value)
    }
    showEditGroup(id){
        alert('mostrami pagina editor'+id)
        //this.props.showEditComp(id)
    }

    render() {

        let value = this.state.searchValue
        let listItems = this.state.list.map(
            (item, index) => <ItemGroup key={index} value={item} childRend={this.handleChildRender}
                                              showEditCrea={this.showEditGroup}>
            </ItemGroup>)
        let displayCreator = this.state.formGroup

        return(
            <>
            <nav className="navbar navbar-light bg-light justify-content-between border-bottom">
                <a className="navbar-brand"></a>
                <div className={'form-inline my-2 my-lg-0 me-2 d-flex'}>
                    <button id='toggle-modal-composition' onClick={()=>this.toggleModalGroup(true)} className="btn btn-outline-success btn-sm me-1" style={{fontSize: '14px'}}>+</button>
                    <FormResearch onChangeSup={this.onChange} value={value}></FormResearch>
                </div>
            </nav>
            <div className={'container'}>
                <ul className={'list-unstyled d-flex flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-2'}>

                    {listItems}

                </ul>
            </div>

                <FormGroupFastAdd displayHandle={this.toggleModalGroup} display={displayCreator} childRend={this.handleChildRender}></FormGroupFastAdd>

            </>
        )
    }


}

export default ListCreator;


//<FormCreatorFastAdd displayHandle={this.toggleModalCreator} display={displayCreator} childRend={this.handleChildRender}></FormCreatorFastAdd>
//<FormResearch onChangeSup={this.onChange} value={value}></FormResearch>
//{listItems}