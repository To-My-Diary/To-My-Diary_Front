import { getCookie } from "./cookie";

export const API_END_POINT = "http://43.201.112.92"
//export const END_POINT_LOCAL = "http://192.168.1.119:8080"
export const END_POINT_LOCAL = "http://localhost:8080";

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
		// if (options.method == 'GET') {
		const jsonData = await res.json();
		console.log("res", jsonData);
		return jsonData;
	  }
	//   else{
	// 			return res;
	// 		}
	  throw new Error("API 호출 오류");
	} catch (error) {
	  alert(error.message);
	  throw error; // 에러를 다시 throw하여 .catch에서 처리하도록 함
	}
  };
	// console.log(`res${res.json()}`)
	// // console.log("headers" , res.headers)
	// if (res.ok) {
	// 	if (options.method == 'GET') {
	// 		const json = await res.json();
	// 		console.log("res",json);
	// 		return json;
	// 	}
	// 	else{
	// 		return
	// 	}
	// }
	// throw new Error("API 호출 오류");
	// } catch (e) {
	// 	alert(e.message);
	// }
// };

export const imgRequest = async (url, options = {}) => {
	try {
	  const res = await fetch(`${END_POINT_LOCAL}${url}`, {
		...options,
		// headers: {
		//   	Authorization: `Bearer ${getCookie('token')}`,
		// },
	  });
  
	  if (res.ok) {
		const jsonData = await res.json();
		console.log("res", jsonData);
		return jsonData;
	  }
	  throw new Error("API 호출 오류");
	} catch (error) {
	  alert(error.message);
	  throw error; // 에러를 다시 throw하여 .catch에서 처리하도록 함
	}
  };