import { app } from "./firebaseInit.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	updatePassword,
	signInAnonymously,
	EmailAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	linkWithCredential,
	onAuthStateChanged,
	signOut,
	deleteUser,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { resolve } from "path";

const auth = getAuth(app);
auth.languageCode = "it"

async function createUserWithEmail(email, password) {
	return new Promise((resolve, reject) => {
		if (currentUser) {
			const credential = EmailAuthProvider.credential(email, password);
			linkCredential(credential).then(() => {
				resolve();
			}).catch((error) => {
				reject(error);
			});
			return;
		}

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

async function sendVerificationEmail() {
	return new Promise((resolve, reject) => {
		sendEmailVerification(auth.currentUser).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

async function resetPassword(email) {
	return new Promise((resolve, reject) => {
		sendPasswordResetEmail(auth, email).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

async function changePassword(newPassword) {
	return new Promise((resolve, reject) => {
		updatePassword(auth.currentUser, newPassword).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

async function authStateListener() {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(`User is logged in with UID ${user.uid}`);
				resolve(user)
			} else {
				reject("User is signed out");
			}
		});
	})
}

async function signInAnonymous() {
	return new Promise((resolve, reject) => {
		signInAnonymously(auth).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	})
}

async function signInWithGoogle() {

	if (currentUser) {
		const credential = GoogleAuthProvider.credential();
		linkCredential(credential).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
		return;
	}

	return new Promise((resolve, reject) => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			resolve(user);
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			reject(error);
		});
	});
}

async function logout() {
	return new Promise((resolve, reject) => {
		signOut(auth).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

async function removeUser() {
	return new Promise((resolve, reject) => {
		deleteUser(auth.currentUser).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

async function linkCredential(credential) {
	return new Promise((resolve, reject) => {
		linkWithCredential(currentUser, credential).then((usercred) => {
			// Successful link
			resolve(usercred);
		}).catch((error) => {
			reject(error);
		})
	});
}

const currentUser = () => { return auth.currentUser };

authStateListener();

export {
	createUserWithEmail,
	signInWithEmail,
	sendVerificationEmail,
	resetPassword,
	changePassword,
	authStateListener,
	signInAnonymous,
	signInWithGoogle,
	logout,
	removeUser
}