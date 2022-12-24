// Remember to use GTM-compatible JS
import { addDocument } from "./firebaseFirestore.js";

const leadGenNameTextField = document.getElementById("leadGenNameTextField");
const leadGenEmailTextField = document.getElementById("leadGenEmailTextField");
const leadGenBtn = document.getElementById("leadGenBtn");
const leadGenCloseBtn = document.getElementById("leadGenCloseBtn");
const leadGenContainer = document.getElementById("leadGenContainer");
const marketingCheckBox = document.getElementById("marketingCheckBox");
const unlockBlurwallBtn = document.getElementById("unlockBlurwallBtn");

leadGenCloseBtn.addEventListener("click", function () {
	leadGenContainer.style.display = "none";
});

function validateEmail(email) {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

unlockBlurwallBtn.addEventListener("click", function () {
	leadGenContainer.style.display = "flex";
});

leadGenBtn.addEventListener("click", function () {
	const name = leadGenNameTextField.value;
	const email = leadGenEmailTextField.value;
	const marketingConsent = marketingCheckBox.checked;

	const leadGenErrorLabel = document.getElementById("leadGenErrorLabel");
	if (!validateEmail(email)) {
		leadGenErrorLabel.style.display = "block";
		leadGenErrorLabel.innerHTML = "Indirizzo email non valido"
		return;
	}
	leadGenErrorLabel.style.display = "none";

	const blurWalls = document.getElementsByClassName("blurwall");
	for (let element of blurWalls) {
		element.style.filter = "none";
	}

	const txts = document.getElementsByClassName("prevent-selection");
	for (let element of txts) {
		element.classList.remove("prevent-selection");
	}

	unlockBlurwallBtn.style.display = "none";

	return addDocument("leadGenerationUsers", {
		name: name,
		email: email,
		marketingConsent: marketingConsent
	});
});