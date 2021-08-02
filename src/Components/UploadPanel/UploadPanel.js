import React from "react";
import { FileDrop } from "react-file-drop";
import firebase from "../../Services/firebase.service";

export default function UploadPanel({ children, pins, setpins }) {
	function uploadFile(file, filetype, name) {
		const storageRef = firebase
			.storage()
			.ref()
			.child(`${filetype}` ?? `misc`);

		storageRef.put(file);
		// .on("state_changed", (alert("success"), alert));
	}

	function onInitDragEnter(e) {
		// console.log(e.dataTransfer, e);

		const panel = document.querySelector(".stashpanel");
		panel.classList.remove("drag-window");
	}

	function onDrop(file, e) {
		console.log(file[0].name, file[0]);

		setpins([
			...pins,
			{
				x: e.clientX,
				y: e.clientY,
				name: file[0].name,
				date: file[0].lastModifiedDate,
				path: file[0].path,
				type: file[0].type ?? "image",
				file: file[0],
			},
		]);

		uploadFile(file[0], file[0].type, file[0].name);
	}

	function onTargetClicked() {}

	return (
		<FileDrop
			// onTargetClick={onTargetClicked}
			onDrop={onDrop}
			onFrameDragEnter={onInitDragEnter}
		>
			{children}
		</FileDrop>
	);
}
