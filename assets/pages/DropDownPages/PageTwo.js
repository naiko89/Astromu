import React from 'react';
import {SimpleLayout} from "../../component/layout/SimpleLayout";


const MainColumn = () => {

    return(
        <div className='col-12'>Proviene dalla pagina due apro un layout semplice</div>
    )
}



const PageTwo = () => {
    return (
        <div className="container-fluid m-0 p-0" style={{height: '94vh'}}>
            <SimpleLayout>
                <MainColumn></MainColumn>
            </SimpleLayout>
        </div>
    );
};

export default PageTwo;