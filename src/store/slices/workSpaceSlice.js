import { createSlice } from "@reduxjs/toolkit";
import { mode } from '../../lib/constants/constant_value'
import { ListItem } from "../../pages/MainPage/WorkSpace/ToDo";
import { ListGoal } from "../../pages/MainPage/WorkSpace/Goal";
import moment from "moment";

// 작업 공간 초기화 정보
const initialState = {
    // TODO 0  Diary 1  Goal 2
    currentMode: mode.TODO,
    edit: false,
    diaryImages: [],
    date: moment().format('YYYY-MM-DD'),
    goals: [{id:"1", content:<ListGoal key="1" id="1"/>}],
    color: '#000'
}

const workSpaceSlice = createSlice({
    name: "workSpaceSlice",
    initialState,
    reducers:{
        // 상태 전환
        changeMode:(state, action)=>{
            if(action.payload === mode.TODO)
            {
                state.currentMode = mode.TODO
                console.log(state.currentMode);
            }
            else if(action.payload === mode.DIARY)
            {
                state.currentMode = mode.DIARY;
                console.log(state.currentMode);
            }
            else
            {
                state.currentMode = mode.GOAL;
            }
        },
        changeEdit:(state, action)=>{
            state.edit = !state.edit;
        },
        changeDate:(state, action)=>{
            state.date = action.payload;
            // dispatch 시 전달된 데이터 : action.payload 통해 가져올 수 있음 !
        },
        // 다이어리 이미지 추가
        addDiaryImage:(state, action)=>{
            state.diaryImages.push(action.payload);
        },
        resetDiaryImages: (state, action)=>{
            state.diaryImages = action.payload;
        },
        addDiaryImage:(state, action)=>{
            state.diaryImages.push(action.payload);
        },
        changeColor: (state, action)=>{
            state.color = action.payload;
        }
    }
})

export default workSpaceSlice;
export const { changeMode, changeEdit, addDiaryImage, changeDate, resetDiaryImages, changeColor } = workSpaceSlice.actions;
