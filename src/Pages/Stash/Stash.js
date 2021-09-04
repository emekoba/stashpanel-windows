import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import File from "../../Components/File/File";
import "./stash.css";

function Stash({ stashDb }) {
	const [stash, setstash] = useState(stashDb);

	const date = new Date();

	useEffect(() => setstash(stashDb), [stashDb]);

	return (
		<div className="archive">
			<div className="archive-header">My Stash</div>

			<div className="date-stamp">{date.toString()}</div>

			<div className="archive-column hideScroll scrollStyle1">
				{Object.keys(stashDb).map((key, _) => (
					<File
						key={key}
						FileStates={stashDb[key].FileStates}
						name={stashDb[key].name}
						type={stashDb[key].type}
						link={stashDb[key].link}
						date={stashDb[key].date}
					/>
				))}
			</div>
		</div>
	);
}

{
	/* <legend aria-valuetext="russell" />
				degfuhijokpl[k] */
}

function mapStateToProps(state) {
	return {
		stashDb: state.stash,
	};
}

export default connect(mapStateToProps)(Stash);
