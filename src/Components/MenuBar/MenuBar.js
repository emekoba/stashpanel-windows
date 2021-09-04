import { useEffect, useRef, useState } from "react";
import "./menubar.css";
import {
	devices2,
	settings2,
	gridview,
	DefaultPr,
	note1,
} from "../../Resources/Resources";
import { connect } from "react-redux";
import { DispatchCommands } from "../../Global/Globals";
import { updateUsersCollection } from "../../Services/firebase.service";

function MenuBar({
	userId,
	userDp,
	windowMenuVisible,
	toggleHomeViewTypes,
	updateUserDp,
	triggerPopup,
	openSettings,
}) {
	const [menuopen, setmenuopen] = useState(false);

	const fileInputRef = useRef();

	useEffect(() => {
		const bar = document.querySelector(".menubar");

		bar.style.animation = `${
			menuopen
				? "slide-from-left 0.3s forwards"
				: "slide-from-right 0.5s forwards"
		}`;

		setTimeout(
			() => {
				Array.from(bar.childNodes).map((each) => {
					each.style.display = `${menuopen ? "flex" : "none"}`;
				});
			},
			menuopen ? 500 : 100
		);

		setTimeout(() => {
			bar.style.display = `${menuopen ? "flex" : "none"}`;
		}, 180);
	}, [menuopen]);

	function onAvatarHovered() {}

	function onMenubarHover() {
		setmenuopen(true);
	}

	function onMenubarLeave() {
		setmenuopen(false);
	}

	function changeDp(evt) {
		const file = evt.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (e) => {
				updateUsersCollection(null, null, null, userId, e.target.result);
				updateUserDp(e.target.result);
			};
		} else {
			triggerPopup({ type: "error", message: "could not update dp" });
		}
	}

	return (
		<div
			className="menubar-container"
			style={{ visibility: windowMenuVisible ? "visible" : "hidden" }}
		>
			<div
				className="menubar"
				onMouseEnter={onMenubarHover}
				onMouseLeave={onMenubarLeave}
			>
				<img alt="" src={devices2} className="menubar-item bounce-on-click" />

				<img alt="" src={note1} className="menubar-item bounce-on-click" />

				<img
					alt=""
					src={gridview}
					className="menubar-item bounce-on-click"
					style={{ width: 23 }}
					onClick={toggleHomeViewTypes}
				/>

				<img
					alt=""
					src={settings2}
					className="menubar-item bounce-on-click"
					onClick={openSettings}
				/>
			</div>

			<div>
				<img
					alt={userDp?.toString()}
					className="avatar glass"
					src={userDp || DefaultPr}
					onMouseEnter={onMenubarHover}
					onMouseLeave={onMenubarLeave}
					onClick={() => fileInputRef.current.click()}
				/>

				<input
					onChange={changeDp}
					ref={fileInputRef}
					type="file"
					style={{ visibility: "hidden" }}
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		userId: state.userId,
		userDp: state.userDp,
		windowMenuVisible: state.windowMenuVisible,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleHomeViewTypes: () =>
			dispatch({
				type: DispatchCommands.TOGGLE_HOME_VIEW_TYPE,
			}),

		updateUserDp: (dp) =>
			dispatch({
				type: DispatchCommands.UPDATE_USER_DP,
				payload: dp,
			}),

		triggerPopup: (options) =>
			dispatch({
				type: DispatchCommands.TOGGLE_HOME_VIEW_TYPE,
				payload: options,
			}),

		openSettings: () =>
			dispatch({
				type: DispatchCommands.OPEN_SETTINGS,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

{
	/* <img alt="" src={drag2} className="menubar-item drag-window grabbable" />; */
}
