import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import qrCodeIcon from "../../image/qr-code-scan.png"
import { Link } from "react-router-dom";

import "./TopNav.scss"

export function TopNav() {
    const { t, i18n } = useTranslation();

    const changeLangLogic = (lang) => (e) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('currentLang', lang)
    }

    return (
        <div className="top-nav-wrapper">
            <div className="top-nav">
                <Grid container justifyContent="space-around">
                    <Grid item md={9} xs={10}>
                        <Stack spacing={2} direction="row">
                            <img alt="Batch QR Code Icon" src={qrCodeIcon}/>
                            <Button variant="text" component={Link} to="/">{t("top-menu-code")}</Button>
                            <Button variant="text" component={Link} to="/contact">{t("top-menu-contact")}</Button>
                        </Stack>
                    </Grid>
                    <Grid item md={3} xs={2}>
                        <Stack className="lang-nav" spacing={0} direction={{ md:'row', xs:'column'}}>
                            <Button variant="text" onClick={ changeLangLogic('en') }>ENG</Button>
                            <Button variant="text" onClick={ changeLangLogic('sc') }>简</Button>
                            <Button variant="text" onClick={ changeLangLogic('tc') }>繁</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}