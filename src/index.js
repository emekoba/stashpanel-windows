import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StashPanel from "./StashPanel";
import reportWebVitals from "./reportWebVitals";
// import Firebase, { FirebaseContext } from "./Services/firebase.service";
import { theme } from "./Global/Theme";
import { MuiThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import { createStore } from "redux";
import globalReducer from "./State/GlobalReducer";

const store = createStore(globalReducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				{/* <FirebaseContext.Provider value={new Firebase()}> */}
				<StashPanel />
				{/* </FirebaseContext.Provider> */}
			</MuiThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your StashPanel, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
