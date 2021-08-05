import { useEffect, useState } from "react";
import "./file.css";
import { CircularProgress, LinearProgress, Tooltip } from "@material-ui/core";
import { imageType, videoType, codeType } from "../../Resources/Resources";
import VideoThumbnail from "react-video-thumbnail";

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
	progress,
	openFile,
	openFileMenu,
	link,
}) {
	const [coordinates, setcoordinates] = useState({
		posX: posX,
		posY: posY,

		diffX: 50,
		diffY: 90,
	});

	const [boxsizes] = useState({
		video: { height: 100, width: 180 },
		photo: { height: 100, width: 100 },
		image: { height: 100, width: 100 },
	});

	const [showdetails, setshowdetails] = useState(false);

	const [optionsopen, setoptionsopen] = useState(false);

	const [preview, setpreview] = useState("");

	const _x = {
		file: {
			top: coordinates.posY - coordinates.diffY,
			left: coordinates.posX - coordinates.diffX,
			width: boxsizes[type]?.width ?? 100,
			height: boxsizes[type]?.height ?? 100,
		},

		archiveVariant: { position: "relative", margin: 6, marginLeft: 10 },

		file_type: {
			background: variant === "archive" ? "tomato" : "var(--dark-glass)",
			color: "white",
		},

		loader: {
			position: "absolute",
			bottom: -3,
			left: 0,
			width: boxsizes[type]?.width ?? 100,
		},

		date: {
			fontSize: 8,
		},

		progress: {
			position: "absolute",
			zIndex: "var(--file-loader-index)",
			top: -8,
			left: -8,
			// color: "blue",
		},
	};

	useEffect(() => {
		const files = document.getElementsByClassName("file");

		Array.from(files).forEach((file) => {
			file.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				event.stopPropagation();
				if (variant !== "archive") openFileMenu(file, type);
			});
		});
	}, []);

	useEffect(() => {
		if (variant === "archive") {
			setpreview(link);
		} else {
			if (file) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => setpreview(e.target.result);
			}
		}
	}, []);

	function resolveFilePreview() {
		switch (type) {
			case "image":
				return <img className="file-image" src={preview} />;

			case "video":
				let thumb_height = 90;
				let thumb_width = 85;

				return (
					<div
						style={{
							height: 90,
							width: 170,
							background: "var(--dark-glass)",
							background: "black",
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
						}}
					>
						{/* <div style={{ width: thumb_width, height: thumb_height }}>
							<VideoThumbnail
								videoUrl={preview}
								style={{ margin: 0 }}
								height={thumb_height}
								width={thumb_width}
							/>
						</div> */}

						{/* <div style={{ width: thumb_width, height: thumb_height }}></div>

						<div style={{ width: thumb_width, height: thumb_height }}></div> */}

						{/* <div style={{ width: thumb_width, height: thumb_height }}>
							<VideoThumbnail
								videoUrl={preview}
								style={{ margin: 0 }}
								height={thumb_height}
								snapshotAtTime={10}
								width={thumb_width}
							/>
						</div> */}
					</div>
				);

			default:
				return <img className="file-image" src={preview} />;
		}
	}

	function resolveIndicator() {
		switch (type) {
			case "image":
				return <img className="file-type-indicator" src={imageType} />;

			case "video":
				return <img className="file-type-indicator" src={videoType} />;

			default:
				return <img className="file-type-indicator" src={imageType} />;
		}
	}

	return (
		<Tooltip
			open={showdetails}
			title={
				<div>
					<div>{name}</div>
					<div style={{ ..._x.date, marginTop: 5 }}>{date?.toString()}</div>
				</div>
			}
		>
			<div
				className="file"
				style={{
					..._x.file,
					...(variant === "archive" ? _x.archiveVariant : null),
				}}
				onMouseEnter={() => setshowdetails(true)}
				onMouseLeave={() => setshowdetails(false)}
				onDoubleClick={(e) => {
					e.stopPropagation();

					if (variant !== "archive") openFile(file, type);
				}}
			>
				{progress !== 100 && (
					<CircularProgress
						style={_x.progress}
						size={25}
						variant="determinate"
						value={progress}
					/>
				)}

				{resolveIndicator()}

				{resolveFilePreview()}

				{optionsopen && <div className="file-options"></div>}
			</div>
		</Tooltip>
	);
}
