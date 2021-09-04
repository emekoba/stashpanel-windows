import { Tooltip } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DispatchCommands, LoaderStates } from "../../Global/Globals";
import { AddIcon } from "../../Resources/Resources";
import { changeActiveCollection } from "../../Services/firebase.service";
import "./settings.css";

function Settings({
	collections,
	deviceId,
	preSettings,
	startLoader,
	stopLoader,
	closeSettings,
}) {
	useEffect(() => {
		document.body.onkeydown = (evt) => {
			evt = evt || window.event;
			if (evt.keyCode == 27) closeSettings();
		};
	}, []);

	function changeCollection() {
		startLoader(LoaderStates.LOADING);

		changeActiveCollection(deviceId, collections.active.id).then(() => {
			startLoader(LoaderStates.SUCCESS);
		});
	}

	function addNewCollection() {}

	return (
		<div className="settings hideScroll">
			<div className="settings-block1">
				<div className="settings-block1-row1">
					<div
						className="collection-box"
						style={{ background: `url(${collections.active.banner})` }}
					></div>

					<div>
						<div className="collection-txt">
							name:<span>{collections.active.name}</span>
						</div>

						<div className="collection-txt">
							collection id:<span>{collections.active.id}</span>
						</div>

						<div className="collection-txt">
							active members:<span>{collections.active.members.length}</span>
						</div>
					</div>
				</div>

				<div className="settings-block1-row2">
					<button className="collection-box">
						<AddIcon
							style={{
								color: "var(--glass)",
								fontSize: 50,
							}}
						/>
					</button>

					{collections.member.map((e) => {
						if (e.id !== collections.active.id)
							return (
								<Tooltip
									title={
										<div>
											<div>{e.name}</div>
										</div>
									}
								>
									<button
										className="collection-box"
										style={{ background: `url(${collections.active.banner})` }}
										onClick={changeCollection}
									/>
								</Tooltip>
							);
					})}
				</div>
			</div>

			{/*	<div className="settings-block3"></div>
			<div className="settings-block4"></div> */}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		deviceId: state.deviceId,
		collections: state.collections,
		preSettings: state.settings,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeSettings: () =>
			dispatch({
				type: DispatchCommands.CLOSE_SETTINGS,
			}),
		openSettings: () =>
			dispatch({
				type: DispatchCommands.OPEN_SETTINGS,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

//? change dp
//? change name
//? go to new collection
//? instantly preview file when dropped
