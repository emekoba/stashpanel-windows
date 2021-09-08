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
						id={stashDb[key]?.id}
						key={stashDb[key]?.name}
						name={stashDb[key]?.name}
						date={stashDb[key]?.date}
						type={stashDb[key]?.type}
						posX={stashDb[key]?.x}
						posY={stashDb[key]?.y}
						file={stashDb[key]?.file}
						link={stashDb[key]?.link}
						path={stashDb[key]?.path}
						isExternal={stashDb[key]?.isExternal}
						fileState={stashDb[key]?.fileState}
						ownerDp={stashDb[key]?.ownerDp}
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

//? save on stash means that it will save the file locally when stashed but it must check first
//? for whether the file exists is that folder.
