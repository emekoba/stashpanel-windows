export function generateId(length) {
	if (!length) {
		length = 20;
	}

	let result = "";

	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	let charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export function objectIsEmpty(obj) {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isObject(obj) {
	return typeof obj === "object" && obj !== null;
}
