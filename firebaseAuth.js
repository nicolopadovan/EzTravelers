import { app } from "./firebaseInit.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	updatePassword,
	sendPasswordResetEmail,
	deleteUser,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

const auth = getAuth(app);
auth.languageCode = "it"

async function createUserWithEmail(email, password) {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log(`User ${user.uid}`);
				resolve(user);
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`Error ${error}`)
				reject(error);
			});
	});
}

async function signInWithEmail(email, password) {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log(`Signed user: ${user}`);
				resolve(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`Error: ${error}`);
				reject(error);
			});
	});
}

async function authStateListener() {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(`User is logged in with UID ${user.uid}`);
				currentUser = user;
				resolve(user)
			} else {
				reject("User is signed out");
			}
		});
	})
}

let currentUser = auth.currentUser;

authStateListener();

export {
	createUserWithEmail,
	signInWithEmail,
	currentUser
}