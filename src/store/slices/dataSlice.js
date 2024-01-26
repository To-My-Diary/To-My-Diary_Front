import { createSlice } from "@reduxjs/toolkit";

// 작업 공간 초기화 정보
const initialState = {
    diaryData: {},
    toDoData: [],
    goalData: [
        // {
        //     "createDate": "2023-07-28",
        //     "goalId": 1,
        //     "content": "인공지능 공부하기",
        //     "achieve": null,
        //     "planDate": "2024-01-20",
        //     "achieveRate": 0,
        //     "color": "#f87171",
        //     "user": {
        //         "email": "member1",
        //         "pw": "1234",
        //         "name": "조유진",
        //         "tel": "01037902800",
        //         "gender": "F"
        //     },
        //     "detailGoals": [
        //         {
        //             "createDate": "2023-07-28",
        //             "detailGoalId": 1,
        //             "content": "머신러닝에 대한 논문 읽기",
        //             "achieve": null,
        //             "planDate": "2023-11-20",
        //             "color": "#f87171"
        //         },
        //     ]
        // },
        // {
        //     "createDate": "2023-07-28",
        //     "goalId": 2,
        //     "content": "토익 900점",
        //     "achieve": null,
        //     "planDate": "2024-01-30",
        //     "achieveRate": 0,
        //     "color": "#f21021",
        //     "user": {
        //         "email": "member1",
        //         "pw": "1234",
        //         "name": "조유진",
        //         "tel": "01037902800",
        //         "gender": "F"
        //     },
        //     "detailGoals": [
        //         {
        //             "createDate": "2023-07-28",
        //             "detailGoalId": 1,
        //             "content": "듣기 연습하기",
        //             "achieve": null,
        //             "planDate": "2023-12-22",
        //             "color": "#f21021"
        //         },
        //     ]
        // },
    ],
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
            action.forEach(item=>{
                console.log("호출");
                state.goalData = state.goalData.concat(item);
                console.log(`afterGoalData${state.goalData}`)
                     })
        }
    }
})

export default dataSlice;
export const { saveDiaryData, saveToDoData, saveGoalData } = dataSlice.actions;