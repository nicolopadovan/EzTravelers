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
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log(`User ${user.uid}`);
			return user;
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(`Error ${error}`)
			return error;
		});
}

async function signInWithEmail(email, password) {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			return user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			return error;
		});
}

let currentUser = auth.currentUser;

export {
	createUserWithEmail,
	signInWithEmail,
	currentUser
}