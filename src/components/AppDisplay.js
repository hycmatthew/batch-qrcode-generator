import React from "react";
import DeviceImage from "../../image/device-screenshot-v1.png"
import AppStoreIcon from "../../image/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"

import "./AppDisplay.scss"

export function AppDisplay() {

    return (
        <div className="device-display-block">
            <div className="device-display-content">
                <div className="screenshot-block">
                    <div className="screenshot-img-block">
                        <img alt="Batch QR Code App Image" src={DeviceImage} />
                    </div>
                </div>
                <div className="device-content-block">
                    <div className="device-content-desc">
                        <h3>Batch QR Code iOS App</h3>
                        <p>Create Multiple QR Codes once</p>
                        <p>Available on the Apple App Store</p>
                        <a href="https://apps.apple.com/bw/app/batch-qr-code/id1586801816" target="_blank"><img alt="Download on the Apple App Store" src={AppStoreIcon} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}