import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISettingsState {
    replayKey?: string
    autoReplay?: number
    timeBetweenReplays?: number
    showExplanationBeforeComplete?: boolean
    wordSuggestions?: boolean
}

const initialState: ISettingsState = {
    replayKey: "Control",
    autoReplay: 0,
    timeBetweenReplays: 500,
    showExplanationBeforeComplete: false,
    wordSuggestions: false,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettingsState: (state, action: PayloadAction<ISettingsState>) => {
            state.autoReplay = action.payload.autoReplay;
            state.replayKey = action.payload.replayKey;
            state.showExplanationBeforeComplete = action.payload.showExplanationBeforeComplete;
            state.timeBetweenReplays = action.payload.timeBetweenReplays;
            state.wordSuggestions = action.payload.wordSuggestions;
        },
    },
});

export const { setSettingsState } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;