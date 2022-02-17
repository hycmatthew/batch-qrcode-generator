import React, { useState, useContext } from "react";
import Radio from "@mui/material/Radio";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CodeContext } from "../../CodeContext.js";
import DescImage from "../../../image/get-started-v2.jpg";

import "./RadioBlock.scss"

const RadioBlock = ({props}) => {
	const { state, dispatch } = useContext(CodeContext);
	const [selectedValue, setSelectedValue] = React.useState("a");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		dispatch({ type: "updateCodeType", isBatch: type });
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
						checked={selectedValue === "a"}
						onChange={() => {}}
						value="a"
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
