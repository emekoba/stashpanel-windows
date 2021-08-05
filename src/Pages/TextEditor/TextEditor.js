import React, { createRef, useEffect } from "react";
import "./texteditor.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function TextEditor({ isOpen }) {
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
				: "close-editor-animation 0.4s forwards"
		}`;

		setTimeout(
			() => {
				Array.from(editor.childNodes).map((each) => {
					each.style.display = `${isOpen ? "flex" : "none"}`;
				});
			},
			isOpen ? 1000 : 0
		);

		setTimeout(() => {
			editor.style.display = `${isOpen ? "flex" : "none"}`;
		}, 1050);
	}, [isOpen]);

	useEffect(() => {
		editorController.current.focus();
	}, []);

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
			<div className="" style={_x.editor}>
				<BlockStyleControls
					editorState={editorState}
					onToggle={toggleBlockType}
				/>

				<InlineStyleControls
					editorState={editorState}
					onToggle={toggleInlineStyle}
				/>

				<hr
					style={{
						width: "100%",
						borderColor: "var(--dark-glass)",
					}}
				/>

				<div style={{ marginTop: 10 }}>
					<Editor
						editorState={editorState}
						onChange={setEditorState}
						ref={editorController}
						handleKeyCommand={handleKeyCommand}
					/>
				</div>
			</div>
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
			<span className={className} onMouseDown={this.onToggle}>
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

const _x = {
	editor: {
		border: "1px solid #ccc",
		cursor: "text",
		height: "80vh",
		width: "80vw",
		padding: 20,
		background: "#ccc",
		display: "flex",
		flexDirection: "column",
	},
};
