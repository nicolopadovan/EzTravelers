import {
	createUserWithEmail,
} from "./firebaseAuth.js"
import { addDocument } from "./firebaseFirestore.js"

const emailTextField = document.getElementById("emailTextField");
const passwordTextField = document.getElementById("passwordTextField");
const repeatPasswordTextField = document.getElementById("repeatPasswordTextField");
const signUpBtn = document.getElementById("signUpBtn");

function validateEmail(email) {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

signUpBtn.addEventListener("click", function () {

	const email = emailTextField.value;
	const password = passwordTextField.value;
	const repeatPassword = repeatPasswordTextField.value;

	if (!(validateEmail(email) && (password.length > 8) && (password === repeatPassword))) {
		return;
	}

	createUserWithEmail(email, password).then((user) => {
		addDocument("users", user.uid, {
			email: email,
		})
	});

});