const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

require("@electron/remote/main").initialize();

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		minWidth: 500,
		minHeight: 350,

		// maxWidth: 835,
		// maxHeight: 548,

		maxWidth: "100%",
		maxHeight: "100%",

		resizable: true,

		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			// devTools: false
		},
	});

	// window.on("close", (e) => {
	// 	if (process.platform === "darwin" && forceQuit) {
	// 		window = null;
	// 	} else {
	// 		e.preventDefault();
	// 		app.hide();
	// 	}
	// });

	// win.on("close", (e) => {
	// 	if (willQuitApp) {
	// 		/* the user tried to quit the app */
	// 		window = null;
	// 	} else {
	// 		/* the user only tried to close the window */
	// 		e.preventDefault();
	// 		window.hide();
	// 	}
	// });

	if (process.platform === "darwin") {
		var forceQuit = false;

		app.on("before-quit", function () {
			forceQuit = true;
		});

		win.on("close", function (event) {
			if (!forceQuit) {
				event.preventDefault();

				/*
				 * your process here
				 */
			}
		});
	}

	win.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
