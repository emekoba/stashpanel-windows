import { LoaderState } from "../Components/Loader/Loader";
import { isObject } from "../Global/Globals";
import { bg3 } from "../Resources/Resources";

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
};

export const stashPanelGlobalState = {
	panelOnline: false,

	userId: "kMSGxfO5H5SmwQoIGKC17b7pvWS2",

	deviceId: "fukvUJHvPZ3KfGRNlvUd",

	collectionId: "eQFU59ZiUm2bNViUU29Q",

	stash: {},

	stage: {
		// prism: {
		// 	id: "1234567",
		// 	x: 220,
		// 	y: 220,
		// 	name: "russell",
		// 	date: "02-20-2021",
		// 	link: bg3,
		// 	type: "image",
		// },
	},

	loader: {
		isLoading: false,
		loaderState: LoaderState.LOADING,
	},

	popup: {
		isOpen: true,
	},

	settings: {},
};

function globalReducer(state = stashPanelGlobalState, action) {
	switch (action.type) {
		case DispatchCommands.START_LOADER:
			return {
				...state,
				loader: {
					...state.loader,
					isLoading: true,
					loaderState: action.payload ?? LoaderState.LOADING,
				},
			};
			break;

		case DispatchCommands.STOP_LOADER:
			return {
				...state,
				loader: { ...state.loader, isLoading: false },
			};
			break;

		case DispatchCommands.SET_LOADER_TO_OFFLINE:
			return {
				...state,
				loader: { ...state.loader, isLoading: false },
			};
			break;

		case DispatchCommands.UPDATE_USER_ID:
			return { ...state, userId: action.payload };
			break;

		case DispatchCommands.ADD_FILES_TO_STAGE:
			if (isObject(action.payload)) {
				return {
					...state,
					stage: { ...state.stage, ...action.payload },
				};
			} else {
				return {
					...state,
					stage: { ...state.stage },
				};
			}
			break;

		case DispatchCommands.ADD_FILES_TO_STASH:
			if (isObject(action.payload)) {
				return {
					...state,
					stash: { ...state.stash, ...action.payload },
				};
			} else {
				return {
					...state,
					stash: { ...state.stash },
				};
			}
			break;

		case DispatchCommands.REMOVE_FILE_FROM_STASH:
			delete state["stage"][action.payload];
			return state;

			break;

		case DispatchCommands.TOGGLE_NETWORK_STATUS:
			return { ...state, panelOnline: action.payload };
			break;

		case DispatchCommands.UPDATE_SETTINGS:
			return { ...state, settings: { ...state.settings, ...action.payload } };
			break;

		default:
			return state;
			break;
	}
}

export default globalReducer;
