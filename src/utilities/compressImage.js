import React, { useEffect, useContext, useRef } from "react";
import Compressor from 'compressorjs';

const compressImageFunction = (tempImage) => {
    
    new Compressor(tempImage, {
        quality: 0.7,
        maxWidth: 800,
        minHeight: 800,

        success(result) {
            let screenImage = new Image();
            const reader = new FileReader();
            reader.onload = () => {
                screenImage.src = reader.result;
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(result);
            screenImage.onload = function () {
                let setSize = {
                    width: screenImage.naturalWidth,
                    height: screenImage.height,
                };
                qrCode.update({
                    image: screenImage.src,
                    imageOptions: {
                        imageSize: imgSize,
                    },
                });
            };
        },
        error(err) {
            console.log(err.message);
        },
    });
}