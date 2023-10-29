import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    diaryData: {},
    toDoData: [],
    goalData: {}
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
    const newGoalData = { ...state.goalData };

    if (!newGoalData.detailGoal) {
        newGoalData.detailGoal = [];
    }

    // action.payload의 데이터를 추가 (또는 덮어씀)
    newGoalData.content = action.payload.content;
    newGoalData.planDate = action.payload.planDate;
    newGoalData.color = action.payload.color;
    newGoalData.userId = action.payload.userId;

    // detailGoal 배열에 데이터 추가
    newGoalData.detailGoal.push(action.payload.detailGoal);
    console.log(newGoalData);
    // 새로운 goalData로 업데이트
    state.goalData = newGoalData;
    // console.log(state.goalData);
        }
    }
})

export default dataSlice;
export const { saveDiaryData, saveToDoData, saveGoalData } = dataSlice.actions;