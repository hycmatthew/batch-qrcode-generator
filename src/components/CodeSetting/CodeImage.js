import React, { useContext, useRef } from "react";
import { useTranslation } from 'react-i18next';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { CodeContext } from "../../CodeContext.js";
import "./CodeImage.scss";

const CodeImage = (eventTimer) => {
	const { t, i18n } = useTranslation();
	const { state, dispatch } = useContext(CodeContext);

	const uploadImage = (e) => {
		if (ValidateFileUpload(e)) {
			dispatch({
				type: "updateInputImage",
				imageFile: e.target.files[0],
				containImage: true,
			});
		}
	};

	const deleteImage = () => {
		console.log("deleteImage start!")
		dispatch({
			type: "updateContainImage",
			containImage: false,
		});
	}

	const ValidateFileUpload = (e) => {
		const imageFile = e.target.files[0];

		if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
			alert("Please select valid image.");
			return false;
		}
		return true;
	};

	const updateImageSize = (e) => {
		let sizeNum = parseInt(e.target.value);

		clearTimeout(eventTimer.current);
		eventTimer.current = setTimeout(() => {
			dispatch({ type: "updateImageSize", imageSize: sizeNum });
		}, 25);
	};

	const allowDeleteButton = () => {
		if (state.containImage) {
			return (
				<div className="code-image-delete-block">
					<Button className="code-image-delete-btn" variant="outlined" color="error" onClick={deleteImage}>
						{t("main-image-label-delete")}
					</Button>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<div className="code-image-wrapper">
			<div>
				<div className="code-image-upload-block">
					<Button className="code-image-upload-btn" variant="contained" component="label">
						<MuiInput
							accept="image/*"
							id="contained-button-file"
							style={{ display: "none" }}
							type="file"
							onChange={uploadImage}
						/>
						{t("main-image-label-upload")}
					</Button>
				</div>
				{allowDeleteButton()}
			</div>
			<Box className="code-image-slider" sx={{ width: 250 }}>
				<Typography id="image-size-slider" gutterBottom>
					{t("main-image-label-logo")}
				</Typography>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs>
						<Slider
							min={20}
							step={1}
							max={100}
							value={
								typeof state.imageSize === "number"
									? state.imageSize
									: 0
							}
							aria-labelledby="image-size-slider"
							onChange={updateImageSize}
						/>
					</Grid>
					<Grid item>
						<MuiInput
							value={state.imageSize}
							size="small"
							onChange={updateImageSize}
							inputProps={{
								step: 1,
								min: 20,
								max: 100,
								type: "number",
								"aria-labelledby": "image-size-slider",
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default CodeImage;
