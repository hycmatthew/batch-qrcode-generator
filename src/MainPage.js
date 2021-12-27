import React, { useEffect } from "react";
import { SideMenu } from './SideMenu.js';
import { TopNav } from './TopNav.js';
import { ImageLayer } from "./ImageLayer.js";
import { HowToUse } from "./HowToUse.js";
import { Footer } from "./Footer.js";

export function MainPage() {
    document.title = "Batch QR Code";

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    });

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
                </div>
            </div>
            <Footer/>
        </>
    );
}