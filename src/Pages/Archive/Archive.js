import React, { useEffect } from "react";
import File from "../../Components/File/File";
import "./archive.css";

export default function Archive() {
	useEffect(() => {
		//? get history from firbase.....
	}, []);

	const date = new Date();

	return (
		<div className="archive">
			<div className="date-stamp">{date.toString()}</div>

			<div className="archive-column">
				<File variant="archive" name="russ" type="photo" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="photo" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="photo" />
				<File variant="archive" name="russ" type="video" />
				<File variant="archive" name="russ" type="photo" />
			</div>
		</div>
	);
}

{
	/* <legend aria-valuetext="russell" />
				degfuhijokpl[k] */
}
