import React, { useContext, useRef } from "react";
import TextField from "@mui/material/TextField";

import { CodeContext } from "../../CodeContext.js";

const CodeColor = (eventTimer) => {
	const { state, dispatch } = useContext(CodeContext);

	const updateCodeColor = (e) => {
		const color = e.target.value.toUpperCase();
		clearTimeout(eventTimer.current);

		eventTimer.current = setTimeout(() => {
			console.log(color);
			setCodeColorLogic(color, 1);
		}, 50);
	};

	const updateBackgroundColor = (e) => {
		const color = e.target.value.toUpperCase();
		clearTimeout(eventTimer.current);

		eventTimer.current = setTimeout(() => {
			console.log(color);
			setCodeColorLogic(color, 2);
		}, 50);
	};

	const setCodeColorLogic = (color, typeNum) => {
		switch (typeNum) {
			case 1:
				dispatch({ type: "updateCodeColor", codeColor: color });
				if (syncCornerColor) {
					dispatch({ type: "updateCornerColor", cornerColor: color });
				}
				if (syncCornerDotColor) {
					dispatch({
						type: "updateCornerDotColor",
						cornerDotColor: color,
					});
				}
				break;
			case 2:
				dispatch({
					type: "updateBackgroundColor",
					backgroundColor: color,
				});
				break;
			case 3:
				dispatch({ type: "updateCornerColor", cornerColor: color });
				break;
			case 4:
				dispatch({
					type: "updateCornerDotColor",
					cornerDotColor: color,
				});
				break;
			default:
				break;
		}
	};

	return (
		<>
			<div>
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.codeColor}
						onChange={updateCodeColor}
					/>
				</div>
				<TextField
					label="Code Color"
					size="small"
					value={state.codeColor}
					inputProps={{ maxLength: 7 }}
					onChange={updateCodeColor}
				/>
			</div>
			<div>
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.backgroundColor}
						onChange={updateBackgroundColor}
					/>
				</div>
				<TextField
					label="Background Color"
					size="small"
					value={state.backgroundColor}
					inputProps={{ maxLength: 7 }}
					onChange={updateBackgroundColor}
				/>
			</div>
		</>
	);
};

export default CodeColor;
