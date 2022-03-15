import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Box from "@mui/material/Box";

import { CodeContext } from "../../CodeContext.js";
import "./CodeSize.scss";

const CodeSize = (eventTimer) => {

	const { t, i18n } = useTranslation();
	const { state, dispatch } = useContext(CodeContext);

    const updateCodeSize = (e) => {
        let sizeNum = parseInt(e.target.value);
        dispatch({ type: "updateCodeSize", codeSize: sizeNum });
    };

	const updateMarginWidth = (e) => {
        let widthNum = parseInt(e.target.value);
        dispatch({ type: "updateMarginWidth", marginWidth: widthNum });
    };

	return (
		<div className="code-size-wrapper">
			<Box sx={{ width: 250 }}>
				<div className="code-size-block">
					<Typography id="code-size-slider" gutterBottom>
						{t("main-size-label-code")}
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
				</div>
				<div className="code-size-block">
					<Typography id="code-size-slider" gutterBottom>
						{t("main-size-label-margin")}
					</Typography>
					<Grid container spacing={2} alignItems="center">
						<Grid item xs>
							<Slider
								min={0}
								step={5}
								max={200}
								value={state.marginWidth}
								aria-labelledby="code-size-slider"
								onChange={updateMarginWidth}
							/>
						</Grid>
						<Grid item>
							<MuiInput
								value={state.marginWidth}
								size="small"
								onChange={updateMarginWidth}
								inputProps={{
									step: 1,
									min: 0,
									max: 200,
									type: "number",
									"aria-labelledby": "code-size-slider",
								}}
							/>
						</Grid>
					</Grid>
				</div>
			</Box>
		</div>
	);
};

export default CodeSize;
