import "./stashpanel.css";
import Home from "./Pages/Home/Home";
import MenuBar from "./Components/MenuBar/MenuBar";
import { CloseIcon, MenuIcon, MinimizeIcon } from "./Resources/Resources";
import firebase, { database, getUser } from "./Services/firebase.service";
import { useEffect, useState } from "react";
import Onboarding from "./Pages/Onboarding/Onboarding";
import Loader from "./Components/Loader/Loader";
import {
	CollectionTypes,
	DispatchCommands,
	FileStates,
	LoaderStates,
	NotificationTypes,
} from "./Global/Globals";
import { connect } from "react-redux";
import Viewer from "./Pages/Viewer/Viewer";
import Settings from "./Pages/Settings/Settings";

function StashPanel({
	userId,
	activeCollection,
	startLoader,
	stopLoader,
	updateUserId,
	addFilesToStage,
	addFilesToStash,
	clearStageAndStash,
	panelOnline,
	toggleNetworkStatus,
	updateSettings,
	updateUserDp,
	windowMenuVisible,
	fileViewerOpen,
	closeViewer,
	playAlert,
	settingsOpen,
	updateCollection,
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const [firstDraw, setFirstDraw] = useState(true);

	useEffect(() => {
		firebase?.auth().onAuthStateChanged((user) => {
			if (user) {
				updateUserId(user.uid);

				getUser(user.uid).then((userInfo) => {
					updateCollection(CollectionTypes.ACTIVE, {
						id: userInfo["activeCollection"],
					});

					updateUserDp(userInfo["dp"]);
				});

				setIsLoggedIn(true);
			} else {
				//? if no longer logged in switch to onboarding

				setIsLoggedIn(false);

				clearStageAndStash();
			}
		});
	}, []);

	useEffect(() => {
		// async function checkOnlineStatus() {
		// 	try {
		// 		const online = await fetch("/1pixel.png");
		// 		return online.status >= 200 && online.status < 300;
		// 	} catch (err) {
		// 		return false;
		// 	}
		// }

		// window.addEventListener("load", async () =>
		// 	toggleNetworkStatus(await checkOnlineStatus())
		// );

		document.body.onkeydown = (evt) => {
			evt = evt || window.event;
			if (evt.keyCode == 27) closeViewer();
		};

		window.addEventListener("online", () => {
			console.log("%c panel online", "color:limegreen");

			toggleNetworkStatus(true);
		});

		window.addEventListener("offline", () => {
			console.log("%c panel offline", "color:tomato");

			toggleNetworkStatus(false);
		});
	}, []);

	useEffect(() => {
		if (isLoggedIn && panelOnline) {
			startLoader(LoaderStates.LOADING);

			database
				.collection("panel-collections")
				.where("members", "array-contains", userId)
				.get()
				.then((doc) => {
					console.log(
						"%c panel collection reads (for mine and other devices)",
						"color:lightblue"
					);

					let _member_collections = [];

					doc.docs.forEach((each_collection) => {
						if (each_collection.id === activeCollection) {
							updateCollection(CollectionTypes.ACTIVE, {
								name: each_collection.data()["name"],
								banner: each_collection.data()["bannerImage"],
								creator: each_collection.data()["creator"],
								members: each_collection.data()["members"],
							});

							const all_other_users = [];

							if (each_collection.data()) {
								const _other_users = each_collection
									.data()
									.members.filter((e) => e !== userId);

								_other_users.map((each_user) =>
									all_other_users.push(each_user)
								);
							}

							fetchOtherUsersDevices(all_other_users);
						} else {
							_member_collections.push({
								...each_collection.data(),
								id: each_collection.id,
							});
						}
					});

					updateCollection(CollectionTypes.MEMBER, _member_collections);
				});

			fetchMyDevice(userId);
		} else {
			startLoader(LoaderStates.OFFLINE);
		}
	}, [activeCollection, panelOnline, isLoggedIn]);

	function fetchMyDevice(userId) {
		database
			.collection("devices")
			.where("owner", "==", userId)
			.get()
			.then((device_docs) => {
				console.log("%c device reads (for my device)", "color:lightblue");

				device_docs.docs.forEach((doc) => {
					const _files = doc.data()["files"];

					queryMultipleFiles(
						_files,
						{},
						{
							isExternal: false,
							sortFiles: true,
						}
					).then((fetched_files) => {
						addFilesToStage(fetched_files["staged"]);
						addFilesToStash(fetched_files["stashed"]);

						stopLoader();
					});
				});
			});
	}

	function fetchOtherUsersDevices(allUsersArray) {
		let _all_device_files = [];

		let userInfoRedundancyCheck = {
			// fukvUJHv: {
			// 	device: "",
			// 	files: [],
			// 	dp: "",
			// },
		};

		database
			.collection("devices")
			.where("owner", "in", allUsersArray.slice(0, 10))
			.onSnapshot(
				{
					includeMetadataChanges: true,
				},
				(device_snapshot) => {
					console.log("%c device reads (for other devices)", "color:lightblue");

					if (firstDraw) setFirstDraw(false);
					else playAlert(NotificationTypes.NEW_FILE);

					device_snapshot.docs.forEach((doc, idx) => {
						let _each_device_in_collection = doc.data();

						const _files = _each_device_in_collection["files"];
						const _device_owner = _each_device_in_collection["owner"];

						let ownerExists = false;

						Object.keys(userInfoRedundancyCheck).map((key, val) => {
							if (key === _device_owner) ownerExists = true;
						});

						if (!ownerExists) {
							userInfoRedundancyCheck[_device_owner] = {
								device: "doc.id",
								files: _files,
								dp: "",
							};

							getUser(_device_owner).then((user) => {
								userInfoRedundancyCheck[_device_owner] = {
									device: doc.id,
									files: _files,
									dp: user["dp"],
								};
							});
						}

						_all_device_files.push(_files);

						_all_device_files = [].concat.apply([], _all_device_files);
					});

					queryMultipleFiles(_all_device_files, userInfoRedundancyCheck, {
						isExternal: true,
					}).then((staged_files) => addFilesToStage(staged_files));
				}
			);
	}

	function queryMultipleFiles(fileArray, userInfoRedundancyCheck, options) {
		let pure_array = [];

		let file_deck = {};

		let sorted_file_deck = {};

		fileArray.map((e) => pure_array.push(e["fileId"]));

		function resolveDp(fileId) {
			let dp;

			Object.keys(userInfoRedundancyCheck).map((key, val) =>
				userInfoRedundancyCheck[key]["files"].map((e) => {
					if (e.fileId === fileId) dp = userInfoRedundancyCheck[key]["dp"];
				})
			);

			return dp;
		}

		return database
			.collection("files")
			.where(
				firebase.firestore.FieldPath.documentId(),
				"in",
				pure_array.slice(0, 10)
			)
			.get()
			.then((file_snapshot) => {
				console.log("%c file reads", "color:lightblue");

				file_snapshot.docs.forEach((eachFile) => {
					const _file_data = eachFile.data();

					if (options?.sortFiles) {
						Object.keys(fileArray).map((key) => {
							if (fileArray[key]["fileId"] === eachFile.id) {
								if (fileArray[key]["status"] === "staged") {
									sorted_file_deck["staged"] = {
										...sorted_file_deck["staged"],
										[`${eachFile.id}`]: {
											id: eachFile.id,
											type: _file_data?.["type"] ?? "image",
											link: _file_data?.["link"],
											date: _file_data?.["createdAt"],
											x: _file_data?.["x"],
											y: _file_data?.["y"],
											name: _file_data?.["name"],
											progress: 0,
											isExternal: options?.isExternal,
											FileStates: FileStates.STAGED,
											ownerDp: options?.isExternal && resolveDp(eachFile.id),
										},
									};
								}

								if (fileArray[key]["status"] === "stashed") {
									sorted_file_deck["stashed"] = {
										...sorted_file_deck["stashed"],
										[`${eachFile.id}`]: {
											id: eachFile.id,
											type: _file_data?.["type"] ?? "image",
											link: _file_data?.["link"],
											date: _file_data?.["createdAt"],
											x: _file_data?.["x"],
											y: _file_data?.["y"],
											name: _file_data?.["name"],
											progress: 0,
											isExternal: options?.isExternal,
											FileStates: FileStates.STASHED,
										},
									};
								}
							}
						});
					} else {
						file_deck[`${eachFile.id}`] = {
							id: eachFile.id,
							type: _file_data?.["type"] ?? "image",
							link: _file_data?.["link"],
							date: _file_data?.["createdAt"],
							x: _file_data?.["x"],
							y: _file_data?.["y"],
							name: _file_data?.["name"],
							progress: 0,
							isExternal: options?.isExternal,
							FileStates: FileStates.STAGED,
							ownerDp: options?.isExternal && resolveDp(eachFile.id),
						};
					}
				});

				return options?.sortFiles ? sorted_file_deck : file_deck;
			});
	}

	function closeWindow() {
		// const remote = window.require ? window.require("electron").remote : null;
		// const WIN = remote.getCurrentWindow();
		// WIN.close();
		// const remote = require("electron").remote;
		// let w = remote.getCurrentWindow();
		// w.close();
		// const { app } = require("electron");
		// app.exit(0);
	}

	function minimizeWindow() {
		// const remote = window.require ? window.require("electron").remote : null;
		// const WIN = remote.getCurrentWindow();
		// WIN.minimize();
	}

	return (
		<div className="stashpanel">
			{windowMenuVisible && (
				<div className="window-menu">
					<div className="window-menu-item" onClick={minimizeWindow}>
						<MinimizeIcon style={{ ..._x.menuItem, paddingBottom: 5 }} />
					</div>

					<div className="window-menu-item drag-window">
						<MenuIcon style={_x.menuItem} />
					</div>

					<div className="window-menu-item" onClick={closeWindow}>
						<CloseIcon style={_x.menuItem} />
					</div>
				</div>
			)}

			<Loader />

			{fileViewerOpen && <Viewer />}

			{isLoggedIn ? (
				<>
					<MenuBar />
					<Home />
					{settingsOpen && <Settings />}
				</>
			) : (
				<Onboarding />
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		userId: state.userId,
		activeCollection: state.collections.active.id,
		panelOnline: state.panelOnline,
		windowMenuVisible: state.windowMenuVisible,
		fileViewerOpen: state.fileViewerData.isOpen,
		settingsOpen: state.settings.isOpen,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		playAlert: (NotificationTypes) =>
			dispatch({
				type: DispatchCommands.PLAY_ALERT,
				payload: NotificationTypes,
			}),

		startLoader: (loadState) =>
			dispatch({
				type: DispatchCommands.START_LOADER,
				payload: loadState,
			}),

		stopLoader: () =>
			dispatch({
				type: DispatchCommands.STOP_LOADER,
			}),

		addFilesToStage: (files) =>
			dispatch({
				type: DispatchCommands.ADD_FILES_TO_STAGE,
				payload: files,
			}),

		addFilesToStash: (files) =>
			dispatch({
				type: DispatchCommands.ADD_FILES_TO_STASH,
				payload: files,
			}),

		clearStageAndStash: () =>
			dispatch({
				type: DispatchCommands.CLEAR_STASH_AND_STAGE,
			}),

		updateUserId: (id) =>
			dispatch({
				type: DispatchCommands.ADD_FILES_TO_STAGE,
				payload: id,
			}),

		toggleNetworkStatus: (isOnline) =>
			dispatch({
				type: DispatchCommands.TOGGLE_NETWORK_STATUS,
				payload: isOnline,
			}),

		updateSettings: (settings) =>
			dispatch({
				type: DispatchCommands.UPDATE_SETTINGS,
				payload: settings,
			}),

		updateUserDp: (dp) =>
			dispatch({
				type: DispatchCommands.UPDATE_USER_DP,
				payload: dp,
			}),

		closeViewer: () =>
			dispatch({
				type: DispatchCommands.CLOSE_FILE,
			}),

		updateCollection: (collectionType, payload) =>
			dispatch({
				type: DispatchCommands.UPDATE_COLLECTION,
				collectionType,
				payload,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StashPanel);

const _x = {
	menuItem: { color: "white", fontSize: 12 },
};
