import { createRef, useEffect, useState } from "react";
import "./home.css";
import Tilt from "react-parallax-tilt";
import File from "../../Components/File/File";
import UploadPanel from "../../Components/UploadPanel/UploadPanel";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
	bg1,
	bg2,
	bg3,
	bg4,
	bg5,
	bg6,
	bg7,
	bg8,
	bg9,
	bg10,
	bg11,
	bg12,
	bg13,
	bg14,
	bg15,
	bg16,
	bg17,
	bg18,
	bg19,
	bg20,
} from "../../Resources/Resources";
import Stash from "../Stash/Stash";
import Viewer from "../Viewer/Viewer";
import FileOptionsMenu from "../../Components/FileOptionsMenu/FileOptionsMenu";
import TextEditor from "../TextEditor/TextEditor";
import Settings from "../Settings/Settings";
import { connect } from "react-redux";
import { DispatchCommands } from "../../State/GlobalReducer";

function Home({ homeDb, addFilesToStage, removeFileFromStage }) {
	const [tilting, settilting] = useState(false);

	const [filemenu, setfilemenu] = useState({
		isOpen: false,
		file: "",
		type: "",
	});

	const [viewer, setviewer] = useState({
		isOpen: false,
		file: "",
		type: "",
	});

	const [homemenu, sethomemenu] = useState({
		isOpen: false,
		x: 0,
		y: 0,
		buttons: ["Paste", "Stash All", "Change Background"],
	});

	const [texteditor, settexteditor] = useState({ isOpen: false });

	const [showsettings, setshowsettings] = useState(false);

	const [firstReorder, setFirstReorder] = useState(true);

	const slideControl = createRef();

	useEffect(() => {
		const home = document.getElementById("home");

		document.body.addEventListener(
			"keydown",
			(ev) => {
				ev = ev || window.event;
				let key = ev.which || ev.keyCode;

				let ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;

				if (key == 86 && ctrl) {
					openTextEditor();
				} else if (key == 67 && ctrl) {
					// If key pressed is C and if ctrl is true.
					console.log("Ctrl+C is pressed.");

					closeTextEditor();
				}
			},
			false
		);

		home.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			openHomeMenu(event.clientX, event.clientY);
		});
	}, []);

	useEffect(() => {
		// if (firstReorder) {
		// 	readjustFilePosition(filepins);
		// }
		// window.addEventListener("resize", () => readjustFilePosition(homeDb));
		// return () => {
		// 	window.removeEventListener("resize", () => readjustFilePosition(homeDb));
		// };
	}, []);

	// window.addEventListener("resize", () => readjustFilePosition(homeDb));

	function openHomeMenu(x, y) {
		if (!texteditor.isOpen) {
			sethomemenu({ ...homemenu, isOpen: true, x: x, y: y });
		}
	}

	function closeHomeMenu() {
		sethomemenu({ ...homemenu, isOpen: false });
	}

	function openTextEditor() {
		settexteditor({ ...texteditor, isOpen: true });
	}

	function closeTextEditor() {
		settexteditor({ ...texteditor, isOpen: false });
	}

	function removeFile(name) {
		removeFileFromStage(name);
	}

	function openFile(file, type) {
		setviewer({ ...viewer, isOpen: true, file: file, type: type });
	}

	function openFileMenu(file, type) {
		if (homemenu.isOpen) sethomemenu({ ...homemenu, isOpen: false });

		setfilemenu({ ...filemenu, isOpen: true, file: file, type: type });
	}

	function closeFileMenu() {
		setfilemenu({ ...filemenu, isOpen: false });
	}

	function stashAllFiles() {
		//? take all files and store them in the stash obj and clear stage obj
	}

	function onFileMenuItemPressed(action) {
		setfilemenu({ ...filemenu, isOpen: false });

		switch (action) {
			case "Delete":
				break;

			default:
				break;
		}
	}

	function onHomeMenuPressed(action) {
		closeHomeMenu();

		switch (action) {
			case "Stash All":
				stashAllFiles();
				break;

			case "Paste":
				openTextEditor();
				break;

			case "Change Background":
				slideControl.current.goNext();
				break;

			default:
				break;
		}
	}

	function onHomeClicked() {
		closeFileMenu();
		closeHomeMenu();
	}

	function readjustFilePosition(all_pins) {
		const winX = window.innerWidth;
		const winY = window.innerHeight;

		const fileSize = 100;

		const diffX = 50;
		const diffY = 90;

		const adjustmentX = 95;
		const adjustmentY = 95;

		Object.keys(all_pins).map((key, _) => {
			const fileCoordinateX = all_pins[key]["x"];
			const fileCoordinateY = all_pins[key]["y"];

			const fileBodyX = fileCoordinateX - diffX + fileSize;
			const fileBodyY = fileCoordinateY - diffY + fileSize;

			let finalFileBodyX;
			let finalFileBodyY;

			if (winX > fileBodyX) {
				console.log("%c files X axis is visible", "color:lightgreen");
			} else {
				console.log("%c files X axis is obscured", "color:orange");

				finalFileBodyX = fileCoordinateX + adjustmentX - fileSize;

				all_pins[key]["x"] = finalFileBodyX;

				addFilesToStage(all_pins);
			}

			if (winY > fileBodyY) {
				console.log("%c files Y axis is visible", "color:lightgreen");
			} else {
				console.log("%c files Y axis is obscured", "color:orange");

				finalFileBodyY = fileCoordinateY + adjustmentY - fileSize;

				all_pins[key]["y"] = finalFileBodyY;

				addFilesToStage(all_pins);
			}
		});

		// if (firstReorder) setFirstReorder(false);
		// window.removeEventListener("resize", () => readjustFilePosition(homeDb));
	}

	return (
		<div className="home-superior">
			{showsettings && <Settings />}

			<UploadPanel>
				<Tilt
					tiltEnable={tilting}
					perspective={10000}
					tiltMaxAngleX={8}
					tiltMaxAngleY={8}
					transitionSpeed={100}
				>
					<div id="home" className="home" onClick={onHomeClicked}>
						<Slides slideControl={slideControl} />

						{/* <img style={{ height: "100vh" }} src={bg8} className="home-bg" /> */}

						{Object.keys(homeDb).map((key, _) => (
							<File
								id={homeDb[key]?.id}
								key={homeDb[key]?.name}
								name={homeDb[key]?.name}
								date={homeDb[key]?.date}
								type={homeDb[key]?.type}
								posX={homeDb[key]?.x}
								posY={homeDb[key]?.y}
								file={homeDb[key]?.file}
								link={homeDb[key]?.link}
								path={homeDb[key]?.path}
								removeFile={removeFile}
								progress={homeDb[key]?.progress}
								openFile={openFile}
								openFileMenu={openFileMenu}
								isExternal={homeDb[key]?.isExternal}
								fileState={homeDb[key]?.fileState}
							/>
						))}

						{homemenu.isOpen && (
							<div
								className="home-menu"
								style={{ top: homemenu.y, left: homemenu.x }}
							>
								{homemenu.buttons.map((e) => (
									<button
										key={e}
										className="home-menu-item"
										onClick={() => onHomeMenuPressed(e)}
									>
										{e}
									</button>
								))}
							</div>
						)}

						<TextEditor isOpen={texteditor.isOpen} />

						<FileOptionsMenu
							isOpen={filemenu.isOpen}
							file={filemenu.file}
							type={filemenu.type}
							menuItemPressed={onFileMenuItemPressed}
						/>

						{viewer.isOpen && (
							<Viewer
								file={viewer.file}
								type={viewer.type}
								closeViewer={() => setviewer({ ...viewer, isOpen: false })}
							/>
						)}
					</div>
				</Tilt>
			</UploadPanel>

			<Stash />
		</div>
	);
}

