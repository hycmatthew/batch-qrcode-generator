import React, { useEffect, useContext }  from "react";
import { CodeContext } from "./CodeContext.js";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);
    const [codeLink, setCodeLink] = React.useState('https://www.w3schools.com/jsref/jsref_push.asp');
    const [imageSrc, setImageSrc] = React.useState('');

    var QRCode = require('qrcode.react');
    const qrRef = React.useRef();

    var codeList = [];

    useEffect(() => {
        if(state.containImage){
            let screenImage = new Image();
            const reader = new FileReader();
            reader.onload=()=>{
                screenImage.src = reader.result;
            }
            reader.readAsDataURL(state.imageFile);
            screenImage.onload = function() {
                setImageSrc(screenImage.src);
                console.log(imageSrc);
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


    const downloadLogic = () =>{
        let canvas = document.getElementById("canvas-code");
        let imageDL = canvas.toDataURL("image/png").split(',')[1];
        var zip = new JSZip();

        zip.file("smile.png", imageDL, {base64: true});

        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "example.zip");
        });
    }

    const linkValidationFunction = (link) => {
        if(link.includes(".") && link.slice(link.length - 1)!=='.'){
            return true;
        }
        return false;
    }

    const filenameValidationFunction = (name) => {
        let regex = /^[<>:;,?\"*|/"]+$/;
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
                if(isLink){
                    isValid = linkValidationFunction(item);
                    if(isValid){
                        tempLinkList.push(item);
                    }else{
                        break;
                    }
                }else{
                    isValid = filenameValidationFunction(item);
                    if(isValid){
                        tempNameList.push(item);
                    }else{
                        break;
                    }
                }
            }
            if(tempLinkList.length !== tempNameList.length){
                isValid = false
            }
        }else{
            for(const item of setlinkArr){
                if(isLink){
                    tempLinkList.push(item);
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
            codeList = tempCodeList;
        }
        return isValid
    }

    const codeLogic = () => {
        if(imageSrc !== ''){
            return(
                <QRCode id="canvas-code" size="1000" value="http://facebook.github.io/react/" bgColor={state.backgroundColor} fgColor={state.codeColor} 
                    imageSettings={{src: imageSrc, width:400, height:400}}/>
            )
        }else{
            return(
                <QRCode id="canvas-code" size="1000" value="http://facebook.github.io/react/" bgColor={state.backgroundColor} fgColor={state.codeColor} />
            )
        }
    }

    return (
        <div className="image-layer">
            <div className="preview-block">
                {codeLogic()}
                <canvas id="canvas-bg" styles="z-index: 1;"><img id="canvas-img-bg" /></canvas>
            </div>
            <a onClick={downloadLogic}>123123</a>
        </div>
    );
}