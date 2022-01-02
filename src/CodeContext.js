import React, { useReducer } from "react";
import { MainPage } from "./MainPage";

export const CodeContext = React.createContext();

const initialState = {
    isBatch: false,
    imageFile: '',
    containImage: false,
    codeSize: 1000,
    imageSize: 100,
    codeColor: '#000000',
    backgroundColor: '#FFFFFF',
    codeData: {}
};

function dataReducer(state, action) {
    switch (action.type) {
        case 'updateCodeType':
            return { ...state, 'isBatch': action.isBatch};
        case 'updateCodeData':
            return { ...state, 'codeData': action.codeData};
        case 'updateCodeColor':
            return { ...state, 'codeColor': action.codeColor};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundColor': action.backgroundColor};
        case 'updateCodeSize':
            return { ...state, 'codeSize': action.codeSize};
        case 'updateImageSize':
            return { ...state, 'imageSize': action.imageSize};
        case 'updateContainImage':
            return { ...state, 'containImage': action.containImage};    
        case 'updateInputImage':
            return { ...state, 'imageFile': action.imageFile, 'containImage': action.containImage};
        default: 
            return state
    }
};

export const Provider = () => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
  
    return (
      <CodeContext.Provider value={{ state, dispatch }}><MainPage /></CodeContext.Provider>
    );
};