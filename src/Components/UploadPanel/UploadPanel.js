import React from "react";
import { FileDrop } from "react-file-drop";
import { connect } from "react-redux";
import { generateId, DispatchCommands, FileStates } from "../../Global/Globals";
import { storage, addFileToDb } from "../../Services/firebase.service";

function UploadPanel({
	userId,
	deviceId,
	activeCollectionId,
	children,
	addFilesToStage,
	settings,
	updateFileUploadProgress,
}) {
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

	function getRefinedType(type) {
		return type?.toString()?.split("/")[0];
	}

	function uploadFile(file, filetype, fileId, name, x, y) {
		if (!deviceId) deviceId = "unknown device";

		const storageRef = storage
			.ref()
			.child(`${userId}/${deviceId}/${filetype ?? "misc"}/${name}`)
			.put(file);

		// .on("state_changed", (){});

		storageRef.on(
			"state_changed",
			(snapshot) => {
				let progress =
					Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				console.log(progress + "% done");

				updateFileUploadProgress(fileId, progress);
			},
			(error) => {
				throw error;
			},
			() => {
				storageRef.snapshot.ref.getDownloadURL().then((url) => {
					addFileToDb(
						activeCollectionId,
						deviceId,
						fileId,
						file.name,
						getRefinedType(name, file.type),
						url,
						x,
						y
					);
				});
			}
		);
	}

	function onInitDragEnter(e) {
		//? create like a ripple effect on the panel...
	}

	function onDrop(file, e) {
		const _fileId = generateId();

		addFilesToStage({
			[`${_fileId}`]: {
				id: generateId(),
				x: e.clientX,
				y: e.clientY,
				name: file[0].name,
				date: file[0].lastModifiedDate,
				path: file[0].path,
				type: file[0].type ? getRefinedType(file[0].type) : "image",
				file: file[0],
				progress: 0,
				FileStates: FileStates.DROPPED,
			},
		});

		setTimeout(
			() =>
				uploadFile(
					file[0],
					getRefinedType(file[0].type),
					_fileId,
					file[0].name,
					e.clientX,
					e.clientY
				),
			settings.instantStash ? 0 : settings.stashDelay * 1000
		);
	}

	return (
		<FileDrop onDrop={onDrop} onFrameDragEnter={onInitDragEnter}>
			{children}
		</FileDrop>
	);
}

function mapStateToProps(state) {
	return {
		userId: state.userId,
		devieId: state.deviceId,
		activeCollectionId: state.collections.active.id,
		panelOnline: state.panelOnline,
		settings: state.settings,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addFilesToStage: (files) =>
			dispatch({
				type: DispatchCommands.ADD_FILES_TO_STAGE,
				payload: files,
			}),

		updateFileUploadProgress: (fileId, progress) =>
			dispatch({
				type: DispatchCommands.UPDATE_FILE_PROGRESS,
				fileId,
				progress,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPanel);
