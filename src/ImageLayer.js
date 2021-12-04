import React, { useEffect, useContext }  from "react";
import { CodeContext } from "./CodeContext.js";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);
    const [imageSrc, setImageSrc] = React.useState('');

    var QRCode = require('qrcode.react');
    const qrRef = React.useRef();

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

    const downloadLogic = () =>{
        let canvas = document.getElementById("canvas-code");
        let imageDL = canvas.toDataURL("image/png").split(',')[1];
        var zip = new JSZip();

        zip.file("smile.png", imageDL, {base64: true});

        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "example.zip");
        });
    }

    const codeLogic = () => {
        if(imageSrc !== ''){
            return(
                <QRCode id="canvas-code" value="http://facebook.github.io/react/" size="700" bgColor={state.backgroundColor} fgColor={state.codeColor} 
                    imageSettings={{src: imageSrc, width:400, height:400}}/>
            )
        }else{
            return(
                <QRCode id="canvas-code" value="http://facebook.github.io/react/" size="700" bgColor={state.backgroundColor} fgColor={state.codeColor} />
            )
        }
    }

    return (
        <div className="web-page">
            <div className="preview-right-block">
                <div className="preview-block">
                    {codeLogic()}
                    <canvas id="canvas-bg" styles="z-index: 1;"><img id="canvas-img-bg" /></canvas>
                </div>
            </div>
            <a onClick={downloadLogic}>123123</a>
        </div>
    );
}