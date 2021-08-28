export const HomeViewType = {
	GRID: "GRID",
	ROAM: "ROAM",
};

export const FileState = {
	DROPPED: "DROPPED",
	STAGED: "STAGED",
	STASHED: "STASHED",
};

export const DispatchCommands = {
	START_LOADER: "START_LOADER",
	STOP_LOADER: "STOP_LOADER",
	ADD_FILES_TO_STAGE: "ADD_FILES_TO_STAGE",
	ADD_FILES_TO_STASH: "ADD_FILES_TO_STASH",
	UPDATE_USER_ID: "UPDATE_USER_ID",
	SET_LOADER_TO_OFFLINE: "SET_LOADER_TO_OFFLINE",
	CLEAR_STASH_AND_STAGE: "CLEAR_STASH_AND_STAGE",
	TOGGLE_NETWORK_STATUS: "TOGGLE_NETWORK_STATUS",
	REMOVE_FILE_FROM_STASH: "REMOVE_FILE_FROM_STASH",
	UPDATE_SETTINGS: "UPDATE_SETTINGS",
	ADD_USER_DP: "ADD_USER_DP",
	ADD_COLLECTION_BANNER: "ADD_COLLECTION_BANNER",
};

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
