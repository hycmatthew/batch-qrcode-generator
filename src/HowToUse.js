import React from "react";
import DescImage from "../image/get-started-v2.jpg"

export function HowToUse() {

    return (
    <div className="get-started-block">
        <h2>Get Started</h2>
        <div className="get-started-desc">
            <div className="desc-block-1">
                <div className="get-started-text-block">
                    <h3>1. Select Mode</h3>
                    <p>Select single or batch mode to generate QR Code</p>
                </div>
                <div className="get-started-text-block">
                    <h3>2. Configure the QR Code </h3>
                    <p>Single Mode - Input single links</p>
                    <p>Batch Mode - Input the links and filenames</p>
                </div>
                <div className="get-started-text-block">
                    <h3>3. Download the QR Code</h3>
                    <p>Click the download button and move to download page</p>
                </div>
            </div>
            <div className="desc-block-2">
                <div className="desc-image-block">
                    <img src={DescImage} />
                </div>
            </div>
        </div>
    </div>
    );
}