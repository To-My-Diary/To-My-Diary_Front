import axios from "axios";
import { getCookie } from "./cookie";

export const END_POINT_LOCAL = "http://172.16.101.95:8080";

export async function getDiary(id) {
    try{
        const diary = await axios.get(END_POINT_LOCAL+'/show/diary/'+id, {
            headers: {
                "Content-Type": "application/json",
		        Authorization: `Bearer ${getCookie('token')}`
        }})
        const images = await axios.get(END_POINT_LOCAL+'/image/'+id, {
            headers: {
                "Content-Type": "application/json",
		        Authorization: `Bearer ${getCookie('token')}`
        }})

        const imgList = [...images.data].map(image=>image.blob());
        //console.log(URL.createObjectURL(imgList[0]))

        const diaryData = {
            ...diary.data,
            img: imgList
        }
        
        return diaryData;
    }catch(error){
        console.log(error);
    }
}