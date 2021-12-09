import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Provider } from './CodeContext.js'; 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { DownloadPage } from "./DownloadPage.js";

const appElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Provider />} />
            <Route path="/download" element={<DownloadPage />} />
        </Routes>
    </BrowserRouter>, appElement);