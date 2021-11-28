import React, { useState, useEffect, useReducer, useContext }  from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TextField from '@mui/material/TextField';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Box from '@mui/material/Box';
import { styled } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from "./CodeContext.js";
import { v4 as uuidv4 } from 'uuid';


export function SideMenu() {
    const Input = styled(MuiInput)`width: 42px;`;

    const initCodeList = new Map();

    const initCodeSetting = {
        inputText: "",
        containImage: false,
        codeSize: 1000,
        codeColor: '#000000',
        backgroundColor: '#ffffff'
    }

    const initColorLogicLogic = [{ id: 0, name: '#24C6DC', link: '#24C6DC' }];
    let typingTimer = null;

    const [showInputSetting, setShowInputSetting] = React.useState(true);
    const [showCodeSetting, setShowCodeSetting] = React.useState(true);
    const [showImageSetting, setShowImageSetting] = React.useState(true);

    const {state, dispatch} = useContext(Context);

    const [codeList, setcodeList] = React.useState(initCodeList);
    const [codeSetting, setCodeSetting] = React.useState(initCodeSetting);

    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
    });

    function ValidateFileUpload(e) {
        const imageFile = e.target.files[0];
        
        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            alert('Please select valid image.');
            return false;
        }
        return true
    }

    const updateShowInputSetting = () => {
        setShowInputSetting(!showInputSetting);
    }

    const updateShowCodeSetting = () => {
        setShowCodeSetting(!showCodeSetting);
    }

    const updateShowImageSetting = () => {
        setShowImageSetting(!showImageSetting);
    }

    const addBackgroundColorNum = () => {
        let setNum = uuidv4();
        let newList = [...colorList, { id: setNum, color: '#f9d39a', colorPos: 0 }];
        setColorList(newList);
    }

    const deleteBackgroundColorNum = (num) => {
        let newList = [...colorList];
        newList.splice(num,1);
        console.log("-"+num);
        setColorList(newList);
    }

    const updateBackgroundType = (type) => {
        let setType = parseInt(type);
        setBackgroundType(setType);
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: colorList});
    };

    const updateInputText = (str) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateTextStr', inputText: str});
        }, 500);
    }

    const uploadImage = (e, deviceKey) =>{
        dispatch({ type: 'updateInputImage', imageFiles: e.target.files[0], imageType: deviceKey, containImage: true});
    }

    const uploadBackgroundImage = (e) =>{
        if(ValidateFileUpload(e)){
            console.log(e.target.files[0]);
            dispatch({ type: 'updateBackgroundImage', backgroundImageFile: e.target.files[0]});
        }
    }

    const backgroundColorBlockChange = (setId, colorHex) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            if(hexColorValidation(colorHex)){
                let newList = colorList.map(item => {
                    if(item.id === setId){
                        item.color = colorHex
                    }
                    return item
                });
                updateBackgroundColor(backgroundType, newList);
                setColorList(newList);
            }
        }, 8);
    }

    const backgroundColorPositionChange = (setId, pos) => {
        let newList = colorList.map(item => {
            if(item.id === setId){
                item.colorPos = pos
            }
            return item
        });
        updateBackgroundColor(backgroundType, newList);
        setColorList(newList);
    }

    const hexColorValidation = (color) =>{
        let rs = /^#([0-9A-F]{3}){1,2}$/i;
        if(color.match(rs)){
            return true
        }
        return false
    }

    const updateCodeColor = (color) => {
        if(hexColorValidation(color)){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                setTextSetting(prevState => ({...prevState, inputFontColor: color}));
                dispatch({ type: 'updateTextFontColor', fontColor: color});
            }, 10);
        }
    }

    const updateBackgroundColor = (color) => {
        if(hexColorValidation(color)){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                setTextSetting(prevState => ({...prevState, inputFontColor: color}));
                dispatch({ type: 'updateTextFontColor', fontColor: color});
            }, 10);
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
            <List className="side-main-list" subheader={<ListSubheader component="div" id="nested-list-subheader">Screenshot Setup</ListSubheader>}>
                <ListItemButton className="upload-image-submenu" onClick={ updateShowInputSetting }>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Size" />
                    {showInputSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={showInputSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem>
                        <ListItemIcon><StarBorder /></ListItemIcon>
                        <TextField size="small" fullWidth id="outlined-basic" label="Text" variant="outlined" onChange={e => updateInputText(e.target.value)} multiline rows={8} />
                    </ListItem>
                    </List>
                </Collapse>
                <ListItemButton onClick={ updateShowCodeSetting }>
                    <ListItemIcon><InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Text" />
                    {showCodeSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={showCodeSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem>
                        <div>
                            <div className="background-color-block">
                                <input id="color" type="color" value={codeSetting.codeColor} onChange={e => updateCodeColor(e.target.value)}/>
                            </div>
                            <TextField size="small" value={codeSetting.codeColor} onChange={e => updateCodeColor(e.target.value)}/>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div>
                            <div className="background-color-block">
                                <input id="color" type="color" value={codeSetting.backgroundColor} onChange={e => updateBackgroundColor(e.target.value)}/>
                            </div>
                            <TextField size="small" value={codeSetting.backgroundColor} onChange={e => updateBackgroundColor(e.target.value)}/>
                        </div>
                    </ListItem>
                    <ListItem>
                        <Box sx={{ width: 250 }}>
                            <Typography id="input-slider" gutterBottom>QR Code Size</Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider value={textSetting.inputFontSize}  aria-labelledby="input-slider" onChange={ e => updateTextFontSize(e.target.value) } />
                                </Grid>
                                <Grid item>
                                    <Input value={textSetting.inputFontSize} size="small" onChange={ e => updateTextFontSize(e.target.value) } inputProps={{ step: 10,  min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </ListItem>
                    <ListItemButton className="upload-image-submenu" onClick={ updateShowImageSetting }>
                        <ListItemIcon><InboxIcon /> </ListItemIcon>
                        <ListItemText primary="Screenshot" />
                        {showImageSetting ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={showImageSetting} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <input type="file" onChange={ (e)=>uploadImage(e)} />
                            </ListItem>
                            <ListItem>
                                <Box sx={{ width: 250 }}>
                                    <Typography id="input-slider" gutterBottom>Font Size</Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Slider value={textSetting.inputFontSize}  aria-labelledby="input-slider" onChange={ e => updateTextFontSize(e.target.value) } />
                                        </Grid>
                                        <Grid item>
                                            <Input value={textSetting.inputFontSize} size="small" onChange={ e => updateTextFontSize(e.target.value) } inputProps={{ step: 10,  min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ListItem>
                        </List>
                    </Collapse>
                    </List>
                </Collapse>
            </List>
        </ThemeProvider>
    );

}