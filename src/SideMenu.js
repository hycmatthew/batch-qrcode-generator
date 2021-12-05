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
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Box from '@mui/material/Box';
import { styled } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CodeContext } from "./CodeContext.js";
import { v4 as uuidv4 } from 'uuid';


export function SideMenu() {
    const Input = styled(MuiInput)`width: 42px;`;

    const initCodeList = new Map();

    const initCodeSetting = {
        isBatch: false,
        inputText: "",
        containImage: false,
        codeSize: 1000,
        imageSize: 100,
        codeColor: '#000000',
        backgroundColor: '#ffffff'
    }

    const initColorLogicLogic = [{ id: 0, name: '#24C6DC', link: '#24C6DC' }];
    let typingTimer = null;

    const [showCodeSetting, setShowCodeSetting] = React.useState(true);
    const [showImageSetting, setShowImageSetting] = React.useState(true);

    const {state, dispatch} = useContext(CodeContext);

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

    const updateQRCodeType = (e, type) => {
        setCodeSetting(prevState => ({...prevState, isBatch: type}));
        dispatch({ type: 'updateCodeType', isBatch: type});
    }

    const updateShowCodeSetting = () => {
        setShowCodeSetting(!showCodeSetting);
    }

    const updateShowImageSetting = () => {
        setShowImageSetting(!showImageSetting);
    }

    const updateInputText = (str) => {
        setCodeSetting(prevState => ({...prevState, inputText: str}));
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateTextStr', inputText: str});
        }, 500);
    }

    const uploadImage = (e) =>{
        if(ValidateFileUpload(e)){
            dispatch({ type: 'updateInputImage', imageFile: e.target.files[0], containImage: true});
        }
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
                setCodeSetting(prevState => ({...prevState, codeColor: color}));
                dispatch({ type: 'updateCodeColor', codeColor: color});
            }, 10);
        }
    }

    const updateBackgroundColor = (color) => {
        if(hexColorValidation(color)){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                setCodeSetting(prevState => ({...prevState, backgroundColor: color}));
                dispatch({ type: 'updateBackgroundColor', backgroundColor: color});
            }, 10);
        }
    }

    const updateCodeSize = (e, newSize) => {
        setCodeSetting(prevState => ({ ...prevState, codeSize: newSize }))
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateCodeSize', codeSize: newSize});
        }, 100);
    }

    const updateImageSize = (e, newSize) => {
        setCodeSetting(prevState => ({ ...prevState, imageSize: newSize }))
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateImageSize', imageSize: newSize});
        }, 100);
    }
    
    const updateInputTextField = () => {
        if(codeSetting.isBatch === true){
            return(<TextField fullWidth id="outlined-basic" label="Links and output filenames" variant="outlined" value={codeSetting.inputText} onChange={e => updateInputText(e.target.value)} multiline rows={10} placeholder="Seperate link and output image name by comma, example:
https//example.com, image1, https//example2.com, image2" focused />);
        }else{
            return(<TextField fullWidth id="outlined-basic" label="Link" variant="outlined" value={codeSetting.inputText} onChange={e => updateInputText(e.target.value)} multiline rows={4} />);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <List className="side-main-list" subheader={<ListSubheader component="div" id="nested-list-subheader">QR Code Setup</ListSubheader>}>
                <ListItem>
                    <ToggleButtonGroup color="primary" value={codeSetting.isBatch} onChange={updateQRCodeType}  exclusive>
                        <ToggleButton value={false}>Single</ToggleButton>
                        <ToggleButton value={true}>Batch</ToggleButton>
                    </ToggleButtonGroup>
                </ListItem>
                <List component="div" disablePadding>
                    <ListItem>
                        { updateInputTextField() }
                    </ListItem>
                </List>
                <ListItemButton onClick={ updateShowCodeSetting }>
                    <ListItemIcon><InboxIcon /> </ListItemIcon>
                    <ListItemText primary="QR Code Color" />
                    {showCodeSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={showCodeSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <div>
                                <div className="background-color-block">
                                    <input id="color" type="color" value={codeSetting.codeColor} onChange={e => updateCodeColor(e.target.value)}/>
                                </div>
                                <TextField label="Code Color" size="small" value={codeSetting.codeColor} onChange={e => updateCodeColor(e.target.value)}/>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div>
                                <div className="background-color-block">
                                    <input id="color" type="color" value={codeSetting.backgroundColor} onChange={e => updateBackgroundColor(e.target.value)}/>
                                </div>
                                <TextField label="Background Color" size="small" value={codeSetting.backgroundColor} onChange={e => updateBackgroundColor(e.target.value)}/>
                            </div>
                        </ListItem>
                        <ListItem>
                            <Box sx={{ width: 250 }}>
                                <Typography id="input-slider" gutterBottom>QR Code Size</Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider min={100} step={100} max={2000} value={codeSetting.codeSize} aria-labelledby="input-slider" onChange={ updateCodeSize } />
                                    </Grid>
                                    <Grid item>
                                        <Input value={codeSetting.codeSize} size="small" onChange={ (e)=>updateCodeSize(e, e.target.value) } inputProps={{ step: 100,  min: 100, max: 2000, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem className="upload-image-submenu" onClick={ updateShowImageSetting }>
                    <ListItemIcon><InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Logo Image" />
                    <Switch value={true} checked={showImageSetting} onClick={updateShowImageSetting} />
                    {showImageSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={showImageSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <input type="file" accept="image/*" onChange={ (e)=>uploadImage(e)} />
                        </ListItem>
                        <ListItem>
                            <Box sx={{ width: 250 }}>
                                <Typography id="input-slider" gutterBottom>Logo Size</Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider value={codeSetting.imageSize}  aria-labelledby="input-slider" onChange={ updateImageSize } />
                                    </Grid>
                                    <Grid item>
                                        <Input value={codeSetting.imageSize} size="small" onChange={ (e)=>updateImageSize(e, e.target.value) } inputProps={{ step: 10,  min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </ThemeProvider>
    );

}