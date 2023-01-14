/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css'
import './styles/navbar.css'
import './styles/card.css'
import './styles/forms.css';


import $ from "jquery"


// start the Stimulus application
import 'bootstrap/dist/css/bootstrap.min.css'
import Popper from 'popper.js/dist/popper'
//import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Show from "./pages/Show"
import Edit from "./pages/Edit"
import Main from "./Main"
import PageOne from "./pages/DropDownPages/PageOne"
import PageTwo from "./pages/DropDownPages/PageTwo"
import PageThree from "./pages/DropDownPages/PageThree"

require ('/assets/Main')

ReactDOM.createRoot(document.getElementById("app")).render(
        <BrowserRouter>
            <Routes>
                <Route path="/index" element={<Main />}>
                    <Route index element={<Show />} />
                    <Route path="/index/show" element={<Show />} />
                    <Route path="/index/edit" element={<Edit />} />
                    <Route path="/index/page-one" element={<PageOne />} />
                    <Route path="/index/page-two" element={<PageTwo />} />
                    <Route path="/index/page-three" element={<PageThree />} />
                </Route>
            </Routes>
        </BrowserRouter>
);
