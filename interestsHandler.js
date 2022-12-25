import { currentUser } from "./firebaseAuth.js";
import { addDocument, addDocumentWithAutoID } from "./firebaseFirestore.js";

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {

	const safetyPref = document.getElementById("safetySlider").value;
	const socialPref = document.getElementById("socialSlider").value;

	const destinationPref = document.querySelector('input[name="question1"]:checked').value;
	const objectivePref = document.querySelector('input[name="question2"]:checked').value;
	const modePref = document.querySelector('input[name="question3"]:checked').value;

	console.log(`Checking ${safetyPref}, ${socialPref}, ${destinationPref}, ${objectivePref}, ${modePref}`);
	if (!(safetyPref && socialPref && destinationPref && objectivePref && modePref)) {
		console.log("Check went wrong");
		return;
	}

	const interests = {
		safety: safetyPref,
		social: socialPref,
		destination: destinationPref,
		objective: objectivePref,
		mode: modePref
	};

	console.log(currentUser.uid);
	addDocument(`users/${currentUser.uid}/interests`, "interests", interests);
})