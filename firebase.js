// Initialize Cloud Functions through Firebase  
console.log("4. Loading Main");
console.log(functions);

var searchBtn = document.getElementById("conversionBtn");
var searchInput = document.getElementById("searchField");
console.log("Triggered");
searchBtn.addEventListener("click", function (element) {
	element.preventDefault();

	var searchTerm = searchInput.value;

	if (searchTerm === '') { return };

	var filter = document.querySelector('input[name="Radio4"]:checked').value;
	searchTerm = searchTerm + " " + filter;

	console.log(searchTerm);
	getDestinationsFromAPI({ searchTerm: searchTerm })
		.then(function (result) {
			// Read result of the Cloud Function.
			console.log(result.data.result);
			var destinations = result.data.result

			var searchErrorLabel = document.getElementById("searchErrorLabel");
			if (destinations.length) {
				searchErrorLabel.style.display = "none";
				window.location.href = "/destinations/" + destinations[0].slug;
			} else {
				searchErrorLabel.style.display = "block";
			}
		})
		.catch(function (error) {
			console.log(error);
			var code = error.code;
			var message = error.message;
			var details = error.details;
		});
})