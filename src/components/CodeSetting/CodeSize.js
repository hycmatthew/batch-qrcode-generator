import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Box from "@mui/material/Box";

import { CodeContext } from "../../CodeContext.js";

const CodeSize = (eventTimer) => {
	const { state, dispatch } = useContext(CodeContext);

    const updateCodeSize = (e) => {
        let sizeNum = parseInt(e.target.value);
        dispatch({ type: "updateCodeSize", codeSize: sizeNum });
      };

	return (
		<>
			<Box sx={{ width: 250 }}>
				<Typography id="code-size-slider" gutterBottom>
					QR Code Size (In Pixel)
				</Typography>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs>
						<Slider
							min={400}
							step={50}
							max={2000}
							value={state.codeSize}
							aria-labelledby="code-size-slider"
							onChange={updateCodeSize}
						/>
					</Grid>
					<Grid item>
						<MuiInput
							value={state.codeSize}
							size="small"
							onChange={updateCodeSize}
							inputProps={{
								step: 1,
								min: 400,
								max: 2000,
								type: "number",
								"aria-labelledby": "code-size-slider",
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default CodeSize;
