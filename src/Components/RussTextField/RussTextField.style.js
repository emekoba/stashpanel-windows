import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	notchedOutline: {
		borderColor: theme.palette.borderColor.main,
		borderRadius: 0,
		paddingTop: 13,
		paddingBottom: 13,
	},
	inputWrapper: {
		fontSize: 15,
		"& label": {
			fontSize: 14,
			paddingTop: 5,
		},
		"& input": {
			fontSize: 14,
			fontWeight: "600",
			padding: 15,
		},
	},
	focusedLabel: {
		// color: "#293146 !important",
		color: "#303c47 !important",
		borderWidth: "1px !important",
	},
	verificationBox: {
		border: "1px solid",
		marginRight: 10,
	},
	ver_focused: {
		border: "none",
	},
	ver_item: {
		textAlign: "center",
		fontWeight: "bold",
	},
}));

export { useStyles };
