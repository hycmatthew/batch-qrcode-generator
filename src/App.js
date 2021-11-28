import React from "react";
import './App.scss';
import { MainPage } from './MainPage.js'; 
import { Provider } from './CodeContext.js'; 
import {BrowserRouter, Routes, Route} from "react-router-dom";


export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/preview" element={<Provider />} />
                <Route exact path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};