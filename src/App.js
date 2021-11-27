import React from "react";
import './App.scss';
import { MainSelectPage } from './MainSelectPage.js'; 
import { Provider } from './ImageContext.js'; 
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