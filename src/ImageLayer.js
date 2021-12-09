import React, { useEffect, useContext }  from "react";
import { CodeContext } from "./CodeContext.js";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";

export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);
    const [codeLink, setCodeLink] = React.useState('http://facebook.github.io/react/');
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
        var zip = new JSZip();
        let canvas = document.getElementById("canvas-code");
        for(const item of codeList){
            let createCode = <QRCode id="canvas-code" size={1000} value={codeLink} bgColor={state.backgroundColor} fgColor={state.codeColor} />
            let imageDL = canvas.toDataURL("image/png").split(',')[1];
            zip.file(item.name+".png", imageDL, {base64: true});
        }
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
        let regex = /^[^<>:;,?\"*|/"]+$/;
        if(name.match(regex) && name.length < 220){
            return true;
        }
        return false;
    }

    const setLinkListAndFilenameLogic = (str) => {
        console.log("setLinkListAndFilenameLogic start");
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
                isLink = !isLink;
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
        }
        codeList = tempCodeList;
        console.log(codeList);
        return isValid
    }

    const codeLogic = () => {
        if(imageSrc !== ''){
            return(
                <QRCode id="canvas-code" size={1000} value={codeLink} bgColor={state.backgroundColor} fgColor={state.codeColor} 
                    imageSettings={{src: imageSrc, width:400, height:400}}/>
            )
        }else{
            return(
                <QRCode id="canvas-code" size={1000} value={codeLink} bgColor={state.backgroundColor} fgColor={state.codeColor} />
            )
        }
    }

    return (
        <div className="image-layer">
            <div className="preview-block">
                {codeLogic()}
            </div>
            <Link to={
                {   pathname: "/download",
                    state: { test123123: true }
                }
            }>123123</Link>
        </div>
    );
}