import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				backgroundColor: "var(--dark-glass)",
			},
		},
	},
	icon: {
		// '&& > svg': {
		//   fontSize: 27,
		// },
		margin: 0,
	},
	typography: {
		button: {
			textTransform: "none",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
			lgCustom: 1200,
		},
	},
	palette: {
		white: { main: "#fff" },
		primary: { main: "#105FFB" },
		backgroundBlendColor: { main: "#0535B7" },
		fadePrimary: { main: "#E6F1FB" },
		secondary: { main: "#FD6920" },
		secondary2: { main: "#FECF8D" },
		textColor: { main: "#293146" },
		textColor2: { main: "#303C47" },
		textColor3: { main: "#2F3C47" },
		greyColor6: { main: "#E0E0E0" },
		greyColor5: { main: "#A6AAB4" },
		lightGrey: { main: "#F4F5F9" },
		borderColor: { main: "#303C479e" },
		placeHolderColor: { main: "#95A4B3" },
	},
});
