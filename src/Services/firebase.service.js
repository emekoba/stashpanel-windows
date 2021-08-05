import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebase from "firebase";

app.initializeApp({
	apiKey: "AIzaSyA9hxDraWoCn12WuHYRdm4MvGiIANPZWb4",
	authDomain: "stash-panel.firebaseapp.com",
	projectId: "stash-panel",
	storageBucket: "stash-panel.appspot.com",
	messagingSenderId: "505159578380",
	appId: "1:505159578380:web:e8e2a53518c7c37da54f29",
	measurementId: "G-CPVQLP9NQ1",
});

// const getArchive=(userId)=> {
// 	const collection = database
// 		.collection("device-collection")
// 		.where("owner", "==", userId);

// 	collection
// 		.get()
// 		.then((querySnapshot) => {
// 			console.log(querySnapshot);

// 			querySnapshot.forEach((doc) => {
// 				console.log(doc.data());
// 			});
// 		})
// 		.catch((e) => console.log(e));

// 	return [];
// }

export function addFileToStash(collection, device, file_name, file_type, url) {
	firebase
		.firestore()
		.collection(`device-collection/${collection}/devices`)
		.doc(device)
		.update(
			{
				stash: firebase.firestore.FieldValue.arrayUnion.apply(this, [
					{
						link: url,
						name: file_name,
						type: file_type,
					},
				]),
			},
			{ merge: true }
		)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
}

export default firebase;

export const auth = app.auth();
export const storage = app.storage();
export const database = firebase.firestore();
