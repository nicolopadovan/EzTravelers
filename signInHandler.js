import {
	signInWithEmail,
} from "./firebaseAuth.js"

const emailTextField = document.getElementById("emailTextField");
const passwordTextField = document.getElementById("passwordTextField");
const signInBtn = document.getElementById("signInBtn");

function validateEmail(email) {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

signInBtn.addEventListener("click", function () {

	const email = emailTextField.value;
	const password = passwordTextField.value;

	if (!validateEmail(email)) {
		return;
	}

	signInWithEmail(email, password).then((user) => {
		console.log(`Signed In User UID: ${user.uid}`);
	});
});