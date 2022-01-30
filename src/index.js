import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Provider } from './CodeContext.js'; 
import {HashRouter , Routes, Route} from "react-router-dom";
import { DownloadPage } from "./DownloadPage.js";
import { Contact } from "./Contact.js";

import ReactGA from 'react-ga';

const appElement = document.getElementById("root");

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Provider />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </HashRouter>, appElement);