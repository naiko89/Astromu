import React from 'react';
import {useLocation, Link, useNavigate} from "react-router-dom";

function Buttons(props){

    const location = useLocation();
    const isActive = location.pathname === props.urlTo;
    return(
        <li className="nav-item p-0 m-0">
            <Link className={'nav-link border-bottom-2 btn btn-sm navbar-icon p-0 m-0'} to={props.urlTo} onClick={() => props.navbarHandle(isActive)}>
                <ul className="list-group p-0 m-0 row">
                    <li className='list-group-item'>
                            <div className="p-0 m-0 pt-1 border-bottom-0 text-center col-12 ">
                                <i className={props.classIcon}  style={{textAlign: "center", color:"gray"}}></i>
                            </div>
                            <div className="pb-0 mt-0 pt-0 text-center col-12 text-nav-item-collapse" style={{color: "gray"}}>{props.text}</div>
                    </li>
                </ul>
            </Link>
        </li>
    );
}

function ExitButton(props){
    return(
        <li className="nav-item p-0 m-0 d-flex flex-row-reverse">
            <a className={'nav-link border-bottom-2 btn btn-sm navbar-icon p-0 m-0 my-exit-button h-100'} href={props.urlTo}>
                <ul className="list-group p-0 m-0 row">
                    <li className='list-group-item'>
                        <div className="p-0 m-0 pt-1 border-bottom-0 text-center col-12 ">
                            <i className={props.classIcon}  style={{textAlign: "center"}}></i>
                        </div>
                        <div className="pb-0 mt-0 pt-0 text-center col-12 text-nav-item-collapse text-warning">{props.text}</div>
                    </li>
                </ul>
            </a>
        </li>
    )
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

export {Buttons, Dropdown, ExitButton};