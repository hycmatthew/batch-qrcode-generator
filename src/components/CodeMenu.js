import React, { useContext, useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiInput from "@mui/material/Input";

import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { styled } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CodeContext } from "../CodeContext.js";
import CodeColor from "./CodeSetting/CodeColor.js"
import CodeSize from "./CodeSetting/CodeSize.js"
import CodeImage from "./CodeSetting/CodeImage.js"
import DotSelect from "./CodeSetting/DotSelect.js"

import './CodeMenu.scss'

export function CodeMenu() {
	const Input = styled(MuiInput)`
		width: 42px;
	`;

	const initCodeSetting = {
		isBatch: false,
		inputText: "",
		containImage: false,
		codeSize: 1000,
		imageSize: 100,
		codeColor: "#000000",
		cornerColor: "#000000",
		cornerDotColor: "#000000",
		backgroundColor: "#FFFFFF",
		dotType: "square",
		cornerType: "square",
		cornerDotType: "square",
	};

	const [typingTimer, setTypingTimer] = React.useState(null);
	const matches = useMediaQuery('(min-width: 900px)');

	const { state, dispatch } = useContext(CodeContext);

	const [codeSetting, setCodeSetting] = React.useState(initCodeSetting);
	const [errorType, setErrorType] = React.useState(0);

	const eventTimer = useRef();

	const theme = createTheme({
		typography: {
			fontSize: 12,
		},
	});

	const suffixDuplicates = (list) => {
		let countMap = new Map();

		for (const index in list) {
			let item = list[index];
			if (countMap.has(item)) {
				let value = countMap.get(item) + 1;
				countMap.set(item, value);
				list[index] = item + "-" + value;
			} else {
				countMap.set(item, 0);
			}
		}
		return list;
	};

	const linkValidationFunction = (link) => {
		if (link.includes(".") && link.slice(link.length - 1) !== ".") {
			return true;
		}
		return false;
	};

	const filenameValidationFunction = (name) => {
		let regex = /^[^<>:;,?\"*|/"]+$/;
		if (name.match(regex) && name.length < 220) {
			return true;
		}
		return false;
	};

	const setLinkListAndFilenameLogic = (str) => {
		let isValid = true;
		let setStr = str.trim().replace(/,*$/, "");
		let setlinkArr = setStr.split(",");
		let tempLinkList = [];
		let tempNameList = [];
		let isLink = true;

		if (state.isBatch === true) {
			for (const item of setlinkArr) {
				let replacedStr = item.replace(/(\r\n|\n|\r)/gm, "");
				if (isLink) {
					isValid = linkValidationFunction(replacedStr);
					if (isValid) {
						tempLinkList.push(replacedStr);
					} else {
						setErrorType(1);
						break;
					}
				} else {
					isValid = filenameValidationFunction(replacedStr);
					if (isValid) {
						tempNameList.push(replacedStr);
					} else {
						setErrorType(2);
						break;
					}
				}
				isLink = !isLink;
			}

			if (tempLinkList.length !== tempNameList.length) {
				isValid = false;
			}
		} else {
			for (const item of setlinkArr) {
				let replacedStr = item.replace(/(\r\n|\n|\r)/gm, "");
				const isValid = linkValidationFunction(replacedStr);
				if (isValid) {
					tempLinkList.push(replacedStr);
				} else {
					setErrorType(1);
				}
				break;
			}
		}
		let tempCodeList = [];

		if (tempLinkList.length > 200) {
			setErrorType(3);
			isValid = false;
		}

		if (isValid) {
			const resultNameList = suffixDuplicates(tempNameList);
			for (const item in tempLinkList) {
				let setName =
					item >= resultNameList.length
						? "image-" + item
						: resultNameList[item];
				tempCodeList.push({
					link: tempLinkList[item],
					filename: setName,
				});
			}
		}
		if (str === "") {
			setErrorType(0);
		}
		return tempCodeList;
	};

	const updateQRCodeType = (e, type) => {
		if (type !== null) {
			setCodeSetting((prevState) => ({ ...prevState, isBatch: type }));
			dispatch({ type: "updateCodeType", isBatch: type });
		}
	};

	const updateInputText = (e) => {
		let str = e.target.value;
		setCodeSetting((prevState) => ({ ...prevState, inputText: str }));

		clearTimeout(typingTimer);
		setTypingTimer(
			setTimeout(() => {
				const resultCodeData = setLinkListAndFilenameLogic(str);

				if (resultCodeData.length > 0) {
					setErrorType(0);
					dispatch({
						type: "updateCodeData",
						codeData: resultCodeData,
					});
				} else {
					dispatch({ type: "updateCodeData", codeData: [] });
				}
			}, 500)
		);
	};

	const helperTextLogic = () => {
		switch (errorType) {
			case 1:
				return "Incorrect link format.";
			case 2:
				return "Incorrect filename format.";
			case 3:
				return "More than 200 links.";
		}
	};

	const setInputTextField = () => {
		if (errorType === 0) {
			if (codeSetting.isBatch === true) {
				return (
					<TextField
						fullWidth
						id="outlined-basic"
						label="Links and output filenames"
						variant="outlined"
						value={codeSetting.inputText}
						onChange={updateInputText}
						multiline
						rows={10}
						placeholder="Seperate link and output image name by comma, example:
https//example.com, image1, https//example2.com, image2
Support up to 200 links"
						focused
					/>
				);
			} else {
				return (
					<TextField
						fullWidth
						id="outlined-basic"
						label="Link"
						variant="outlined"
						value={codeSetting.inputText}
						onChange={updateInputText}
						multiline
						rows={4}
					/>
				);
			}
		} else {
			if (codeSetting.isBatch === true) {
				return (
					<TextField
						fullWidth
						error
						helperText={helperTextLogic()}
						id="outlined-basic"
						label="Links and output filenames"
						variant="outlined"
						value={codeSetting.inputText}
						onChange={updateInputText}
						multiline
						rows={10}
						placeholder="Seperate link and output image name by comma, example:
https//example.com, image1, https//example2.com, image2
Support up to 200 links"
						focused
					/>
				);
			} else {
				return (
					<TextField
						fullWidth
						error
						helperText={helperTextLogic()}
						id="outlined-basic"
						label="Link"
						variant="outlined"
						value={codeSetting.inputText}
						onChange={updateInputText}
						multiline
						rows={4}
					/>
				);
			}
		}
	};

	const topPanel = (type) => {
		switch(type){
			case 1:
				return CodeSize(eventTimer)
			case 2:
				return CodeImage(eventTimer)
			case 3:
				return DotSelect({ actionType: 'updateCodeDotType', selectedType: state.dotType, desktopMode: matches })
			case 4:
				return DotSelect({ actionType: 'updateCornerType', selectedType: state.cornerType, desktopMode: matches })
			case 5:
				return DotSelect({ actionType: 'updateCornerDotType', selectedType: state.cornerDotType, desktopMode: matches })
			default:
				return CodeColor(eventTimer)
		}
	}

	const tapComponet = () => {
		const [value, setValue] = React.useState(0);
		
		const handleChange = (event, newValue) => {
			setValue(newValue);
		};

		if(matches) {
			return (
				<Box
					sx={{
						flexGrow: 1,
						bgcolor: "background.paper",
						display: "flex",
						height: 330,
					}}
				>
					<Tabs
						orientation='vertical'
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						sx={{ borderRight: 1, borderColor: "divider", width: 150, flexShrink: 0 }}
					>
						<Tab label="Color" />
						<Tab label="Size" />
						<Tab label="Image" />
						<Tab label="Dot" />
						<Tab label="Corner" />
						<Tab label="Corner Dot" />
					</Tabs>
					{ topPanel(value) }
				</Box>
			);
		}
		return (
			<Box sx={{ width: '100%', height: '400px' }}>
				<Tabs
					variant="scrollable"
					scrollButtons
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
				>
					<Tab label="Color" />
					<Tab label="Size" />
					<Tab label="Image" />
					<Tab label="Dot" />
					<Tab label="Corner" />
					<Tab label="Corner Dot" />
				</Tabs>
				<div className="code-menu-panel">
					{ topPanel(value) }
				</div>
			</Box>
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<List className="side-main-list">
				<ListItem>
					<ToggleButtonGroup
						color="primary"
						value={codeSetting.isBatch}
						onChange={updateQRCodeType}
						exclusive
					>
						<ToggleButton sx={{ minWidth: 150 }} value={false}>
							Single
						</ToggleButton>
						<ToggleButton sx={{ minWidth: 150 }} value={true}>
							Batch
						</ToggleButton>
					</ToggleButtonGroup>
				</ListItem>
				<List component="div" disablePadding>
					<ListItem>{setInputTextField()}</ListItem>
				</List>
			</List>
			{tapComponet()}
		</ThemeProvider>
	);
}
