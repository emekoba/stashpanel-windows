import React, { useEffect } from "react";
import "./viewer.css";
import ReactPlayer from "react-player/lazy";

export default function Viewer({ file, type, closeViewer }) {
	useEffect(() => {
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			if (evt.keyCode == 27) closeViewer();
		};
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
