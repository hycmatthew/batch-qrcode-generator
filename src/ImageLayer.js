import React, { useEffect, useContext }  from "react";
import { CodeContext } from "./CodeContext.js";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);
    const [codeLink, setCodeLink] = React.useState('http://facebook.github.io/react/');
    const [imageSrc, setImageSrc] = React.useState('');

    const [inputImageSize, setInputImageSize] = React.useState({width: 100, height: 100});

    var QRCode = require('qrcode.react');

    useEffect(() => {
        if(state.containImage && state.imageFile !== ''){
            let screenImage = new Image();
            const reader = new FileReader();
            reader.onload=()=>{
                screenImage.src = reader.result;
            }
            reader.readAsDataURL(state.imageFile);
            screenImage.onload = function() {
                let setSize = {width: screenImage.naturalWidth, height: screenImage.height};
                setInputImageSize(setSize)
                setImageSrc(screenImage.src);
            }
        }
        
    }, [state.containImage, state.imageFile]);

    useEffect(() => {
        console.log(state.codeData.length);
        if(state.codeData.length > 0){
            setCodeLink(state.codeData[0].link);
        }
    }, [state.isBatch, state.codeData]);

    const codeLogic = () => {
        if(state.containImage && state.imageFile !== ''){
            let imageRatio = inputImageSize.width/inputImageSize.height;
            let setImageWidth = state.codeSize*state.imageSize/280;
            let setImageHeight = setImageWidth/imageRatio;

            if(imageRatio<1){
                setImageHeight = state.codeSize*state.imageSize/280;
                setImageWidth = setImageHeight/imageRatio;
            }

            return(
                <QRCode id="canvas-code" level="H" size={state.codeSize} value={codeLink} bgColor={state.backgroundColor} fgColor={state.codeColor} 
                    imageSettings={{src: imageSrc, width:setImageWidth, height:setImageHeight}}/>
            )
        }else{
            return(
                <QRCode id="canvas-code" level="H" size={state.codeSize} value={codeLink} bgColor={state.backgroundColor} fgColor={state.codeColor} />
            )
        }
    }

    const dlButtonLogic = () =>{
        if(state.codeData.length > 0){
            return(
                <Link to="/download" state={{ codeState: state, imageSrc: imageSrc, inputImageSize: inputImageSize}}>
                    <Button variant="contained" disableElevation>Download</Button>
                </Link>
            )
        }else{
            return(
                <Button variant="contained" disableElevation disabled>Download</Button>
            )
        }
    }

    return (
        <div className="image-layer">
            <div className="preview-block">
                { codeLogic() }
            </div>
            { dlButtonLogic() }
        </div>
    );
}