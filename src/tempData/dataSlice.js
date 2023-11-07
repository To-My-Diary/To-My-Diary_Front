import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    diaryData: {},
    toDoData: [],
    goalData: []
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers:{
        saveDiaryData:(state, action) => {
            state.diaryData = action.payload;
        },
        saveToDoData: (state, action) => {
            state.toDoData = action.payload;
        },
        saveGoalData: (state, action) => {
            // 현재 goalData를 복제하여 새로운 객체 생성
    const newGoalData = {content: action.payload.content, planDate: action.payload.planDate, color: action.payload.color, userId:action.payload.userId, detailGoal: action.payload.detailGoal};
    console.log('beforeGoalData: ', newGoalData);
    state.goalData = state.goalData.concat(newGoalData)
    console.log('afterGoalData: ',state.goalData);
        }
    }
})

export default dataSlice;
export const { saveDiaryData, saveToDoData, saveGoalData } = dataSlice.actions;