import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { TopNav } from '../common/TopNav.js';
import { Footer } from "../common/Footer.js";

import IconButton from '@mui/material/IconButton';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookIcon from '@mui/icons-material/Facebook';

import "./Contact.scss"

export function Contact() {
    // Init Page
    const { t, i18n } = useTranslation();
    document.title = t("contact-title");

    return (
        <>
            <div className="root-content">
                <TopNav />
                <div className="contact-block">
                    <div className="contact-top-wrapper">
                        <div className="contact-top-block">
                            <h3>{t("contact-top-desc")}</h3>
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
                            <h3>{t("contact-report-desc")}</h3>
                            <p>{t("contact-report-notice-desc")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}