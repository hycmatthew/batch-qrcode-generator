import React from "react";
import { TopNav } from './TopNav.js';
import { Footer } from "./Footer.js";

export function Contact() {

    return (
        <>
            <div className="root-content">
                <TopNav />
                <div className="contact-block">
                    <div className="contact-top-wrapper">
                        <div className="contact-top-block">
                            <h3>Feel free to contact us if you have any questions</h3>
                            <p>email: <a href="mailto:smallflamestudio@gmail.com">smallflamestudio@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="contact-bottom-wrapper">
                        <div className="question-block">
                            <h3>Reporting a bug or technical issue</h3>
                            <p>If you notice an issue on this Website, please contact <a href="mailto:smallflamestudio@gmail.com">smallflamestudio@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}