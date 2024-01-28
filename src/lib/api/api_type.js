import { getCookie } from "./cookie";

export const API_END_POINT = "http://43.201.112.92"
export const END_POINT_LOCAL = "http://172.16.101.95:8080"

export const request = async (url, options = {}) => {
	try {
	  const res = await fetch(`${END_POINT_LOCAL}${url}`, {
		...options,
		headers: {
		  "Content-type": "application/json",
		  Authorization: `Bearer ${getCookie('token')}`,
		},
	  });
  
	  if (res.ok) {
		const jsonData = await res.json();
		console.log("api res", jsonData);
		return jsonData;
	  }
	  throw new Error("API 호출 오류");
	} catch (error) {
	  alert(error.message);
	  throw error; // 에러를 다시 throw하여 .catch에서 처리하도록 함
	}
  };
