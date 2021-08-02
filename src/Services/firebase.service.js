import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebase = app.initializeApp({
	apiKey: "AIzaSyA9hxDraWoCn12WuHYRdm4MvGiIANPZWb4",
	authDomain: "stash-panel.firebaseapp.com",
	projectId: "stash-panel",
	storageBucket: "stash-panel.appspot.com",
	messagingSenderId: "505159578380",
	appId: "1:505159578380:web:e8e2a53518c7c37da54f29",
	measurementId: "G-CPVQLP9NQ1",
});

export default firebase;
export const auth = app.auth();
export const storage = app.storage();

// export { auth };
