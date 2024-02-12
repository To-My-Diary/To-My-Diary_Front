import axios from "axios";
import { getCookie } from "./cookie";

export const END_POINT_LOCAL = "http://172.16.101.95:8080";
//export const END_POINT_LOCAL = "http://localhost:8080"

export async function postDiary(content, files) {
    try{
        await axios.post(END_POINT_LOCAL + '/save/diary', {
            diaryId: 1,
            subject: 'title',
            content: content
        },{
            headers: {
                "Content-Type": "application/json",
		        Authorization: `Bearer ${getCookie('token')}`
        }});
        
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('diaryId', 1);

        await axios.post(END_POINT_LOCAL + '/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
		        Authorization: `Bearer ${getCookie('token')}`
        }})

    }catch(error){
        console.log(error);
    }

    return
}