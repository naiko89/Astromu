import React from 'react';
const $ = require('jquery');


class FirstViewer extends React.Component{

    constructor(props) {
        super(props);
    }


    handleChange(event){
        //console.log(event.target.value)
        // this.setState({valueInputOne: event.target.value})
    }

    render(){




        return(
            <>
                <div>
                    sei dentro al terzo
                </div>
            </>
    )}
}

export default FirstViewer