import React, { useEffect } from "react";
import File from "../../Components/File/File";
import "./dashbaord.css";

export default function Dashboard() {
	useEffect(() => {
		//? get history from firbase.....
	}, []);

	const date = new Date();

	return (
		<div className="dashboard">
			<div className="date-stamp">{date.toString()}</div>

			<div className="archive-column">
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
			</div>
		</div>
	);
}

{
	/* <legend aria-valuetext="russell" />
				degfuhijokpl[k] */
}
