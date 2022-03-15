import React, { useContext, useRef } from "react";
import { useTranslation } from 'react-i18next';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { CodeContext } from "../../CodeContext.js";

import "./CodeColor.scss";

const CodeColor = (eventTimer) => {
	const { t, i18n } = useTranslation();
	const { state, dispatch } = useContext(CodeContext);

	const updateCodeColor = (e) => {
		const color = e.target.value.toUpperCase();

		clearTimeout(eventTimer.current);
		eventTimer.current = setTimeout(() => {
			setCodeColorLogic(color, 1);
		}, 50);
	};

	const updateBackgroundColor = (e) => {
		const color = e.target.value.toUpperCase();

		clearTimeout(eventTimer.current);
		eventTimer.current = setTimeout(() => {
			setCodeColorLogic(color, 2);
		}, 50);
	};

	const updateCornerColor = (e) => {
		const color = e.target.value.toUpperCase();

		clearTimeout(eventTimer.current);
		eventTimer.current = setTimeout(() => {
			setCodeColorLogic(color, 3);
		}, 50);
	};

	const updateCornerDotColor = (e) => {
		const color = e.target.value.toUpperCase();

		clearTimeout(eventTimer.current);
		eventTimer.current = setTimeout(() => {
			setCodeColorLogic(color, 4);
		}, 50);
	};

	const udpateSyncCornerColor = (e) => {
		dispatch({ type: "udpateSyncCornerColor", syncCornerColor: e.target.checked });
		let setColor = state.codeColor;
		if (!e.target.checked) {
			setColor = state.cornerColor;
		}
		setCodeColorLogic(setColor, 3);
	};

	const udpateSyncCornerDotColor = (e) => {
		dispatch({ type: "udpateSyncCornerDotColor", syncCornerDotColor: e.target.checked });
		let setColor = state.codeColor;
		if (!e.target.checked) {
			setColor = state.cornerDotColor;
		}
		setCodeColorLogic(setColor, 4);
	};

	const setCodeColorLogic = (color, typeNum) => {
		//typeNum 1=code 2=bg 3=corner 4=cornerDot
		switch (typeNum) {
			case 1:
				dispatch({ type: "updateCodeColor", codeColor: color });
				if (state.syncCornerColor) {
					dispatch({ type: "updateCornerColor", cornerColor: color });
				}
				if (state.syncCornerDotColor) {
					dispatch({type: "updateCornerDotColor", cornerDotColor: color});
				}
				break;
			case 2:
				dispatch({type: "updateBackgroundColor", backgroundColor: color});
				break;
			case 3:
				dispatch({type: "updateCornerColor", cornerColor: color});
				break;
			case 4:
				dispatch({type: "updateCornerDotColor", cornerDotColor: color});
				break;
			default:
				break;
		}
	};

	return (
		<div className="code-color-wrapper">
			<div className="code-color-block">
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.codeColor}
						onChange={updateCodeColor}
					/>
				</div>
				<TextField
					label={t("main-color-label-code")}
					size="small"
					value={state.codeColor}
					inputProps={{ maxLength: 7 }}
					sx={{ width: 150 }}
					onChange={updateCodeColor}
				/>
			</div>
			<div className="code-color-block">
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.backgroundColor}
						onChange={updateBackgroundColor}
					/>
				</div>
				<TextField
					label={t("main-color-label-background")}
					size="small"
					value={state.backgroundColor}
					inputProps={{ maxLength: 7 }}
					sx={{ width: 150 }}
					onChange={updateBackgroundColor}
				/>
			</div>
			<div className="code-color-block">
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.cornerColor}
						onChange={updateCornerColor}
					/>
				</div>
				<TextField
					label={t("main-color-label-corner")}
					size="small"
					value={state.cornerColor}
					inputProps={{ maxLength: 7 }}
					sx={{ width: 150 }}
					onChange={updateCornerColor}
				/>
				<FormControlLabel
					className="code-color-sync-label"
					control={
						<Checkbox
						checked={state.syncCornerColor}
							onChange={udpateSyncCornerColor}
						/>
					}
					label={t("main-color-label-sync")}
				/>
			</div>
			<div className="code-color-block">
				<div className="background-color-block">
					<input
						id="color"
						type="color"
						value={state.cornerDotColor}
						onChange={updateCornerDotColor}
					/>
				</div>
				<TextField
					label={t("main-color-label-corner-dot")}
					size="small"
					value={state.cornerDotColor}
					inputProps={{ maxLength: 7 }}
					sx={{ width: 150 }}
					onChange={updateCornerDotColor}
				/>
				<FormControlLabel
					className="code-color-sync-label"
					control={
						<Checkbox
							checked={state.syncCornerDotColor}
							onChange={udpateSyncCornerDotColor}
						/>
					}
					label={t("main-color-label-sync")}
				/>
			</div>
		</div>
	);
};

export default CodeColor;
