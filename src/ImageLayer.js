import React, { useEffect, useContext }  from "react";
import { SideMenu } from "./SideMenu.js";
import { Context } from "./CodeContext.js";

export function ImageLayer() {

    return (
        <div className="web-page">
            <TopMenu />
            <div className="preview-left-block">
                <SideMenu />
            </div>
            <div className="preview-right-block">
                <div className="preview-block">
                    <canvas id="canvas-bg" styles="z-index: 1;"><img id="canvas-img-bg" /></canvas>
                    <canvas id="canvas-device" styles="z-index: 2;"><img id="canvas-img-device" /></canvas>
                    <canvas id="canvas-text" styles="z-index: 3;"><img id="canvas-img-text" /></canvas>
                </div>
            </div>
        </div>
    );
}