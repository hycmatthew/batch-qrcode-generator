import React, { useContext, useRef } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CodeContext } from "./CodeContext.js";

export function SideMenu() {
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
  const [showCodeSetting, setShowCodeSetting] = React.useState(true);
  const [showImageSetting, setShowImageSetting] = React.useState(true);
  const [showStyleSetting, setShowStyleSetting] = React.useState(false);

  const [syncCornerColor, setSyncCornerColor] = React.useState(true);
  const [syncCornerDotColor, setSyncCornerDotColor] = React.useState(true);

  const { state, dispatch } = useContext(CodeContext);

  const [codeSetting, setCodeSetting] = React.useState(initCodeSetting);
  const [errorType, setErrorType] = React.useState(0);

  const colorTimer = useRef();

  const theme = createTheme({
    typography: {
      fontSize: 12,
    },
  });

  function ValidateFileUpload(e) {
    const imageFile = e.target.files[0];

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("Please select valid image.");
      return false;
    }
    return true;
  }

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
        tempCodeList.push({ link: tempLinkList[item], filename: setName });
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

  const updateShowCodeSetting = () => {
    setShowCodeSetting(!showCodeSetting);
  };

  const updateShowImageSetting = () => {
    setShowImageSetting(!showImageSetting);
    dispatch({ type: "updateContainImage", containImage: !showImageSetting });
  };

  const updateShowStyleSetting = () => {
    setShowStyleSetting(!showStyleSetting);
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
          dispatch({ type: "updateCodeData", codeData: resultCodeData });
        } else {
          dispatch({ type: "updateCodeData", codeData: [] });
        }
      }, 500)
    );
  };

  const uploadImage = (e) => {
    if (ValidateFileUpload(e)) {
      dispatch({
        type: "updateInputImage",
        imageFile: e.target.files[0],
        containImage: showImageSetting,
      });
    }
  };

  const hexColorValidation = (color) => {
    let rs = /^#([0-9A-F]{3}){1,2}$/i;
    if (color.match(rs)) {
      return true;
    }
    return false;
  };

  const updateCodeColor = (e) => {
    const color = e.target.value.toUpperCase();

    clearTimeout(colorTimer.current);
    colorTimer.current = setTimeout(() => {
      setCodeColorLogic(color, 1);
    }, 50);
  };

  const updateBackgroundColor = (e) => {
    const color = e.target.value.toUpperCase();

    clearTimeout(colorTimer.current);
    colorTimer.current = setTimeout(() => {
      setCodeColorLogic(color, 2);
    }, 50);
  };

  const updateCornerColor = (e) => {
    const color = e.target.value.toUpperCase();

    clearTimeout(colorTimer.current);
    colorTimer.current = setTimeout(() => {
      setCodeColorLogic(color, 3);
    }, 50);
  };

  const updateCornerDotColor = (e) => {
    const color = e.target.value.toUpperCase();

    clearTimeout(colorTimer.current);
    colorTimer.current = setTimeout(() => {
      setCodeColorLogic(color, 4);
    }, 50);
  };

  const udpateSyncCornerColor = (e) => {
    setSyncCornerColor(e.target.checked);
    let setColor = codeSetting.codeColor;
    if(!e.target.checked){
      setColor = codeSetting.cornerColor;
    }
    setCodeColorLogic(setColor, 3);
  }

  const udpateSyncCornerDotColor = (e) => {
    setSyncCornerDotColor(e.target.checked);
    let setColor = codeSetting.codeColor;
    if(!e.target.checked){
      setColor = codeSetting.cornerDotColor;
    }
    setCodeColorLogic(setColor, 4);
  }

  const setCodeColorLogic = (color, typeNum) => {
    //typeNum 1=code 2=bg 3=corner 4=cornerDot
    switch(typeNum){
      case 1:
        dispatch({ type: "updateCodeColor", codeColor: color });
        setCodeSetting((prevState) => ({ ...prevState, codeColor: color }));
        if(syncCornerColor){
          dispatch({ type: "updateCornerColor", cornerColor: color });
          setCodeSetting((prevState) => ({ ...prevState, cornerColor: color }));
        }
        if(syncCornerDotColor){
          setCodeSetting((prevState) => ({ ...prevState, cornerDotColor: color }));
          dispatch({ type: "updateCornerDotColor", cornerDotColor: color });
        }
        break;
      case 2:
        setCodeSetting((prevState) => ({ ...prevState, backgroundColor: color }));
        dispatch({ type: "updateBackgroundColor", backgroundColor: color });
        break;
      case 3:
        dispatch({ type: "updateCornerColor", cornerColor: color });
        setCodeSetting((prevState) => ({ ...prevState, cornerColor: color }));
        break;
      case 4:
        setCodeSetting((prevState) => ({ ...prevState, cornerDotColor: color }));
        dispatch({ type: "updateCornerDotColor", cornerDotColor: color });
        break;
      default:
        break;
    }
  }

  const updateCodeSize = (e) => {
    let sizeNum = parseInt(e.target.value);
    setCodeSetting({ ...codeSetting, codeSize: sizeNum });
    clearTimeout(typingTimer);
    setTypingTimer(
      setTimeout(() => {
        dispatch({ type: "updateCodeSize", codeSize: sizeNum });
      }, 200)
    );
  };

  const updateImageSize = (e) => {
    let sizeNum = parseInt(e.target.value);
    setCodeSetting({ ...codeSetting, imageSize: sizeNum });
    clearTimeout(typingTimer);
    setTypingTimer(
      setTimeout(() => {
        dispatch({ type: "updateImageSize", imageSize: sizeNum });
      }, 200)
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

  // QR Code Style
  const updateCodeDotType = (e) => {
    let styleType = e.target.value;
    setCodeSetting((prevState) => ({
      ...prevState,
      dotType: styleType,
    }));
    dispatch({ type: "updateCodeDotType", dotType: styleType });
  };

  const updateCornerType = (e) => {
    let styleType = e.target.value;
    setCodeSetting((prevState) => ({
      ...prevState,
      cornerType: styleType,
    }));
    dispatch({ type: "updateCornerType", cornerType: styleType });
  };

  const updateCornerDotType = (e) => {
    let styleType = e.target.value;
    setCodeSetting((prevState) => ({
      ...prevState,
      cornerDotType: styleType,
    }));
    dispatch({ type: "updateCornerDotType", cornerDotType: styleType });
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

  return (
    <ThemeProvider theme={theme}>
      <List
        className="side-main-list"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            disableSticky={true}
          >
            QR Code Setting
          </ListSubheader>
        }
      >
        <ListItem>
          <ToggleButtonGroup
            color="primary"
            value={codeSetting.isBatch}
            onChange={updateQRCodeType}
            exclusive
          >
            <ToggleButton value={false}>Single</ToggleButton>
            <ToggleButton value={true}>Batch</ToggleButton>
          </ToggleButtonGroup>
        </ListItem>
        <List component="div" disablePadding>
          <ListItem>{setInputTextField()}</ListItem>
        </List>
        <ListItemButton onClick={updateShowCodeSetting}>
          <ListItemIcon>
            <ColorLensIcon />
          </ListItemIcon>
          <ListItemText primary="QR Code Color" />
          {showCodeSetting ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showCodeSetting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <div>
                <div className="background-color-block">
                  <input
                    id="color"
                    type="color"
                    value={codeSetting.codeColor}
                    onChange={updateCodeColor}
                  />
                </div>
                <TextField
                  label="Code Color"
                  size="small"
                  value={codeSetting.codeColor}
                  inputProps={{ maxLength: 7 }}
                  onChange={updateCodeColor}
                />
              </div>
            </ListItem>
            <ListItem>
              <div>
                <div className="background-color-block">
                  <input
                    id="color"
                    type="color"
                    value={codeSetting.backgroundColor}
                    onChange={updateBackgroundColor}
                  />
                </div>
                <TextField
                  label="Background Color"
                  size="small"
                  value={codeSetting.backgroundColor}
                  inputProps={{ maxLength: 7 }}
                  onChange={updateBackgroundColor}
                />
              </div>
            </ListItem>
            <ListItem>
              <Box sx={{ width: 250 }}>
                <Typography id="code-size-slider" gutterBottom>
                  QR Code Size (In Pixel)
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      min={400}
                      step={100}
                      max={2000}
                      value={
                        typeof codeSetting.codeSize === "number"
                          ? codeSetting.codeSize
                          : 0
                      }
                      aria-labelledby="code-size-slider"
                      onChange={updateCodeSize}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={codeSetting.codeSize}
                      size="small"
                      onChange={updateCodeSize}
                      inputProps={{
                        step: 100,
                        min: 400,
                        max: 2000,
                        type: "number",
                        "aria-labelledby": "code-size-slider",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          className="upload-image-submenu"
          onClick={updateShowImageSetting}
        >
          <ListItemIcon>
            <InsertPhotoIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Logo Image" />
          <Switch
            value={true}
            checked={showImageSetting}
            onClick={updateShowImageSetting}
          />
          {showImageSetting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={showImageSetting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
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
            </ListItem>
            <ListItem>
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
                        typeof codeSetting.imageSize === "number"
                          ? codeSetting.imageSize
                          : 0
                      }
                      aria-labelledby="image-size-slider"
                      onChange={updateImageSize}
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={codeSetting.imageSize}
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
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          className="upload-image-submenu"
          onClick={updateShowStyleSetting}
        >
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Custom Style" />
          <Switch
            value={true}
            checked={showStyleSetting}
            onClick={updateShowStyleSetting}
          />
          {showStyleSetting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={showStyleSetting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Stack>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Dot Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={codeSetting.dotType}
                    label="Dot Type"
                    onChange={updateCodeDotType}
                  >
                    <MenuItem value={"square"}>square</MenuItem>
                    <MenuItem value={"rounded"}>rounded</MenuItem>
                    <MenuItem value={"dots"}>dots</MenuItem>
                    <MenuItem value={"classy"}>classy</MenuItem>
                    <MenuItem value={"classy-rounded"}>classy-rounded</MenuItem>
                    <MenuItem value={"extra-rounded"}>extra-rounded</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Corner Type
                  </InputLabel>
                  <Select
                    displayEmpty={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={codeSetting.cornerType}
                    label="Corner Type"
                    onChange={updateCornerType}
                  >
                    <MenuItem value={"square"}>square</MenuItem>
                    <MenuItem value={"dot"}>dot</MenuItem>
                    <MenuItem value={"extra-rounded"}>extra-rounded</MenuItem>
                  </Select>
                </FormControl>
                <p className="style-color-text">Corner Color</p>
                <div className="background-color-block">
                  <input
                    id="color"
                    type="color"
                    value={codeSetting.cornerColor}
                    onChange={updateCornerColor}
                  />
                </div>
                <FormControlLabel control={<Checkbox defaultChecked onChange={udpateSyncCornerColor}/>} label="Sync with code color" />
              </Stack>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Corner Dot Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={codeSetting.cornerDotType}
                    label="Corner Dot Type"
                    onChange={updateCornerDotType}
                  >
                    <MenuItem value={"square"}>square</MenuItem>
                    <MenuItem value={"dot"}>dot</MenuItem>
                  </Select>
                </FormControl>
                <p className="style-color-text">Corner Dot Color</p>
                <div className="background-color-block">
                  <input
                    id="color"
                    type="color"
                    value={codeSetting.cornerDotColor}
                    onChange={updateCornerDotColor}
                  />
                </div>
                <FormControlLabel control={<Checkbox defaultChecked onChange={udpateSyncCornerDotColor}/>} label="Sync with code color" />
              </Stack>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}
