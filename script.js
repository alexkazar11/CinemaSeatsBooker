const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

//Update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

//Save selected movie and its price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Get data from local storage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//Event listeners
//Click on seat
container.addEventListener("click", e => {
	if (e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")) {

		e.target.classList.toggle("selected");

		updateSelectedCount();
	}
});

//Change movie
movieSelect.addEventListener("change", e => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

//Initial count and total set
updateSelectedCount();

/* 
	TO ADD IN THE FUTURE: 
	- Background container
	- Add limit to number of tickets
	- Save the seats separately for each movie in local storage
	- Clear seats button
	- Action on Purchase button (occupy seats)
*/