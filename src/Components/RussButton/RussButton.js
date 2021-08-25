import { Button } from "@material-ui/core";
import { useStyles } from "./RussButton.style";

export default function RussButton({ label, onClick, width, height, type }) {
	const classes = useStyles();

	return (
		<>
			{true ? (
				<Button
					type={type ?? "submit"}
					fullWidth
					variant="contained"
					color="primary"
					disableElevation
					className={classes.submit}
					mb={1}
					onClick={onClick}
				>
					{label}
				</Button>
			) : (
				<button onClick={onClick} style={{ ..._x.button }}>
					{label}
				</button>
			)}
		</>
	);
}

const _x = {
	button: {
		height: 30,
		// width: "100%",
		background: "var(--theme)",
		color: "white",
		fontSize: 12,
	},
};
