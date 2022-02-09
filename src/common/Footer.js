import React  from "react";
import "./Footer.scss"

export function Footer(){
    return(
        <div className="footer-block">
            <p>Copyright © {new Date().getFullYear()} Batch QR Code </p>
        </div>
    );
}