import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import qrCodeIcon from "../image/qr-code-icon.png"
import { Link } from "react-router-dom";

export function TopNav() {

    return (
        <div className="top-nav-wrapper">
            <div className="top-nav">
                <Stack spacing={2} direction="row">
                    <img alt="Batch QR Code Icon" src={qrCodeIcon}/>
                        <Button variant="text" component={Link} to="/">Generate QR Code</Button>
                        <Button variant="text" component={Link} to="/contact">Contact</Button>
                </Stack>
            </div>
        </div>
    );
}