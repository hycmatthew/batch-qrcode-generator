import React, { useEffect } from "react";
import { TopNav } from '../common/TopNav.js';
import { Footer } from "../common/Footer.js";

import IconButton from '@mui/material/IconButton';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookIcon from '@mui/icons-material/Facebook';

import "./Contact.scss"

export function Contact() {
    // Init Page
    document.title = "Contact Us | Batch QR Code";

    return (
        <>
            <div className="root-content">
                <TopNav />
                <div className="contact-block">
                    <div className="contact-top-wrapper">
                        <div className="contact-top-block">
                            <h3>Feel free to contact us if you have any questions</h3>
                            <a href="mailto:smallflamestudio@gmail.com"><IconButton variant="outlined" aria-label="add to shopping cart">
                                <EmailRoundedIcon fontSize="large" />
                            </IconButton></a>
                            <a href="https://www.facebook.com/Small-Flame-Studio-266778240706507/?ref=pages_you_manage" target="_blank"><IconButton variant="outlined" aria-label="add to shopping cart">
                                <FacebookIcon fontSize="large" />
                            </IconButton></a>
                        </div>
                    </div>
                    <div className="contact-bottom-wrapper">
                        <div className="question-block">
                            <h3>Reporting a bug or technical issue</h3>
                            <p>If you notice an issue on this Website, please contact <a href="mailto:smallflamestudio@gmail.com">us</a>.</p>
                        </div>
                    </div>
                    {/*
                    <ins className='adsbygoogle'
                        style={{ display: 'block' }}
                        data-ad-client='ca-pub-4050046188209105'
                        data-ad-slot='4050046188209105'
                        data-ad-format='auto' />*/}
                </div>
            </div>
            <Footer/>
        </>
    );
}