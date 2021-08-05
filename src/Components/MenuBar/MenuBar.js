import { useEffect, useState } from "react";
import "./menubar.css";
import { pr3, devices2, settings2 } from "../../Resources/Resources";

export default function MenuBar({ onClick }) {
	const [menuopen, setmenuopen] = useState(false);

	useEffect(() => {
		const bar = document.querySelector(".menubar");

		bar.style.animation = `${
			menuopen
				? "slide-from-left 0.5s forwards"
				: "slide-from-right 0.5s forwards"
		}`;

		setTimeout(
			() => {
				Array.from(bar.childNodes).map((each) => {
					each.style.display = `${menuopen ? "flex" : "none"}`;
				});
			},
			menuopen ? 500 : 100
		);

		setTimeout(() => {
			bar.style.display = `${menuopen ? "flex" : "none"}`;
		}, 250);
	}, [menuopen]);

	function onAvatarHovered() {}

	function avatarClicked() {
		setmenuopen(!menuopen);
	}

	function onMenubarHover() {
		setmenuopen(true);
	}

	function onMenubarLeave() {
		setmenuopen(false);
	}

	return (
		<div className="menubar-container">
			<div
				className="menubar"
				onMouseEnter={onMenubarHover}
				onMouseLeave={onMenubarLeave}
			>
				<img alt="" src={devices2} className="menubar-item bounce-on-click" />

				<img alt="" src={devices2} className="menubar-item bounce-on-click" />

				<img alt="" src={devices2} className="menubar-item bounce-on-click" />

				<img alt="" src={settings2} className="menubar-item bounce-on-click" />
			</div>

			<img
				alt=""
				// onClick={avatarClicked}
				alt=""
				className="avatar glass"
				src={pr3}
				onMouseEnter={onMenubarHover}
				onMouseLeave={onMenubarLeave}
			/>
		</div>
	);
}

{
	/* <img alt="" src={drag2} className="menubar-item drag-window grabbable" />; */
}
