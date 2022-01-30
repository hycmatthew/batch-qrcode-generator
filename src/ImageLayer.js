import React, { useEffect, useContext, useRef }  from "react";
import { CodeContext } from "./CodeContext.js";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import QRCodeStyling from "qr-code-styling";

/**
 * {
  "width": 300,
  "height": 300,
  "data": "https://qr-code-styling.com",
  "margin": 0,
  "qrOptions": {
    "typeNumber": "0",
    "mode": "Byte",
    "errorCorrectionLevel": "Q"
  },
  "imageOptions": {
    "hideBackgroundDots": true,
    "imageSize": 0.5,
    "margin": 10
  },
  "dotsOptions": {
    "type": "square",
    "color": "#6a1a4c",
    "gradient": {
      "type": "radial",
      "rotation": 0.5410520681182421,
      "colorStops": [
        { "offset": 0, "color": "#6a1a4c" },
        { "offset": 1, "color": "#ff0000" }
      ]
    }
  },
  "backgroundOptions": { "color": "#ffffff" },
  "image": "10cc19bd484118dbcd0a7886a38ceddc.png",
  "dotsOptionsHelper": {
    "colorType": { "single": true, "gradient": false },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#6a1a4c",
      "color2": "#6a1a4c",
      "rotation": "0"
    }
  },
  "cornersSquareOptions": { "type": "square", "color": "#000000" },
  "cornersSquareOptionsHelper": {
    "colorType": { "single": true, "gradient": false },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "cornersDotOptions": { "type": "", "color": "#000000" },
  "cornersDotOptionsHelper": {
    "colorType": { "single": true, "gradient": false },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "backgroundOptionsHelper": {
    "colorType": { "single": true, "gradient": false },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#ffffff",
      "color2": "#ffffff",
      "rotation": "0"
    }
  }
}

 */

const qrCode = new QRCodeStyling({
    data: "https://batchqrcode.com/",
    width: 1000,
    height: 1000,
    type: "canvas",
    image: "",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#e9ebee",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    },
    qrOptions: {
        errorCorrectionLevel: 'Q'
    }
});


export function ImageLayer() {
    const { state, dispatch } = useContext(CodeContext);

    const [imageSrc, setImageSrc] = React.useState('');
    const [inputImageSize, setInputImageSize] = React.useState({width: 100, height: 100});

    const ref = useRef(null);

    const codeStaticSize = 1000;

    useEffect(() => {
        qrCode.append(ref.current);
    }, []);
    
    useEffect(() => {
        let tempLink = state.codeData.length > 0?state.codeData[0].link:"https://batchqrcode.com/";
        qrCode.update({
            data: tempLink,
            margin: 20,
            dotsOptions: {
                color: state.codeColor,
                type: "rounded"
            },
            backgroundOptions: {
                color: state.backgroundColor,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            }
        });
    }, [state.codeColor, state.backgroundColor, state.codeData]);

    useEffect(() => {
        if(state.containImage && state.imageFile !== ''){
            let imgSize = state.imageSize/200;

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
                qrCode.update({
                    image: screenImage.src,
                    imageOptions: {
                        imageSize: imgSize
                    }
                });
            }
        }else{
            qrCode.update({
                image: "",
            });
        }
        
    }, [state.containImage, state.imageFile, state.imageSize]);

    /*
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
        if(state.codeData.length > 0){
            setCodeLink(state.codeData[0].link);
        }
    }, [state.isBatch, state.codeData]);
    */
   
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
                <div ref={ref} />
            </div>
            { dlButtonLogic() }
        </div>
    );
}