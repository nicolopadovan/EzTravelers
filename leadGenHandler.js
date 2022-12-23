// Remember to use GTM-compatible JS
import { addDocument } from "./firebaseFirestore.js";

const leadGenNameTextField = document.getElementById("leadGenNameTextField");
const leadGenEmailTextField = document.getElementById("leadGenEmailTextField");
const leadGenBtn = document.getElementById("leadGenBtn");
const leadGenCloseBtn = document.getElementById("leadGenCloseBtn");

leadGenCloseBtn.addEventListener("click", function () {
	document.getElementById("leadGenContainer").style.display = "none";
});

function validateEmail(email) {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

leadGenBtn.addEventListener("click", function () {
	const name = leadGenNameTextField.value;
	const email = leadGenEmailTextField.value;

	const leadGenErrorLabel = document.getElementById("leadGenErrorLabel");
	if (!validateEmail(email)) {
		leadGenErrorLabel.style.display = "block";
		leadGenErrorLabel.innerHTML = "Indirizzo email non valido"
		return;
	}
	leadGenErrorLabel.style.display = "none";

	return addDocument("leadGenerationUsers", {
		name: name,
		email: email
	});
});