function Slides({ slideControl }) {
	const bgImages = {
		// 0: bg1,
		// 1: bg2,
		// 2: bg3,
		// 3: bg4,
		// 4: bg5,
		5: bg6,
		// 6: bg7,
		// 7: bg8,
		8: bg9,
		9: bg10,
		// 10: bg11,
		11: bg12,
		12: bg13,
		// 13: bg14,
		// 14: bg15,
		15: bg16,
		// 16: bg17,
		// 17: bg18,
		18: bg19,
		19: bg20,
	};

	return (
		<Fade
			ref={slideControl}
			indicators={false}
			arrows={false}
			duration={1000000}
			transitionDuration={2000}
			pauseOnHover={false}
			canSwipe={false}
		>
			{Object.keys(bgImages).map((key, _) => (
				<div key={key} className="each-fade" style={{ height: "100vh" }}>
					<img src={bgImages[key]} className="home-bg" />
				</div>
			))}
		</Fade>
	);
}

function mapStateToProps(state) {
	return {
		homeDb: state.stage,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addFilesToStage: (files) => {
			dispatch({
				type: DispatchCommands.ADD_FILES_TO_STAGE,
				payload: files,
			});
		},

		removeFileFromStage: (file) => {
			dispatch({
				type: DispatchCommands.REMOVE_FILE_FROM_STASH,
				payload: file,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
