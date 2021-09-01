import React, { useEffect } from "react";
import "./viewer.css";
import ReactPlayer from "react-player/lazy";
import { connect } from "react-redux";
import { DispatchCommands } from "../../Global/Globals";

function Viewer({ file, type, closeViewer, hideWindowMenu, showWindowMenu }) {
	useEffect(() => {
		hideWindowMenu();
		return () => showWindowMenu();
	}, []);

	function resolveFile() {
		switch (type) {
			case "image":
				return (
					<img src={file} alt={file?.toString()} className="viewer-image" />
				);

			case "video":
				return (
					<ReactPlayer
						url={file}
						controls
						width={"100%"}
						height={"100%"}
						config={{
							attributes: {
								controlsList: "nodownload nofullscreen noremoteplayback",
								disablepictureinpicture: true, //<- this is the important bit
							},
						}}
						playing={true}
						pip={false}
					/>
				);

			default:
				break;
		}
	}

	return (
		<div
			id="viewer"
			className="viewer"
			onClick={(e) => {
				e.stopPropagation();
				closeViewer();
			}}
		>
			{resolveFile()}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		file: state.fileViewerData.file,
		type: state.fileViewerData.type,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeViewer: () =>
			dispatch({
				type: DispatchCommands.CLOSE_FILE,
			}),

		hideWindowMenu: () =>
			dispatch({
				type: DispatchCommands.HIDE_WINDOW_MENU,
			}),

		showWindowMenu: () =>
			dispatch({
				type: DispatchCommands.SHOW_WINDOW_MENU,
			}),

		showWindowMenu: () =>
			dispatch({
				type: DispatchCommands.SHOW_WINDOW_MENU,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
