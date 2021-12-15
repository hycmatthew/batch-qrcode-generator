import React, { useEffect, useContext }  from "react";
import { CodeContext } from "./CodeContext.js";
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);
    const [codeLink, setCodeLink] = React.useState('http://facebook.github.io/react/');
    const [imageSrc, setImageSrc] = React.useState('');

    let codeList = [];
    const [inputImageSize, setInputImageSize] = React.useState({width: 100, height: 100});
    const [codeData, setCodeData] = React.useState([]);

    var QRCode = require('qrcode.react');
    const qrRef = React.useRef();

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
        if(state.inputText.length > 0){
            if(setLinkListAndFilenameLogic(state.inputText)){
                setCodeLink(codeList[0].link);
            }
        }
    }, [state.isBatch, state.inputText]);

    const linkValidationFunction = (link) => {
        if(link.includes(".") && link.slice(link.length - 1)!=='.'){
            return true;
        }
        return false;
    }

    const filenameValidationFunction = (name) => {
        let regex = /^[^<>:;,?\"*|/"]+$/;
        if(name.match(regex) && name.length < 220){
            return true;
        }
        return false;
    }

    const setLinkListAndFilenameLogic = (str) => {
        let isValid = true;
        let setlinkArr = str.split(",");
        let tempLinkList = [];
        let tempNameList = [];
        let isLink = true;

        if(state.isBatch === true){
            for(const item of setlinkArr){
                let replacedStr = item.replace(/(\r\n|\n|\r)/gm,"");
                if(isLink){
                    isValid = linkValidationFunction(replacedStr);
                    if(isValid){
                        tempLinkList.push(replacedStr);
                    }else{
                        break;
                    }
                }else{
                    isValid = filenameValidationFunction(replacedStr);
                    if(isValid){
                        tempNameList.push(replacedStr);
                    }else{
                        break;
                    }
                }
                isLink = !isLink;
            }

            if(tempLinkList.length !== tempNameList.length){
                isValid = false
            }
        }else{
            for(const item of setlinkArr){
                let replacedStr = item.replace(/(\r\n|\n|\r)/gm,"");
                if(isLink){
                    tempLinkList.push(replacedStr);
                }else{
                    tempNameList.push("qr-code");
                }
                isLink = !isLink;
            }
        }
        let tempCodeList = [];
        if(isValid){
            for(let item in tempLinkList){
                tempCodeList.push({link: tempLinkList[item], filename: tempNameList[item]});
            }
        }
        codeList = tempCodeList;
        setCodeData(codeList);
        console.log(codeList);
        return isValid
    }

    const codeLogic = () => {
        if(state.containImage && state.imageFile !== ''){
            let imageRatio = inputImageSize.width/inputImageSize.height;
            let setImageWidth = state.codeSize*state.imageSize/250;
            let setImageHeight = setImageWidth/imageRatio;

            if(imageRatio<1){
                setImageHeight = state.codeSize*state.imageSize/250;
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
        if(codeData.length > 0){
            return(
                <Link to="/download" state={{ codeState: state , codeData: codeData, imageSrc: imageSrc}}>
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