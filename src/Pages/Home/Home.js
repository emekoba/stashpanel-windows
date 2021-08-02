import { useState } from "react";
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
	close,
	down,
} from "../../Resources/Resources";
import Archive from "../Archive/Archive";

export default function Home({ archiveOpen }) {
	const [filepins, setfilepins] = useState([
		// {
		// 	x: 220,
		// 	y: 220,
		// 	name: "russell",
		// 	date: "02-20-2021",
		// 	file: pr1,
		// 	type: "image",
		// },
	]);

	const [tilting, settilting] = useState(false);

	function removeFile(name) {
		setfilepins(filepins.filter((e) => e.name != name));
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
					<div className="home">
						<Slides />

						{/* <img style={{ height: "100vh" }} src={bg8} className="home-bg" /> */}

						{filepins.map((e) => (
							<File
								key={e.name}
								name={e.name}
								date={e.date}
								type={e.type}
								posX={e.x}
								posY={e.y}
								file={e.file}
								path={e.path}
								removeFile={removeFile}
							/>
						))}
					</div>
				</Tilt>
			</UploadPanel>

			<Archive />
		</div>
	);
}

function Slides() {
	const bgImages = {
		// 0: bg1,
		// 1: bg2,
		// 2: bg3,
		// 3: bg4,
		4: bg5,
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
