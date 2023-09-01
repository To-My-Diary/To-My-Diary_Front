import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    diaryData: {},
    toDoData: {}
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers:{
        saveDiaryData:(state, action) => {
            state.diaryData = action.payload;
        }
    }
})

export default dataSlice;
export const { saveDiaryData } = dataSlice.actions;