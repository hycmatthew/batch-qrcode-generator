import React from "react";
import { SideMenu } from './SideMenu.js';
import { Context } from './CodeContext.js'; 

export function MainPage() {
    return (
        <div className="web-page">
            <div className="preview-left-block">
                <SideMenu />
            </div>
            <div className="preview-right-block">
                <div className="preview-block">
                    <canvas id="canvas-bg" styles="z-index: 1;"><img id="canvas-img-bg" /></canvas>
                </div>
            </div>
        </div>
    );
}