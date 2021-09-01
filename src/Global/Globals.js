export const ColorWheel = [
	"limegreen",
	"dodgerblue",
	"#EEDD82",

	"#f032e6",
	"#fabebe",
	"#008080",
	"#e6beff",
	"#9a6324",
	"#fffac8",
	"#800000",
	"#aaffc3",
	"#808000",
	"#ffd8b1",
	"#000075",
	"#808080",
	"#ffffff",
	"#3cb44b",
	"#000000",
	"#f58231",
	"#e6194b",
	"#911eb4",
	"#46f0f0",
	"#ffe119",
	"#4363d8",
	"#dd82ee",
	"#bcf60c",

	"tomato",
	"yellow",
	"purple",
	"#1A1A1A",
	"brown",
	"teal",
	"goldenrod",
];

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
	UPDATE_USER_DP: "UPDATE_USER_DP",
	ADD_COLLECTION_BANNER: "ADD_COLLECTION_BANNER",
	HIDE_WINDOW_MENU: "HIDE_WINDOW_MENU",
	SHOW_WINDOW_MENU: "SHOW_WINDOW_MENU",
	TOGGLE_HOME_VIEW_TYPE: "TOGGLE_HOME_VIEW_TYPE",
	CLOSE_FILE: "CLOSE_FILE",
	OPEN_FILE: "OPEN_FILE",
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
