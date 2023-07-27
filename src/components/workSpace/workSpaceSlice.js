import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    mode: "ToDoList",
    edit: false,
    date: 0
  }

const workSpaceSlice = createSlice({
    name: "workSpaceSlice",
    initialState,
    reducers:{
        // 상태 전환
        changeMode:(state, action)=>{
            if(state.mode === "Diary")
            {
                state.mode = "ToDoList";
                state.buttonText = "Diary";
            }
            else if(state.mode === "ToDoList")
            {
                state.mode = "Diary";
                state.buttonText = "ToDo";
            }
        },
        changeEdit:(state, action)=>{
            state.edit = !state.edit;
        }
        
    }
})

export default workSpaceSlice;
export const { changeMode, changeEdit } = workSpaceSlice.actions;