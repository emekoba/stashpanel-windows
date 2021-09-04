import { useEffect, useState } from "react";
import "./file.css";
import { CircularProgress, Tooltip } from "@material-ui/core";
import { imageType, videoType, codeType } from "../../Resources/Resources";
import VideoThumbnail from "react-video-thumbnail";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { connect } from "react-redux";
import {
	HomeViewTypes,
	FileStates,
	DispatchCommands,
	ColorWheel,
} from "../../Global/Globals";

function File({
	id,
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
	isExternal,
	fileState,
	ownerDp,
	homeViewType,
}) {
	const [coordinates, setcoordinates] = useState({
		posX: posX,
		posY: posY,

		diffX: 50,
		diffY: 90,
	});

	const [boxtypes] = useState({
		video: { height: 100, width: 180, anim: "-video" },
		photo: { height: 100, width: 100, anim: "-image" },
		image: { height: 100, width: 100, anim: "-image" },
	});

	const [showdraghandle, setshowdraghandle] = useState(false);

	const [preview, setpreview] = useState("");

	const _x = {
		file: {
			...(homeViewType === HomeViewTypes.GRID
				? {
						position: "relative",
						marginRight: 20,
						marginBottom: 20,
				  }
				: {
						position: "absolute",
						top: coordinates.posY - coordinates.diffY,
						left: coordinates.posX - coordinates.diffX,
				  }),

			// top: coordinates.posY * 0.01 + "%",
			// left: coordinates.posX * 0.112 + "%",

			width: boxtypes[type]?.width ?? 100,
			height: boxtypes[type]?.height ?? 100,
			background: isExternal ? "var(--orange-glass)" : "var(--glass)",
			// background: isExternal
			// 	? ColorWheel[Math.floor(Math.random() * ColorWheel.length)]
			// 	: "var(--glass)",
		},

		archiveVariant: { position: "relative", margin: 6, marginLeft: 10 },

		file_type: {
			background:
				fileState === FileStates.STASHED ? "tomato" : "var(--dark-glass)",
			color: "white",
		},

		loader: {
			position: "absolute",
			bottom: -3,
			left: 0,
			width: boxtypes[type]?.width ?? 100,
		},

		date: {
			fontSize: 8,
		},

		progress: {
			position: "absolute",
			zIndex: "var(--file-loader-index)",
			top: -8,
			left: -8,
			color: !progress ? "tomato" : "blue",
		},
	};

	useEffect(() => {
		const files = document.getElementsByClassName("file");

		Array.from(files).forEach((file) => {
			file.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				event.stopPropagation();
				if (fileState !== FileStates.STASHED) openFileMenu?.(file, type);
			});
		});
	}, []);

	useEffect(() => {
		if (link) {
			setpreview(link);
		}

		if (file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (e) => setpreview(e.target.result);
		}
	}, []);

	useEffect(() => {
		const file_body = document.getElementById(id);

		const _rand = Math.random() * 2;

		if (file_body) {
			if (homeViewType === HomeViewTypes.GRID)
				file_body.style.animation = `file-slide-in-animation ${_rand}s forwards`;
			else if (fileState === FileStates.STAGED)
				file_body.style.animation = `file-bounce-in-animation ${_rand}s forwards`;
		}
	}, [homeViewType]);

	useEffect(
		() => setcoordinates({ ...coordinates, posX: posX, posY: posY }),
		[posX, posY]
	);

	function resolveFilePreview() {
		switch (type) {
			case "image":
				return <img className="file-image" src={preview} alt={type} />;

			case "video":
				let thumb_height = 90;
				let thumb_width = 85;

				return (
					<div
						className="file-video"
						style={{
							height: 90,
							width: 170,
							// background: "var(--dark-glass)",
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
				return <img className="file-image" src={preview} alt={type} />;
		}
	}

	function resolveIndicator() {
		switch (type) {
			case "image":
				return (
					<img className="file-type-indicator" src={imageType} alt={type} />
				);

			case "video":
				return (
					<img className="file-type-indicator" src={videoType} alt={type} />
				);

			default:
				return (
					<img className="file-type-indicator" src={imageType} alt={type} />
				);
		}
	}

	function onMouseEnter() {
		setshowdraghandle(true);
	}

	function onMouseLeave() {
		setshowdraghandle(false);
	}

	return (
		<Tooltip
			title={
				<div>
					<div>{name}</div>
					{date && (
						<div style={{ ..._x.date, marginTop: 5 }}>{date?.toString()}</div>
					)}
				</div>
			}
		>
			<div
				id={id}
				className="file"
				style={{
					..._x.file,
					...(fileState === FileStates.STASHED ? _x.archiveVariant : null),
				}}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onDoubleClick={(e) => {
					e.stopPropagation();
					openFile(preview, type);
				}}
			>
				<CircularProgress
					style={_x.progress}
					size={25}
					variant="determinate"
					value={progress}
				/>

				{resolveIndicator()}

				{resolveFilePreview()}

				{isExternal && <img className="user-indicator" src={ownerDp} />}

				{showdraghandle && homeViewType === HomeViewTypes.ROAM && (
					<div className="file-drag-handle">
						<DragIndicatorIcon style={{ color: "white", fontSize: 10 }} />
					</div>
				)}
			</div>
		</Tooltip>
	);
}

function mapStateToProps(state) {
	return {
		homeViewType: state.homeView,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openFile: (file, type) =>
			dispatch({
				type: DispatchCommands.OPEN_FILE,
				payload: {
					file,
					type,
				},
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(File);
