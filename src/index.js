import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StashPanel from "./StashPanel";
import reportWebVitals from "./reportWebVitals";
import { Control } from "./State/Control";
import Firebase, { FirebaseContext } from "./Services/firebase.service";

ReactDOM.render(
	<React.StrictMode>
		<Control>
			{/* <FirebaseContext.Provider value={new Firebase()}> */}
			<StashPanel />
			{/* </FirebaseContext.Provider> */}
		</Control>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your StashPanel, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
