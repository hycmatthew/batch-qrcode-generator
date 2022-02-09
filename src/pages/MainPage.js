import React, { useEffect } from "react";
import { SideMenu } from '../components/SideMenu.js';
import { TopNav } from '../common/TopNav.js';
import { ImageLayer } from "../components/ImageLayer.js";
import { HowToUse } from "../components/HowToUse.js";
import { Footer } from "../common/Footer.js";
import { AppDisplay } from "../components/AppDisplay.js";

import "./MainPage.scss"

export function MainPage() {
    document.title = "Batch QR Code";
    
    return (
        <>
            <div className="root-content">
                <TopNav/>
                <div className="main-page">
                    <div className="preview-wrapper">
                        <div className="preview-main">
                            <div className="preview-left-block">
                                <SideMenu />
                            </div>
                            <div className="preview-right-block">
                                <ImageLayer />
                            </div>
                        </div>
                    </div>
                    <HowToUse />
                    <AppDisplay />
                </div>
            </div>
            <Footer/>
        </>
    );
}