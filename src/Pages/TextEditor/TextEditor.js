import React, { createRef, useEffect } from "react";
import "./texteditor.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { connect } from "react-redux";
import { DispatchCommands } from "../../Global/Globals";

function TextEditor({ isOpen, hideWindowMenu, showWindowMenu }) {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	const editorController = createRef();

	useEffect(() => {
		const editor = document.querySelector(".text-editor");

		editor.addEventListener("contextmenu", (event) => event.stopPropagation());

		editor.style.animation = `${
			isOpen
				? "open-editor-animation 0.4s forwards"
				: "close-editor-animation 0.2s forwards"
		}`;

		setTimeout(
			() =>
				Array.from(editor.childNodes).map((each) => {
					each.style.visibility = `${isOpen ? "visible" : "hidden"}`;

					return null;
				}),
			100
		);

		setTimeout(
			() => (editor.style.display = `${isOpen ? "flex" : "none"}`),
			200
		);

		setTimeout(() => {
			if (isOpen) hideWindowMenu();
			else showWindowMenu();
		}, 200);
	}, [isOpen]);

	useEffect(() => editorController.current.focus(), []);

	useEffect(() => {
		navigator.clipboard
			.readText()
			.then((text) => {
				console.log("Pasted content: ", text);

				editorController.current.setEditorState(text);
			})
			.catch((err) =>
				console.error("Failed to read clipboard contents: ", err)
			);
	}, [isOpen]);

	function onChange(editorState) {
		setEditorState(editorState);
	}

	function handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	function toggleBlockType(blockType) {
		onChange(RichUtils.toggleBlockType(editorState, blockType));
	}

	function toggleInlineStyle(inlineStyle) {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	return (
		<div className="text-editor" onClick={(e) => e.stopPropagation()}>
			<BlockStyleControls
				editorState={editorState}
				onToggle={toggleBlockType}
			/>

			<InlineStyleControls
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>

			<hr style={{ width: "100%", borderColor: "lightgrey" }} />

			<Editor
				editorState={editorState}
				onChange={setEditorState}
				ref={editorController}
				handleKeyCommand={handleKeyCommand}
			/>
		</div>
	);
}

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}
	render() {
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}
		return (
			<span
				style={{ cursor: "pointer" }}
				className={className}
				onMouseDown={this.onToggle}
			>
				{this.props.label}
			</span>
		);
	}
}

function BlockStyleControls(props) {
	const { editorState } = props;

	const selection = editorState.getSelection();

	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	const BLOCK_TYPES = [
		{ label: "H1", style: "header-one" },
		{ label: "H2", style: "header-two" },
		{ label: "H3", style: "header-three" },
		{ label: "H4", style: "header-four" },
		{ label: "H5", style: "header-five" },
		{ label: "H6", style: "header-six" },
		{ label: "Blockquote", style: "blockquote" },
		{ label: "UL", style: "unordered-list-item" },
		{ label: "OL", style: "ordered-list-item" },
		{ label: "Code Block", style: "code-block" },
	];

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
}

function InlineStyleControls(props) {
	var currentStyle = props.editorState.getCurrentInlineStyle();

	var INLINE_STYLES = [
		{ label: "Bold", style: "BOLD" },
		{ label: "Italic", style: "ITALIC" },
		{ label: "Underline", style: "UNDERLINE" },
		{ label: "Monospace", style: "CODE" },
	];

	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		hideWindowMenu: () =>
			dispatch({
				type: DispatchCommands.HIDE_WINDOW_MENU,
			}),

		showWindowMenu: () =>
			dispatch({
				type: DispatchCommands.SHOW_WINDOW_MENU,
			}),
	};
}

export default connect(null, mapDispatchToProps)(TextEditor);
