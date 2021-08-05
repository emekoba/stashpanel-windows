import React, { useEffect, useState } from "react";
import "./viewer.css";
import ReactPlayer from "react-player/lazy";

export default function Viewer({ file, type, closeViewer }) {
	const [preview, setpreview] = useState("");

	useEffect(() => {
		if (file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (e) => setpreview(e.target.result);
		}
	}, []);

	function resolveFile() {
		switch (type) {
			case "image":
				return (
					<img src={preview} alt={file?.toString()} className="viewer-image" />
				);

			case "video":
				return (
					<ReactPlayer
						url={preview}
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
