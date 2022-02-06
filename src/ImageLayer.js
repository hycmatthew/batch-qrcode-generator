import React, { useEffect, useContext, useRef } from "react";
import Compressor from 'compressorjs';
import { CodeContext } from "./CodeContext.js";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
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
    margin: 20,
	type: "canvas",
	image: "",
	dotsOptions: {
        type: "square",
		color: "#4267b2",
	},
	backgroundOptions: {
		color: "#e9ebee",
	},
	imageOptions: {
        hideBackgroundDots: false,
		crossOrigin: "anonymous",
		margin: 0,
	},
	cornersSquareOptions: { 
        type: "square", 
        color: "#000000",
    },
	cornersDotOptions: { 
        type: "square", 
        color: "#000000",
    },
	qrOptions: {
		errorCorrectionLevel: "M",
	},
});

export function ImageLayer() {
	const { state, dispatch } = useContext(CodeContext);

	const [imageSrc, setImageSrc] = React.useState("");
	const [inputImageSize, setInputImageSize] = React.useState({
		width: 100,
		height: 100,
	});

	const ref = useRef(null);

	useEffect(() => {
		qrCode.append(ref.current);
	}, []);

	useEffect(() => {
		let tempLink =
			state.codeData.length > 0
				? state.codeData[0].link
				: "https://batchqrcode.com/";
		qrCode.update({
			data: tempLink,
			margin: 20,
			dotsOptions: {
                type: state.dotType,
				color: state.codeColor,
			},
            cornersSquareOptions: { 
                type: state.cornerType, 
                color: state.cornerColor,
            },
            cornersDotOptions: { 
                type: state.cornerDotType, 
                color: state.cornerDotColor,
            },
			backgroundOptions: {
				color: state.backgroundColor,
			},
		});
	}, [state.codeColor, state.backgroundColor, state.cornerColor, state.cornerDotColor, state.codeData, state.dotType, state.cornerType, state.cornerDotType]);

	useEffect(() => {
		if (state.containImage && state.imageFile !== "") {
			compressImageFunction(state.imageFile);
		} else {
			qrCode.update({
				image: "",
				qrOptions: {
					errorCorrectionLevel: "M",
				},
			});
		}
	}, [state.containImage, state.imageFile, state.imageSize]);
 

	const compressImageFunction = (tempImage) => {
		let imgSize = state.imageSize / 200;

		new Compressor(tempImage, {
			quality: 0.7,
			maxWidth: 700,
			minHeight: 700,

			success(result) {
				let screenImage = new Image();
				const reader = new FileReader();
				reader.onload = () => {
					screenImage.src = reader.result;
					setImageSrc(reader.result);
				};
				reader.readAsDataURL(result);
				screenImage.onload = function () {
					console.log(screenImage.src);
					let setSize = {
						width: screenImage.naturalWidth,
						height: screenImage.height,
					};
					setInputImageSize(setSize);
					qrCode.update({
						image: screenImage.src,
						imageOptions: {
							imageSize: imgSize,
						},
						qrOptions: {
							errorCorrectionLevel: "H",
						},
					});
				};
			},
			error(err) {
				console.log(err.message);
			},
		});
	}

	const dlButtonLogic = () => {
		if (state.codeData.length > 0) {
			return (
				<Link
					to="/download"
					state={{
						codeState: state,
						imageFile: imageSrc
					}}
				>
					<Button variant="contained" disableElevation>
						Download
					</Button>
				</Link>
			);
		} else {
			return (
				<Button variant="contained" disableElevation disabled>
					Download
				</Button>
			);
		}
	};

	return (
		<div className="image-layer">
			<div className="preview-block">
				<div ref={ref} />
			</div>
			{dlButtonLogic()}
		</div>
	);
}
