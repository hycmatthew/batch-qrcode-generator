import React, { useContext, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/styles";

import { CodeContext } from "../../CodeContext.js";

const CodeImage = (eventTimer) => {
	const { state, dispatch } = useContext(CodeContext);

	const Input = styled(MuiInput)`
		width: 42px;
	`;

	const uploadImage = (e) => {
		if (ValidateFileUpload(e)) {
			dispatch({
				type: "updateInputImage",
				imageFile: e.target.files[0],
				containImage: showImageSetting,
			});
		}
	};

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
		clearTimeout(eventTimer);
		setTypingTimer(
			setTimeout(() => {
				dispatch({ type: "updateImageSize", imageSize: sizeNum });
			}, 200)
		);
	};

	return (
		<>
			<label htmlFor="contained-button-file">
				<Input
					accept="image/*"
					id="contained-button-file"
					style={{ display: "none" }}
					type="file"
					onChange={(e) => uploadImage(e)}
				/>
				<Button variant="contained" component="span">
					Upload
				</Button>
			</label>
			<Box sx={{ width: 250 }}>
				<Typography id="image-size-slider" gutterBottom>
					Logo Size
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
						<Input
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
		</>
	);
};

export default CodeImage;
