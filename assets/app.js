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
import './styles/forms.css'


import $ from "jquery"


// start the Stimulus application
import 'bootstrap/dist/css/bootstrap.min.css'
import Popper from 'popper.js/dist/popper'
//import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShowCompositions from "./pages/ShowCompositions"
import ShowContainers from "./pages/ShowContainers"
import ShowCreator from "./pages/ShowCreator"
import Main from "./Main"
import PageOne from "./pages/DropDownPages/PageOne"
import PageTwo from "./pages/DropDownPages/PageTwo"
import PageThree from "./pages/DropDownPages/PageThree"


require ('/assets/Main')

ReactDOM.createRoot(document.getElementById("app")).render(
        <BrowserRouter>
            <Routes>
                <Route path="/index" element={<Main />}>
                    <Route index element={<ShowCompositions />} />
                    <Route path="/index/show_comp" element={<ShowCompositions />} />
                    <Route path="/index/show_cont" element={<ShowContainers />} />
                    <Route path="/index/show_crea" element={<ShowCreator />} />

                </Route>
            </Routes>
        </BrowserRouter>
);
/*
*
*
* */