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

async function createUserWithEmailAndPassword(email, password) {
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			consolel.log(`User ${user.uid}`);
			return user;
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(`Error ${error}`)
			return error;
		});
}

async function signInWithEmailAndPassword(email, password) {
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

// TODO: Edit to take function as parameter
async function onAuthStateChanged() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
		} else {
			// User is signed out
		}
	});
}

// TODO: Complete
function sendEmailVerification() {
	sendEmailVerification(auth.currentUser).then(() => {
		// Email verification sent!
	});
}

// TODO: Complete
function updatePassword(newPassword) {
	updatePassword(auth.currentUser, newPassword).then(() => {
		// Update successful.
	}).catch((error) => {
		// An error ocurred
		// ...
	});
}

// TODO: Complete
function sendPasswordResetEmail(email) {
	sendPasswordResetEmail(auth, email)
		.then(() => {
			// Password reset email sent!
			// ..
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});

}

// TODO: Complete
function deleteUser() {
	deleteUser(user).then(() => {
		// User deleted.
	}).catch((error) => {
		// An error ocurred
		// ...
	});
}

// TODO: Complete
function signOut() {
	signOut(auth).then(() => {
		// Sign-out successful.
	}).catch((error) => {
		// An error happened.
	});
}

// TODO: Complete
function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}

let currentUser = auth.currentUser;

export {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	updatePassword,
	sendPasswordResetEmail,
	deleteUser,
	signOut,
	signInWithGoogle,
	currentUser
}