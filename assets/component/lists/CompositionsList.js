import React from "react";

class CompositionsList extends React.Component {

    constructor(props) {
        super(props);
    }

    getList(filter){
        return fetch('/api/compositions', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: filter
        })
            .then(response => response.json())
            .then(data => data.items)
            .catch(error => console.error(error));

    }

    componentDidMount() {
        this.getList(null)
    }


    render() {



        return(

            <div className={'container'}>
                <div className={'col'}>


                    si si dentro

                </div>

            </div>
        )
    }


}




export default CompositionsList;