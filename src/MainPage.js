import React from "react";
import { SideMenu } from './SideMenu.js';
import { ImageLayer } from "./ImageLayer.js";

export function MainPage() {
    return (
        <div className="root-background">
            <div className="main-page">
                <div className="preview-left-block">
                    <SideMenu />
                </div>
                <div className="preview-right-block">
                    <ImageLayer />
                </div>
            </div>
        </div>
    );
}