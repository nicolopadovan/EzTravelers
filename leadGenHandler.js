import { addDocument } from "./firebaseFirestore.js";

const leadGenNameTextField = document.getElementById("leadGenNameTextField");
const leadGenEmailTextField = document.getElementById("leadGenEmailTextField");
const leadGenBtn = document.getElementById("leadGenBtn");
const leadGenCloseBtn = document.getElementById("leadGenCloseBtn");
const leadGenContainer = document.getElementById("leadGenContainer");
const marketingCheckBox = document.getElementById("marketingCheckBox");
const unlockBlurwallBtn = document.getElementById("unlockBlurwallBtn");
const copyToClipboardBtn = document.getElementById("copyPlanBtn");

function unlockBlurWall() {
	window.localStorage.setItem('storageGrantConsent', 'true');
	const blurWalls = document.getElementsByClassName("blurwall");
	for (let element of blurWalls) {
		element.style.filter = "none";
	}

	const txts = document.getElementsByClassName("prevent-selection");
	for (let element of txts) {
		element.classList.remove("prevent-selection");
	}

	unlockBlurwallBtn.style.display = "none";
	leadGenContainer.style.display = "none";
}

function showLeadGenPopUp() {
	leadGenContainer.style.display = "flex";

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

		unlockBlurWall();
		// DONE: Code to save the consent of preferences storage cookies - DONE IN GTM
		setCookie('personalization_email', email, { secure: true, 'max-age': 2628e6 });

		addDocument("leadGenerationUsers", `${email}`, {
			name: name,
			email: email,
			marketingConsent: marketingConsent
		});
	});
}

if (getCookie("personalization_email")) {
	unlockBlurWall();
}

leadGenCloseBtn.addEventListener("click", function () {
	leadGenContainer.style.display = "none";
});

function validateEmail(email) {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

unlockBlurwallBtn.addEventListener("click", function () {
	showLeadGenPopUp();
});

copyToClipboardBtn.addEventListener("click", function () {
	if (!getCookie("personalization_email")) {
		showLeadGenPopUp();
		return;
	}

	var temp = document.createElement("input");
	document.body.appendChild(temp);
	temp.value = document.getElementById("copyPlanText").textContent;
	temp.select();

	navigator.clipboard.writeText(temp.value).then(function () {
		alert("Copiato negli appunti!")
	}, function () {
		alert("Errore durante la copia negli appunti. Riprova!");
	});
	temp.remove();
});

