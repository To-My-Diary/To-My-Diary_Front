import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    mode: "ToDoList",
    buttonText: "Diary",
    edit: false
  }

const workSpaceSlice = createSlice({
    name: "workSpaceSlice",
    initialState,
    reducers:{
        // 상태 전환
        changeMode:(state, action)=>{
            if(state.mode === "diary")
            {
                state.mode = "ToDoList";
                state.buttonText = "Diary";
            }
            else if(state.mode === "ToDoList")
            {
                state.mode = "diary";
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