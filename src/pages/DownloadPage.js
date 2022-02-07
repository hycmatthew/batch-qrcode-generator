import React, {useRef, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';

import { TopNav } from '../TopNav.js';
import { useLocation } from "react-router";
import QRCodeStyling from "qr-code-styling";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { Footer } from "../Footer.js";

export function DownloadPage() {
    document.title = "Batch QR Code";

    const location = useLocation();
    const {codeState, imageFile} = location.state;

    const [loading, setLoading] = React.useState(true);
    const codeRef = useRef([]);
    let setIntervalId = null;

    const downloadLogic = () => {
        setLoading(true);
        let zip = new JSZip();
        let canvasList = document.getElementsByClassName("canvas-block");

        setTimeout(() => {
            for(const item of canvasList){
                let canvasObj = item.getElementsByTagName("canvas")[0];
                let imageDL = canvasObj.toDataURL("image/png").split(',')[1];
                zip.file(item.id+".png", imageDL, {base64: true});
            }
    
            zip.generateAsync({type:"blob"}).then(function(content) {
                setLoading(false);
                saveAs(content, "batchqrcode.zip");
            });
        }, 300);
    }

    const checkImageReadyFunction = () => {
        let canvasList = document.getElementsByTagName("canvas");
        if(canvasList.length === codeState.codeData.length){
            setLoading(false);
            clearInterval(setIntervalId);
        }
    }

    useEffect(() => {
        setIntervalId = setInterval(checkImageReadyFunction, 500);

        if (codeState.containImage && codeState.imageFile !== "") {
			let imgSize = codeState.imageSize/200;

            for(const item in codeRef.current){
                const qrCode = new QRCodeStyling({
                    data: codeState.codeData[item].link,
                    width: codeState.codeSize,
                    height: codeState.codeSize,
                    margin: 20,
                    type: "canvas",
                    image: imageFile,
                    dotsOptions: {
                        type: codeState.dotType,
                        color: codeState.codeColor,
                    },
                    backgroundOptions: {
                        color: codeState.backgroundColor,
                    },
                    imageOptions: {
                        imageSize: imgSize,
                        hideBackgroundDots: false,
                        crossOrigin: "anonymous",
                        margin: 0,
                    },
                    cornersSquareOptions: { 
                        type: codeState.cornerType, 
                        color: codeState.cornerColor,
                    },
                    cornersDotOptions: { 
                        type: codeState.cornerDotType, 
                        color: codeState.cornerDotColor,
                    },
                    qrOptions: {
                        errorCorrectionLevel: "H",
                    },
                });
                qrCode.append(codeRef.current[item]);
            }
		} else {
            for(const item in codeRef.current){
                const qrCode = new QRCodeStyling({
                    data: codeState.codeData[item].link,
                    width: codeState.codeSize,
                    height: codeState.codeSize,
                    margin: 20,
                    type: "canvas",
                    dotsOptions: {
                        type: codeState.dotType,
                        color: codeState.codeColor,
                    },
                    backgroundOptions: {
                        color: codeState.backgroundColor,
                    },
                    cornersSquareOptions: { 
                        type: codeState.cornerType, 
                        color: codeState.cornerColor,
                    },
                    cornersDotOptions: { 
                        type: codeState.cornerDotType, 
                        color: codeState.cornerDotColor,
                    },
                    qrOptions: {
                        errorCorrectionLevel: "M",
                    },
                });
                qrCode.append(codeRef.current[item]);
            }
		}
    }, []);
    
    return (
        <>
            <div className="root-content">
                <TopNav/>
                <div className="download-main">
                    <div className="download-page">
                        <div className="download-block">
                            <LoadingButton onClick={ downloadLogic } loading={loading} loadingPosition="start" startIcon={<DownloadIcon />} variant="contained">Download</LoadingButton>
                        </div>
                        <div className="code-preview-list">
                            <div className="code-preview-desc">
                                <p>Total {codeState.codeData.length} QR Codes.</p>
                            </div>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        {codeState.codeData.map((item, index) => (
                                            <TableRow key={item.filename} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell className="code-image-cell" align="right">
                                                    <div className="canvas-block" id={item.filename} ref={elem => {
                                                        codeRef.current[index] = elem;
                                                    }}/>
                                                </TableCell>
                                                <TableCell align="right">{item.link}</TableCell>
                                                <TableCell align="right">{item.filename+".png"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>);
}