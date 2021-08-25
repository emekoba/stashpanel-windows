// useEffect(() => {
// 	const panel = document.querySelector(".stashpanel");

// 	panel.style.webkitAppRegion = `${dragging ? "drag" : "no-drag"}`;
// }, [dragging]);

// useEffect(() => {
// 	const panel = document.querySelector(".stashpanel");

// 	panel.addEventListener("mousedown", mousedown);

// 	function mousedown() {
// 		panel.addEventListener("mouseup", mouseup);
// 		panel.addEventListener("mousemove", mousemove);

// 		function mousemove() {
// 			// panel.classList.add("drag-window");

// 			setdragging(true);
// 		}

// 		function mouseup() {
// 			// panel.classList.remove("drag-window");

// 			setdragging(false);

// 			panel.removeEventListener("mouseup", mouseup);
// 			panel.removeEventListener("mousemove", mousemove);
// 		}
// 	}
// });

{
	dragging && (
		<div
			style={{
				background: "red",
				height: 20,
				width: 20,
				top: 0,
				right: 0,
				position: "absolute",
			}}
		/>
	);
}

//* stashpanel.js
{
	/* <Footer /> */
}

{
	/* <div className="open-archive" onClick={toggleArchive}>
				<img className="bounce-on-click" src={menu} />
			</div> */
}
