import React, { useReducer } from "react";
import { ImageLayer } from "./ImageLayer";

export const Context = React.createContext();

const initialState = {
    imageFiles: {},
    containImage: false,
    codeSize: 1000,
    imageSize: 50,
    codeColor: '#000000',
    backgroundColor: '#ffffff',
    codeData: {}
};

function dataReducer(state, action) {
    switch (action.type) {
        case 'updateCodeColor':
            return { ...state, 'codeColor': action.codeColor};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundColor': action.backgroundColor};
        case 'updateCodeSize':
            return { ...state, 'codeSize': action.codeSize};
        case 'updateInputImage':
            return { ...state, 'imageFiles': deviceSize, 'containImage': action.containImage};
        case 'updateImageSize':
            return { ...state, 'imageSize': action.imageSize};
        case 'updateCodeSize':
            return { ...state, 'codeSize': action.CodeSize};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundType': action.backgroundType, 'backgroundColor': action.backgroundColor};
        default: 
            return state
    }
};

export const Provider = () => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
  
    return (
      <Context.Provider value={{ state, dispatch }}><ImageLayer /></Context.Provider>
    );
};