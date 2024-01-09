import { getCookie } from "./cookie";

export const API_END_POINT = "http://43.201.112.92"
export const END_POINT_LOCAL = "http://192.168.1.239:8080"

export const request = async (url, options = {}) => {
	try {
		// const res = await fetch(`${API_END_POINT}${url}`, {
		const res = await fetch(`${END_POINT_LOCAL}${url}`, {
			...options,
			headers: {"Content-type": "application/json",Authorization : `Bearer ${getCookie('token')}`},
		});

	console.log("headers" , res.headers)
	if (res.ok) {
		const json = await res.json();
		return json;
	}
	throw new Error("API 호출 오류");
	} catch (e) {
		alert(e.message);
	}
};

export const imgRequest = async (url, options = {}) => {
	try {
		// const res = await fetch(`${API_END_POINT}${url}`, {
		const res = await fetch(`${END_POINT_LOCAL}${url}`, {
			...options,
			headers:{"Content-Type": "multipart/form-data",}
		});

	console.log("headers" , res.headers)
	if (res.ok) {
		const json = await res.json();
		return json;
	}
	throw new Error("API 호출 오류");
	} catch (e) {
		alert(e.message);
	}
};


const obj = {hello: 'world'};
