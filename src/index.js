import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Provider } from './CodeContext.js'; 
import {HashRouter , Routes, Route} from "react-router-dom";
import { DownloadPage } from "./DownloadPage.js";

const appElement = document.getElementById("root");

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Provider />} />
            <Route path="/download" element={<DownloadPage />} />
        </Routes>
    </HashRouter>, appElement);