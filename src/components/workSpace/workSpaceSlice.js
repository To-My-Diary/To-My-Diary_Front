import { createSlice } from "@reduxjs/toolkit";
import { ListItem } from "./ToDoList";
import moment from "moment";

// 작업 공간 초기화 정보
const initialState = {
    mode: "ToDoList",
    edit: false,
    listItems: [{id:"1", content:<ListItem key="1" id="1"/>}],
    diaryImages: [],
    date: moment().format('YYYY-MM-DD')
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
        },
        addItem:(state, action)=>{
            state.listItems.push({id:action.payload, content:<ListItem key={action.payload} id={action.payload}/>})
        },
        deleteItem:(state, action)=>{
            let _list = [];
            
            if(state.listItems.length === 1)
            {
                return;
            }

            for(let item of state.listItems)
            {
                if(item.id !== action.payload)
                {
                    _list.push(item);
                }
                state.listItems = _list;
            }
        },
        // 다이어리 이미지 추가
        addDiaryImage:(state, action)=>{
            state.diaryImages.push(action.payload);
        },
        changeDate:(state, action)=>{
            state.date = action.payload;
            // dispatch 시 전달된 데이터 : action.payload 통해 가져올 수 있음 !
        }
    }
})

export default workSpaceSlice;
export const { changeMode, changeEdit, addItem, deleteItem, addDiaryImage, changeDate } = workSpaceSlice.actions;