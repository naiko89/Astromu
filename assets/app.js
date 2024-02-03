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
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShowCompositions from "./pages/ShowCompositions"
import ShowContainers from "./pages/ShowContainers"
import ShowCreator from "./pages/ShowCreator"
import Main from "./Main"
import ShowGroup from "./pages/ShowGroup";

import ContextGlobally from "./context/ContextGlobally";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import { it } from "date-fns/locale";



require ('/assets/Main')

registerLocale("it", it);
setDefaultLocale("it");



global = {
    changes : {
        photo: {login:'', navbar:'/Images/logo.png' },
        creator: { name:'Artista', plural: 'Artisti' },
        group: { name:'Gruppo', plural: 'Gruppi' },
        container: { name:'Album', plural: 'Album' },
        composition: { name:'Canzone', plural:'Canzoni', pieces:{R: 'Ritornello', S:'Strofa', RR:'Ripetizione Ritornello'}}
    },
}
global = {
    changes:  {
        photo: {login: '', navbar: '/Images/icon_recicle.png'},
        creator: {name: 'Amministratore', plural: 'Amministratori'},
        group: {name: 'Gruppo', plural: 'Gruppi'},
        container: {name: 'Contenitore', plural: 'Contenitori'},
        composition: {name: 'Creazione', plural: 'Creazioni', pieces:{R: 'R', S:'S', RR:'R R'}}
    },
}





ReactDOM.createRoot(document.getElementById("app")).render(
    <ContextGlobally.Provider value={global}>
        <BrowserRouter>
            <Routes>
                <Route path="/index" element={<Main />}>
                    <Route index element={<ShowCreator />} />
                    <Route path="/index/show_comp" element={<ShowCompositions />} />
                    <Route path="/index/show_cont" element={<ShowContainers />} />
                    <Route path="/index/show_crea" element={<ShowCreator />} />
                    <Route path="/index/show_group" element={<ShowGroup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ContextGlobally.Provider>
);
/*
* Modified the database structure, made relations for the tables.
*
* */