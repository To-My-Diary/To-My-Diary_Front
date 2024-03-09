import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    diaryData: {},
    goalData: [],
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers:{
        saveDiaryData:(state, action) => {
            state.diaryData = action.payload;
        },
        saveGoalData: (state, action) => {
            state.goalData = action.payload
        }
    }
})

export default dataSlice;
export const { saveDiaryData, saveGoalData } = dataSlice.actions;