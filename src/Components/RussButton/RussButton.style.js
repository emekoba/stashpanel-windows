import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	submit: {
		marginTop: "1em",
		height: "40px",
		textTransform: "initial",
		fontSize: "1.1em",
		fontWeight: 600,
		fontFamily: "Avenir",
		"&:hover": {
			backgroundColor: "#70CAEB",
		},
	},
}));

export { useStyles };
