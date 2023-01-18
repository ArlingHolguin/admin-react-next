const API_URL = "";

async function fetchAPI(url, params, respCode = false) {
	const headers = { "Content-Type": "application/json" };

	/* if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
            'Authorization'
        ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    } */

	const res = await fetch(API_URL + url, {
		method: "POST",
		headers,
		body: JSON.stringify(params)
	});
	if (res.status == 500 || res.status == 404)
		return respCode ? { resp: false, code: res.status } : false;

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error("Failed to fetch API");
	}
	return json.data;
}

export async function request(url, params, getCode = false) {
	const data = await fetchAPI(url, params, getCode);
	return data;
}
