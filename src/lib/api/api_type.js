import { getCookie } from "./cookie";

export const API_END_POINT = "http://43.201.112.92"
export const END_POINT_LOCAL = "http://172.16.101.17:8080";
// 모바일에서 테스트하려면 localhost가 아니라 동일한 wifi에 연결한 상태에서 IP주소를 명시해서 URL을 작성해줘야 한다.

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
