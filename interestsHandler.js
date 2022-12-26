import { currentUser } from "./firebaseAuth.js";
import { addDocument, addDocumentWithAutoID } from "./firebaseFirestore.js";

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

const structure = [
	"sliderInputsContainer",
	"question1Container",
	"question2Container",
	"question3Container",
]

let index = 0;
function showNext() {

	if (index >= structure.length - 1) {
		return;
	}

	index += 1;

	if (index === 0) {
		nextBtn.style.display = "block";
		nextBtn.text = "Prossimo";
	} else if (index === structure.length - 1) {
		nextBtn.style.display = "block";
		nextBtn.text = "Completa";
	} else {
		nextBtn.style.display = "none";
	}

	const currentPage = document.getElementById(structure[index - 1]);
	const next = document.getElementById(structure[index]);

	currentPage.style.display = "none";
	prevBtn.style.display = "block";
	next.style.display = "block";

	progressBar.style.transform = `scaleX(${(index + 1) / structure.length})`;
}

function showPrevious() {

	if (index < 0) {
		return;
	}

	index -= 1;

	if (index === 0) {
		nextBtn.style.display = "block";
		prevBtn.style.display = "none";
		nextBtn.text = "Prossimo";
	} else {
		nextBtn.style.display = "none";
	}

	const currentPage = document.getElementById(structure[index + 1]);
	const previous = document.getElementById(structure[index]);

	currentPage.style.display = "none";
	previous.style.display = "block";

	progressBar.style.transform = `scaleX(${(index + 1) / structure.length})`;
}

function saveData() {
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

	console.log(currentUser);
	addDocument(`users/${currentUser.uid}/interests`, "interests", interests).then(() => {
		window.location.href = "/";
	});
}

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach((radio) => {
	radio.addEventListener("click", (event) => {
		radio.parentElement.classList.add("radioAnimation");
	});
	radio.parentElement.addEventListener("animationend", () => {
		radio.parentElement.classList.remove("radioAnimation");
		showNext();
	});
});


nextBtn.addEventListener("click", function () {
	if (index === structure.length - 1) {
		saveData();
		return;
	}
	showNext();
});

prevBtn.addEventListener("click", function () {
	showPrevious();
});