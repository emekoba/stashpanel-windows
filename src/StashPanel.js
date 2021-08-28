import "./stashpanel.css";
import Home from "./Pages/Home/Home";
import MenuBar from "./Components/MenuBar/MenuBar";
import { CloseIcon, MenuIcon, MinimizeIcon } from "./Resources/Resources";
import firebase, { database, getUser } from "./Services/firebase.service";
import { useEffect, useState } from "react";
import Onboarding from "./Pages/Onboarding/Onboarding";
import Loader, { LoaderState } from "./Components/Loader/Loader";
import { DispatchCommands, FileState } from "./Global/Globals";
import { connect } from "react-redux";

function StashPanel({
	userId,
	collectionId,
	startLoader,
	stopLoader,
	updateUserId,
	addFilesToStage,
	addFilesToStash,
	clearStageAndStash,
	panelOnline,
	toggleNetworkStatus,
	updateSettings,
	addUserDp,
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//! use whatsapp alert for stashpanel alerts when new file is staged.........

	useEffect(() => {
		if (isLoggedIn) {
			if (!panelOnline) {
				console.log("%c panel online", "color:limegreen");

				startLoader(LoaderState.LOADING);

				database
					.collection("panel-collections")
					.doc(collectionId)
					.get()
					.then((doc) => {
						console.log(
							"%c panel collection reads (for mine and other devices)",
							"color:lightblue"
						);

						const all_other_users = [];

						if (doc.data()) {
							const _other_users = doc
								.data()
								.members.filter((e) => e !== userId);
							_other_users.map((each_user) => all_other_users.push(each_user));
						}

						fetchOtherUsersDevices(all_other_users);
					});

				fetchMyDevice(userId);
			} else {
				console.log("%c panel offline", "color:tomato");

				startLoader(LoaderState.OFFLINE);
			}
		}
	}, [collectionId, panelOnline, isLoggedIn]);

	useEffect(() => {
		firebase?.auth().onAuthStateChanged((user) => {
			if (user) {
				updateUserId(user.uid);
				getUser(user.uid).then((userInfo) => addUserDp(userInfo["dp"]));

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

		window.addEventListener("online", () => {
			console.log(true);

			toggleNetworkStatus(true);
		});

		window.addEventListener("offline", () => {
			console.log(false);

			toggleNetworkStatus(false);
		});
	}, []);

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

					console.log(userInfoRedundancyCheck);

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
											fileState: FileState.STAGED,
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
											fileState: FileState.STASHED,
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
							fileState: FileState.STAGED,
							ownerDp: options?.isExternal && resolveDp(eachFile.id),
						};
					}
				});

				return options?.sortFiles ? sorted_file_deck : file_deck;
			});
	}

	return (
		<div className="stashpanel">
			<div className="window-menu">
				<div className="window-menu-item">
					<MinimizeIcon style={{ ..._x.menuItem, paddingBottom: 5 }} />
				</div>

				<div className="window-menu-item drag-window">
					<MenuIcon style={_x.menuItem} />
				</div>

				<div className="window-menu-item">
					<CloseIcon style={_x.menuItem} />
				</div>
			</div>

			<Loader />

			{isLoggedIn ? (
				<>
					<MenuBar />
					<Home />
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
		collectionId: state.collectionId,
		panelOnline: state.panelOnline,
	};
}

function mapDispatchToProps(dispatch) {
	return {
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

		addUserDp: (dp) =>
			dispatch({
				type: DispatchCommands.ADD_USER_DP,
				payload: dp,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StashPanel);

const _x = {
	menuItem: { color: "white", fontSize: 12 },
};
