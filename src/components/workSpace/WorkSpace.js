/* 메인화면 아래 부분의 작업 공간 (일기, To-do 작성 등) */

import './WorkSpace.css';
import ToDoList from './ToDoList';
import Diary from './Diary';
import { Route, Routes } from 'react-router-dom';
import ToMyGoal from './ToMyGoal';

function WorkSpace() {
    return(
        <div id="workWrapper">
            <Routes>
                <Route path="/" element={<ToDoList/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/goal" element={<ToMyGoal/>}/>
            </Routes>
        </div>
    );
}

export default WorkSpace;