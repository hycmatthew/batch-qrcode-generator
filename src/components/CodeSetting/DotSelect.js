import React, { useRef } from "react";
import RadioBlock from "./RadioBlock.js";

import ImageList from "@mui/material/ImageList";

import DotType1 from "../../../image/dot-type1.png";
import DotType2 from "../../../image/dot-type2.png";
import DotType3 from "../../../image/dot-type3.png";
import DotType4 from "../../../image/dot-type4.png";
import DotType5 from "../../../image/dot-type5.png";
import DotType6 from "../../../image/dot-type6.png";

import CornerType1 from "../../../image/corner-type1.png";
import CornerType2 from "../../../image/corner-type3.png";
import CornerType3 from "../../../image/corner-type4.png";

import CornerDotType1 from "../../../image/corner-dot-type1.png";
import CornerDotType2 from "../../../image/corner-dot-type3.png";

const dotData = [
	{
		key: 1,
		img: DotType1,
		title: "square",
	},
	{
		key: 2,
		img: DotType2,
		title: "dots",
	},
	{
		key: 3,
		img: DotType3,
		title: "rounded",
	},
	{
		key: 4,
		img: DotType4,
		title: "extra-rounded",
	},
	{
		key: 5,
		img: DotType5,
		title: "classy",
	},
	{
		key: 6,
		img: DotType6,
		title: "classy-rounded",
	},
];

const cornerData = [
	{
		key: 11,
		img: CornerType1,
		title: "square",
	},
	{
		key: 12,
		img: CornerType2,
		title: "extra-rounded",
	},
	{
		key: 13,
		img: CornerType3,
		title: "dot",
	},
];

const cornerDotData = [
	{
		key: 21,
		img: CornerDotType1,
		title: "square",
	},
	{
		key: 22,
		img: CornerDotType2,
		title: "dot",
	},
];

const updateCodeDotType = "updateCodeDotType";
const updateCornerType = "updateCornerType";
const updateCornerDotType = "updateCornerDotType";

const DotSelect = ({actionType, selectedType, desktopMode}) => {
	switch (actionType) {
		case updateCodeDotType:
			return (
				<ImageList sx={{ width: 520, height: 300 }} cols={desktopMode?4:2}>
					{dotData.map((item) => (
						<RadioBlock key={item.key} props={{ item, actionType: updateCodeDotType, isCheck: (item.title === selectedType)? true : false}} />
					))}
				</ImageList>
			);
		case updateCornerType:
			return (
				<ImageList sx={{ width: 520, height: 185 }} cols={desktopMode?4:2}>
					{cornerData.map((item) => (
						<RadioBlock key={item.key} props={{ item, actionType: updateCornerType, isCheck: (item.title === selectedType)? true : false}} />
					))}
				</ImageList>
			);
		case updateCornerDotType:
			return (
				<ImageList sx={{ width: 520, height: 185 }} cols={desktopMode?4:2}>
					{cornerDotData.map((item) => (
						<RadioBlock key={item.key} props={{ item, actionType: updateCornerDotType, isCheck: (item.title === selectedType)? true : false}} />
					))}
				</ImageList>
			);
	}
};

export default DotSelect;
