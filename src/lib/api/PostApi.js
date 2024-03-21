import axios from "axios";
import { getCookie } from "./cookie";

//export const END_POINT_LOCAL = "http://192.168.1.119:8080";
export const END_POINT_LOCAL = "http://172.16.101.17:8080";

export async function postDiary(content, files, date) {
    try{
        const url = '/save/diary';

        const response = await axios.post(END_POINT_LOCAL + url, {
            createDate: date,
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
        formData.append('diaryId', response.data.diaryId);

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


export async function modifyDiary(id, content, files) {
    try{
        const url = '/modify/diary';

        const response = await axios.post(END_POINT_LOCAL + url, {
            diaryId: id,
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
        formData.append('diaryId', id);

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