import React, { useEffect } from "react";
import { CodeMenu } from '../components/CodeMenu.js';
import { TopNav } from '../common/TopNav.js';
import { ImageLayer } from "../components/ImageLayer.js";
import { HowToUse } from "../components/HowToUse.js";
import { Footer } from "../common/Footer.js";
import { AppDisplay } from "../components/AppDisplay.js";
import ReactGA from 'react-ga';

import "./MainPage.scss"

export function MainPage() {
    // Init Page
    document.title = "Batch QR Code";
    ReactGA.initialize("G-53MJ95EYEG");
	ReactGA.pageview('Main-Page');

    return (
        <>
            <div className="root-content">
                <TopNav/>
                <div className="main-page">
                    <div className="preview-wrapper">
                        <div className="preview-main">
                            <div className="preview-left-block">
                                <CodeMenu />
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