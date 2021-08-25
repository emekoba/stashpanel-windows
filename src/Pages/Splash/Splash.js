import React from "react";

export default function Splash() {
	return (
		<div style={_x.splash}>
			<div style={_x.logo}>Stash Panel</div>
		</div>
	);
}

const _x = {
	splash: {
		background: "white",
		height: "100%",
		width: "100%",
		display: "grid",
		placeItems: "center",
	},

	logo: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
	},
};
