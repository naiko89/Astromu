import React from 'react';
import {Link} from "react-router-dom";

function Buttons(props){

    return(
        <li className="nav-item">
            <Link className={props.className} to={props.urlTo}>
                <ul className="list-group p-0 m-0">
                    <div className='prova'>
                        <li className='list-group-item'>
                            <div className="d-flex justify-content-center p-0 m-0 pt-1 border-bottom-0 ">
                                <i className={props.classIcon}  style={{textAlign: "center"}}></i>
                            </div>
                            <div className="pb-0 mt-0 pt-0" style={{color: "grey"}}>{props.text}</div>
                        </li>
                    </div>
                </ul>
            </Link>
        </li>
    );
}

function Dropdown(props){

       const dropButtons = []
       props.buttonList.forEach((button, index) => {
           dropButtons.push(
               <li key={index} className="nav-item">
                  <Link className={button.className} to={button.urlTo}>
                     <span className='p-0 m-0'>{button.text}</span>
                  </Link>
               </li>
           )
       })

       return(
           <li className="nav-item dropdown text-center">
               <a className= {props.classLink}
                  id={props.id}
                  role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                   <ul className="list-group p-0 m-0">
                       <li className="list-group-item">
                           <div className="d-flex justify-content-center p-0 m-0 pt-1 border-bottom-0" style={{color: "grey"}}>
                               <i className={props.classIcon}  style={{textAlign: "center"}}></i>
                           </div>
                           <div className="pb-0 mt-0 pt-0" style={{color: "grey"}}>{props.text}</div>
                       </li>
                   </ul>
               </a>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                   { dropButtons }
               </ul>
           </li>
       );

}

export {Buttons, Dropdown};