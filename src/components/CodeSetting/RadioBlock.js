import React, { useState, useContext, useEffect } from "react";
import Radio from "@mui/material/Radio";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CodeContext } from "../../CodeContext.js";

import "./RadioBlock.scss"

const RadioBlock = ({props}) => {
	const { state, dispatch } = useContext(CodeContext);

	const updateCodeDotType = "updateCodeDotType";
	const updateCornerType = "updateCornerType";
	const updateCornerDotType = "updateCornerDotType";

	const handleChange = (event) => {
		console.log(event.target.value)
		console.log(props.actionType)
		switch(props.actionType) {
			case updateCodeDotType:
				dispatch({ type: props.actionType, dotType: event.target.value });
				break;
			case updateCornerType:
				dispatch({ type: props.actionType, cornerType: event.target.value });
				break;
			case updateCornerDotType:
				dispatch({ type: props.actionType, cornerDotType: event.target.value });
			break;
		}
	};

	console.log(props);

	return (
		<ImageListItem className="radio-block-item" key={props.item.key}>
			<img
				src={props.item.img}
				srcSet={props.item.img}
				alt={props.item.title}
				loading="lazy"
			/>
			<ImageListItemBar
				title={props.item.title}
				subtitle={
					<Radio
						checked={props.isCheck}
						onChange={handleChange}
						value={props.item.title}
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
					/>
				}
				position="below"
			/>
		</ImageListItem>
	);
};

export default RadioBlock;
