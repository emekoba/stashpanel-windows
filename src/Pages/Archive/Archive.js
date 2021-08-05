import React, { useContext, useEffect, useState } from "react";
import File from "../../Components/File/File";
import "./archive.css";
import { database } from "../../Services/firebase.service";
import { Brim } from "../../State/Control";

export default function Archive() {
	const [archive, setarchive] = useState({});

	const [control, setcontrol] = useContext(Brim);

	useEffect(() => {
		let _proto = {};

		database
			.collection(`device-collection/${control.user.collectionId}/devices`)
			.onSnapshot(
				{
					includeMetadataChanges: true,
				},
				(doc) => {
					doc.docs.forEach((device) => {
						if (device.id === control.currentDevice) {
							// console.log(device.data());

							device.data().stash.map((e) => {
								_proto[e.name] = {
									type: e.type,
									link: e.link,
									date: e.createdAt,
								};
							});
						}
					});

					setarchive(_proto);
				}
			);
	}, []);

	const date = new Date();

	return (
		<div className="archive">
			<div className="archive-header">My Stash</div>

			<div className="date-stamp">{date.toString()}</div>

			<div className="archive-column">
				{Object.keys(archive).map((key, _) => (
					<File
						variant="archive"
						name={key}
						type={archive[key].type}
						link={archive[key].link}
						date={archive[key].date}
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
