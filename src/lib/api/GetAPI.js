import axios from "axios";
import { getCookie } from "./cookie";

//export const END_POINT_LOCAL = "http://192.168.1.119:8080";
export const END_POINT_LOCAL = "http://172.16.101.17:8080";

export async function getDiary(date) {
    try {
        const dateArr = date.split('-');
        const diary = await axios.get(END_POINT_LOCAL+`/diary/${dateArr[0]}/${dateArr[1]}/${dateArr[2]}`, {
            headers: {
                "Content-Type": "application/json",
		        Authorization: `Bearer ${getCookie('token')}`
        }})

        const response = await axios.get(END_POINT_LOCAL + `/image/${diary.data.result[0].diaryId}`,{
            headers: {
                "Content-Type": "application/json",
		        Authorization: `Bearer ${getCookie('token')}`
            },
            responseType: 'blob' 
        });
        console.log(diary.data.result[0]);

        const image = URL.createObjectURL(response.data);

        const diaryData = {
            ...diary.data.result[0],
            img: image
        }

        
        return diaryData;
    }catch(error){
        console.log(error);
    }
}