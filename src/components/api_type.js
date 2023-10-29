export const API_END_POINT = "http://43.201.112.92"
// "http://43.201.112.92:8000"

export const request = async (url, options = {}) => {
	try {
		const res = await fetch(`${API_END_POINT}${url}`, {
			...options,
			headers: {"Content-type": "application/json"},
		});

	console.log(res)
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
