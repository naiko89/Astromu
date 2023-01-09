import React from "react";

function fetchPage(page) {

    alert(JSON.stringify({title: 'Nuovo titolo', author: 'John Doe'}))


    return fetch('/api/compositions', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: 'Nuovo titolo', author: 'John Doe'})
        })
        .then(response => response.json())
        .then(data => data.items)
        .catch(error => console.error(error));
}

class CompositionsList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetchPage(2)
    }


    render() {



        return(

            <div className={'container'}>
                <div className={'col'}>



                </div>

            </div>
        )
    }


}




export default CompositionsList;