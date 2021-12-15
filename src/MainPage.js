import React, { useEffect } from "react";
import { SideMenu } from './SideMenu.js';
import { TopNav } from './TopNav.js';
import { ImageLayer } from "./ImageLayer.js";

export function MainPage() {
    document.title = "Batch QR Code";

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    });

    return (
        <div className="root-background">
            <TopNav/>
            <div className="main-page">
                <div className="preview-left-block">
                    <SideMenu />
                </div>
                <div className="preview-right-block">
                    <ImageLayer />
                </div>
            </div>
            <div>
                <ins className="adsbygoogle"
                    style={{display:'block'}}
                    data-ad-client="ca-pub-1234567890123456"
                    data-ad-slot="1234567890"
                    data-adtest="on"
                    data-ad-format="auto">
                </ins>
            </div>
        </div>
    );
}