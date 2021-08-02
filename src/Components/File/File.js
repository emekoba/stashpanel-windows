import { useState } from "react";
import "./file.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function File({
	variant,
	name,
	posX,
	posY,
	date,
	type,
	file,
	path,
	removeFile,
}) {
	const [coordinates, setcoordinates] = useState({
		posX: posX,
		posY: posY,

		diffX: 50,
		diffY: 90,
	});

	const _x = {
		file: {
			top: coordinates.posY - coordinates.diffY,
			left: coordinates.posX - coordinates.diffX,
		},

		archiveVariant: { position: "relative", margin: 6, marginLeft: 10 },

		file_type: {
			background: variant === "archive" ? "tomato" : "#1a1a1a",
			color: "white",
		},
	};

	// console.log(file);

	//? add tooltip that shows extra info of the file on hover.....
	//?

	return (
		<div
			className={`file glass ${type}-type`}
			style={{
				..._x.file,
				...(variant === "archive" ? _x.archiveVariant : null),
			}}
			onDoubleClick={() => (variant === "archive" ? null : removeFile(name))}
		>
			<div className="file-type-indicator" style={_x.file_type}>
				{type}
			</div>

			<img className="file-image" src={file} />

			{/* <div className="file-options"></div> */}

			<div className="file-loading">
				{/* <CircularProgressbar value={66} /> */}
			</div>
		</div>
	);
}
