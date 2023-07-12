import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    mode: "toDoList",
    buttonText: "Diary"
  }

const workSpaceSlice = createSlice({
    name: "workSpaceSlice",
    initialState,
    reducers:{
        // 상태 전환
        changeMode:(state, action)=>{
            if(state.mode === "diary")
            {
                state.mode = "toDoList";
                state.buttonText = "Diary";
            }
            else if(state.mode === "toDoList")
            {
                state.mode = "diary";
                state.buttonText = "ToDo";
            }
        }
    }
})

export default workSpaceSlice;
export const { changeMode } = workSpaceSlice.actions;