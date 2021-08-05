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
	pr1,
	pr2,
	pr3,
} from "../../Resources/Resources";
import Archive from "../Archive/Archive";
import Viewer from "../Viewer/Viewer";
import FileOptionsMenu from "../../Components/FileOptionsMenu/FileOptionsMenu";
import TextEditor from "../TextEditor/TextEditor";

export default function Home({ archiveOpen }) {
	const [filepins, setfilepins] = useState({
		//"prism": {
		// 	x: 220,
		// 	y: 220,
		// 	name: "russell",
		// 	date: "02-20-2021",
		// 	file: pr1,
		// 	type: "image",
		// },
	});

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
		delete filepins[name];
		setfilepins({ ...filepins });
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
		setfilepins({});
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

	return (
		<div className="home-superior">
			{/* <img
				src={filepins[0]?.file}
				style={{ marginLeft: 100, height: 200, width: 200 }}
			/> */}

			<UploadPanel pins={filepins} setpins={setfilepins}>
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

						{Object.keys(filepins).map((key, _) => (
							<File
								key={filepins[key].name}
								name={filepins[key].name}
								date={filepins[key].date}
								type={filepins[key].type}
								posX={filepins[key].x}
								posY={filepins[key].y}
								file={filepins[key].file}
								path={filepins[key].path}
								removeFile={removeFile}
								progress={filepins[key].progress}
								openFile={openFile}
								openFileMenu={openFileMenu}
							/>
						))}

						{homemenu.isOpen && (
							<div
								className="home-menu"
								style={{ top: homemenu.y, left: homemenu.x }}
							>
								{homemenu.buttons.map((e) => (
									<button
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

			<Archive />
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
		// 11: bg12,
		12: bg13,
		// 13: bg14,
		// 14: bg15,
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
