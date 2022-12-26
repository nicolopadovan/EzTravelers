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
	index += 1;
	if (index >= structure.length) {
		return;
	}

	const currentPage = document.getElementById(structure[index - 1]);
	const next = document.getElementById(structure[index]);

	currentPage.style.display = "none";
	prevBtn.style.display = "block";
	next.style.display = "block";

	progressBar.style.transform = `scaleX(${(index) / structure.length})`;
}

function showPrevious() {
	index -= 1;
	if (index <= 0) {
		prevBtn.style.display = "none";
		return;
	}

	const currentPage = document.getElementById(structure[index + 1]);
	const previous = document.getElementById(structure[index]);

	currentPage.style.display = "none";
	previous.style.display = "block";

	progressBar.style.transform = `scaleX(${(index - 1) / structure.length})`;
}

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach((radio) => {
	radio.addEventListener("click", (event) => {
		radio.addEventListener("animationed", () => {
			radio.classList.remove("radioAnimation");
			showNext();
		});
		radio.classList.add("radioAnimation");
	});
});

nextBtn.addEventListener("click", function () {
	showNext();
});

prevBtn.addEventListener("click", function () {
	showPrevious();
});

// saveBtn.addEventListener("click", function () {

// 	const safetyPref = document.getElementById("safetySlider").value;
// 	const socialPref = document.getElementById("socialSlider").value;
// 	const destinationPref = document.querySelector('input[name="question1"]:checked').value;
// 	const objectivePref = document.querySelector('input[name="question2"]:checked').value;
// 	const modePref = document.querySelector('input[name="question3"]:checked').value;

// 	console.log(`Checking ${safetyPref}, ${socialPref}, ${destinationPref}, ${objectivePref}, ${modePref}`);
// 	if (!(safetyPref && socialPref && destinationPref && objectivePref && modePref)) {
// 		console.log("Check went wrong");
// 		return;
// 	}

// 	const interests = {
// 		safety: safetyPref,
// 		social: socialPref,
// 		destination: destinationPref,
// 		objective: objectivePref,
// 		mode: modePref
// 	};

// 	console.log(currentUser);
// 	addDocument(`users/${currentUser.uid}/interests`, "interests", interests).then(() => {
// 		window.location.href = "/";
// 	});
// })