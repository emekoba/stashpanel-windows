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

export function updateUsersCollection(firstname, lastname, email, id, dp) {
	const avatarTypes = [
		"male",
		"female",
		"human",
		"identicon",
		"initials",
		"bottts",
		"avataaars",
		"jdenticon",
		"micah",
	];

	return firebase
		.firestore()
		.collection("users")
		.doc(id)
		.set({
			firstname,
			lastname,
			email,
			dp:
				dp ??
				`https://avatars.dicebear.com/api/${
					avatarTypes[Math.floor(Math.random() * avatarTypes.length)]
				}/${firstname + lastname}.svg`,
			country: "nigeria",
			plan: "free",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
}

export function updateDevicesCollection() {}

export function updateUserDp(userId, img) {
	firebase
		.firestore()
		.collection("users")
		.doc(userId)
		.set({ dp: img }, { merge: true });
}

export function updateDeviceDb(deviceId, fileId) {
	firebase
		.firestore()
		.collection(`devices`)
		.doc(deviceId)
		.set(
			{
				files: firebase.firestore.FieldValue.arrayUnion.apply(this, [
					{
						fileId,
						status: "staged",
					},
				]),
			},
			{ merge: true }
		)
		.then((res) => {
			// console.log(res);
		})
		.catch((err) => console.log(err));
}

export function addFileToDb(
	collection,
	deviceId,
	file_name,
	file_type,
	url,
	x,
	y
) {
	firebase
		.firestore()
		.collection(`files`)
		.add(
			{
				deviceOrigin: deviceId,
				link: url,
				name: file_name,
				type: file_type,
				status: "staged",
				x: x,
				y: y,
			},
			{ merge: true }
		)
		.then((docRef) => {
			updateDeviceDb(deviceId, docRef.id);
		})
		.catch((err) => console.log(err));
}

export function getUser(id, options) {
	console.log("%c get user", "color:purple");

	return database
		.collection("users")
		.doc(id)
		.get()
		.then((user) => user.data());
}

export function login(email, password) {
	return (
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			// .then((userCredentials) => console.log(userCredentials.user.uid))
			.catch((error) => {
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log(errorMessage);
			})
	);
}

export function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
}

export function register(firstname, lastname, email, password) {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			const user = userCredential.user;

			updateUsersCollection(firstname, lastname, user.email, user.uid);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorMessage);
			// ..
		});
}

export function joinPanelCollection() {}

export default firebase;

export const auth = app.auth();
export const storage = app.storage();
export const database = firebase.firestore();
export const user = firebase.firestore();
