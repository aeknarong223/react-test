import { createSlice } from '@reduxjs/toolkit'
import {PayloadAction} from '@reduxjs/toolkit'
import { LanguageState, CitizenIDParts } from './Type/translationType';

interface ClickedState {
  isClicked1: boolean;
  isClicked2: boolean;
  isClicked3: boolean;
  isClicked4: boolean;
  isClicked5: boolean;
  isClicked6: boolean;
  isClicked7: boolean;
  isClicked8: boolean;
  isClicked9: boolean;
}

const isClickedState: ClickedState = {
  isClicked1: false,
  isClicked2: false,
  isClicked3: false,
  isClicked4: false,
  isClicked5: false,
  isClicked6: false,
  isClicked7: false,
  isClicked8: false,
  isClicked9: false,
};
export const indexSlice = createSlice({
  name: 'index',
  initialState : {
    lang : { value: 'en', label: "EN" },
    pages : "home",
    ...isClickedState,
    isClickedSpacial: false,
    part1: '',
    part2: '',
    part3: '',
    part4: '',
    part5: '',
    data : null,
    key : null
  },
  reducers: {
    setLanguage : (state, action: PayloadAction<LanguageState>) => {
      state.lang = action.payload;
    },
    setIsClicked: (state, action: PayloadAction<{ buttonId: number; value: boolean }>) => {
      state[`isClicked${action.payload.buttonId}` as keyof ClickedState] = action.payload.value;
    },
    setPages : (state, action: PayloadAction<string>) => {
      state.pages = action.payload;
    },
    setIsClickedSpacial : (state, action: PayloadAction<boolean>) => {
      state.isClickedSpacial = action.payload;
    },
    setPart: (state, action: PayloadAction<{ part: keyof CitizenIDParts; value: string }>) => {
      const { part, value } = action.payload;
      state[part] = value;
    },
    resetCitizenID: (state) => {
      state.part1 = '';
      state.part2 = '';
      state.part3 = '';
      state.part4 = '';
      state.part5 = ''; 
    },
    setData : (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setKey : (state, action: PayloadAction<any>) => {
      state.key = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setLanguage, 
  setPages, 
  setIsClickedSpacial,
  setPart, 
  resetCitizenID, 
  setData,
  setIsClicked,
  setKey
} = indexSlice.actions

export default indexSlice.reducer