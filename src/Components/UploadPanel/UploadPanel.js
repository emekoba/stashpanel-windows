import React, { useContext } from "react";
import { FileDrop } from "react-file-drop";
import { storage, addFileToStash } from "../../Services/firebase.service";
import { Brim } from "../../State/Control";

export default function UploadPanel({ children, pins, setpins }) {
	const [control, setcontrol] = useContext(Brim);

	function getFileSize(size) {
		if (size === 0) return "0 Bytes";

		const k = 1024;

		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

		const i = Math.floor(Math.log(size) / Math.log(k));

		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	}

	function fileIsValid(file) {
		const validTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/x-icon",
		];

		if (validTypes.indexOf(file.type) === -1) return false;

		return true;
	}

	function updateDB() {}

	function getRefinedType(type) {
		return type?.toString()?.split("/")[0];
	}

	function uploadFile(file, filetype, name) {
		const storageRef = storage
			.ref()
			.child(
				`${control.user.id}/${control.currentDevice}/${
					filetype ?? "misc"
				}/${name}`
			)
			.put(file);

		// .on("state_changed", (){});

		storageRef.on(
			"state_changed",
			(snapshot) => {
				let progress =
					Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				console.log(progress + "% done");

				// setpins({
				// 	...pins,
				// 	[`${name}`]: { ...pins[name], progress: progress },
				// });
			},
			(error) => {
				throw error;
			},
			() => {
				storageRef.snapshot.ref.getDownloadURL().then((url) => {
					addFileToStash(
						control.user.collectionId,
						control.currentDevice,
						file.name,
						getRefinedType(file.type),
						url
					);
				});
			}
		);
	}

	function onInitDragEnter(e) {
		//? create like a ripple effect on the panel...
	}

	function onDrop(file, e) {
		setpins({
			...pins,
			[`${file[0].name}`]: {
				x: e.clientX,
				y: e.clientY,
				name: file[0].name,
				date: file[0].lastModifiedDate,
				path: file[0].path,
				type: file[0].type ? getRefinedType(file[0].type) : "image",
				file: file[0],
				progress: 0,
			},
		});

		// uploadFile(file[0], getRefinedType(file[0].type), file[0].name);
	}

	return (
		<FileDrop onDrop={onDrop} onFrameDragEnter={onInitDragEnter}>
			{children}
		</FileDrop>
	);
}
