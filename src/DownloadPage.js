import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';

import { TopNav } from './TopNav.js';
import { useLocation } from "react-router";
import QRCode from "qrcode.react";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export function DownloadPage() {
    document.title = "Batch QR Code";

    const location = useLocation();
    const {codeState, imageSrc, inputImageSize} = location.state;

    const [loading, setLoading] = React.useState(false);
    /*
    useEffect(() => {
        if(loading === true){
            console.log("effect = "+new Date());
            (async() => {
                let test = await downloadLogic();
            })();
        }
    },[loading]);*/

    /*
    const updateLoading = () => {
        if(loading === false){
            setLoading(true);
        }
    }*/

    const convertCanvasToImage = async() => {
        let zip = new JSZip();
        let canvasList = document.getElementsByClassName("canvas-code");
        for(const item of canvasList){
            let imageDL = item.toDataURL("image/png").split(',')[1];
            zip.file(item.id+".png", imageDL, {base64: true});
            console.log(item.id);
        }
        return zip
    }

    const downloadLogic = async() => {
        setLoading(true);
        let zip = await convertCanvasToImage();

        zip.generateAsync({type:"blob"}).then(function(content) {
            setLoading(false);
            saveAs(content, "batchqrcode.zip");
        });
    }

    const codeLogic = (link, fileName) => {
        if(codeState.containImage && imageSrc !== ''){
            let imageRatio = inputImageSize.width/inputImageSize.height;
            let setImageWidth = codeState.codeSize*codeState.imageSize/250;
            let setImageHeight = setImageWidth/imageRatio;

            if(imageRatio<1){
                setImageHeight = codeState.codeSize*codeState.imageSize/250;
                setImageWidth = setImageHeight/imageRatio;
            }
            return(
                <QRCode className="canvas-code" id={fileName} level="H" size={codeState.codeSize} value={link} bgColor={codeState.backgroundColor} fgColor={codeState.codeColor} 
                    imageSettings={{src: imageSrc, width:setImageWidth, height:setImageHeight}}/>
            )
        }else{
            return(
                <QRCode className="canvas-code" id={fileName} level="H" size={codeState.codeSize} value={link} bgColor={codeState.backgroundColor} fgColor={codeState.codeColor} />
            )
        }
    }

    return (
    <div className="root-background">
        <TopNav/>
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
                            {codeState.codeData.map((item) => (
                                <TableRow key={item.filename} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell className="code-image-cell" align="right">{codeLogic(item.link, item.filename)}</TableCell>
                                    <TableCell align="right">{item.link}</TableCell>
                                    <TableCell align="right">{item.filename+".png"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    </div>);
}