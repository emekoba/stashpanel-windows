import React, { useEffect } from "react";
import "./fileoptionsmenu.css";
import { delete_icon, stash } from "../../Resources/Resources";
import { Tooltip } from "@material-ui/core";

export default function FileOptionsMenu({ isOpen, menuItemPressed }) {
	const menuBtns = {
		Stash: {
			icon: stash,
		},

		Stage: {
			//? will stage file when instant stage is on.
			icon: stash,
		},

		UnStage: {
			icon: stash,
		},

		Delete: {
			icon: delete_icon,
		},
	};

	useEffect(() => {
		const menu = document.querySelector(".file-options-menu-main-body");

		menu.style.animation = `${
			isOpen
				? "open-menu-animation 0.5s forwards"
				: "close-menu-animation 0.5s forwards"
		}`;

		if (!isOpen) {
			Array.from(menu.childNodes).map(
				(each) =>
					(each.style.animation = "file-menu-inner-animation 0.1s forwards")
			);
		}

		setTimeout(() => (menu.style.display = `${isOpen ? "flex" : "none"}`), 400);
	}, [isOpen]);

	return (
		<div
			className="file-options-menu-cntr"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="file-options-menu-main-body">
				{Object.keys(menuBtns).map((key) => (
					<Tooltip key={key} placement="left" title={<div>{key}</div>}>
						<img
							style={_x.menuItem}
							src={menuBtns[key].icon}
							onClick={() => menuItemPressed(key)}
							alt={key}
						/>
					</Tooltip>
				))}
			</div>
		</div>
	);
}

const _x = {
	menuItem: {
		color: "white",
		width: 25,
		cursor: "pointer",
		marginBottom: 20,
	},
};
