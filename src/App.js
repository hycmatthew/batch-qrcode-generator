import React from "react";
import './App.scss';
import { Provider } from './CodeContext.js'; 
import {BrowserRouter, Routes, Route} from "react-router-dom";


export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Provider />} />
            </Routes>
        </BrowserRouter>
    );
};