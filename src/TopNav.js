import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function TopNav() {

    return (
        <div className="top-nav">
            <Stack spacing={2} direction="row">
                <Button variant="text">Generate QR Code</Button>
                <Button variant="text">About This App</Button>
            </Stack>
        </div>
    );
}