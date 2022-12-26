import { getDestinationsFromAPI } from "./firebaseFunctions.js";

const searchBtn = document.getElementById("conversionBtn");
const searchInput = document.getElementById("searchField");
searchBtn.addEventListener("click", function (element) {
	element.preventDefault();

	let searchTerm = searchInput.value;

	if (searchTerm === '') { return };

	const filter = document.querySelector('input[name="Radio4"]:checked').value;
	searchTerm = searchTerm + " " + filter;

	getDestinationsFromAPI({ searchTerm: searchTerm })
		.then(function (result) {
			// Read result of the Cloud Function.
			const destinations = result.data.result

			const searchErrorLabel = document.getElementById("searchErrorLabel");
			if (destinations.length) {
				searchErrorLabel.style.display = "none";
				window.location.href = "/destinations/" + destinations[0].slug;
			} else {
				searchErrorLabel.style.display = "block";
			}
		})
		.catch(function (error) {
			console.log(error);
			const code = error.code;
			const message = error.message;
			const details = error.details;
		});
})

let searchEventSent = false;
searchInput.addEventListener("focusout", function (event) {
	if (!searchEventSent) {
		fbq('track', 'Search', { searchTerm: searchInput.value });
		searchEventSent = true;
	}
});