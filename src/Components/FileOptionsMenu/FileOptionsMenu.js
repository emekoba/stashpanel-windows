import React, { useEffect } from "react";
import "./fileoptionsmenu.css";
import { delete_icon, stash } from "../../Resources/Resources";
import { Tooltip } from "@material-ui/core";

export default function FileOptionsMenu({ isOpen, menuItemPressed }) {
	const menuBtns = {
		Delete: {
			icon: delete_icon,
		},

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
	};

	useEffect(() => {
		const menu = document.querySelector(".file-options-menu");

		menu.style.animation = `${
			isOpen
				? "open-menu-animation 0.5s forwards"
				: "close-menu-animation 0.5s forwards"
		}`;

		setTimeout(
			() => {
				Array.from(menu.childNodes).map((each) => {
					each.style.display = `${isOpen ? "flex" : "none"}`;
				});
			},
			isOpen ? 400 : 0
		);

		setTimeout(() => {
			menu.style.display = `${isOpen ? "flex" : "none"}`;
		}, 350);
	}, [isOpen]);

	return (
		<div className="file-options-menu" onClick={(e) => e.stopPropagation()}>
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
