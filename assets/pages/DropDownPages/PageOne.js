import React from 'react';
import { render } from "react-dom";
import { ResizeLayout } from "../../component/layout/ResizeLayout";



const StartColumn = () => {

    return(
        <div>proviene da pagina 1 A</div>
    )
}


const EndColumn = () => {

    return(
        <div>proviene da pagina 1 B</div>
    )
}

const PageOne = () => {

    return (
        <div className="container-fluid m-0 p-0" style={{height: '94vh'}}>
            <ResizeLayout enable ={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                <StartColumn>

                </StartColumn>
                <EndColumn>

                </EndColumn>
            </ResizeLayout>
        </div>
    );
};

export default PageOne;