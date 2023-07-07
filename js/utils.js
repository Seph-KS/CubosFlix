function clearMovieCards() {
	const movieDivs = document.querySelectorAll(".movie");
	movieDivs.forEach((movie) => {
		movie.remove();
	});
}

function clearGenreDivs() {
	const genreList = document.querySelectorAll(".modal__genre");
	genreList.forEach((genre) => {
		genre.remove();
	});
}

function changePage(movieList) {
	clearMovieCards();
	renderMovieCards(movieList);
}

function changeToDark() {
	currentTheme = "dark";
	localStorage.setItem("theme", "dark");
	root.style.setProperty("--background", "#1b2028");
	root.style.setProperty("--bg-secondary", "#2d3440");
	root.style.setProperty("--text-color", "#ffffff");
	input.style.backgroundColor = "#3e434c";
	nextBtn.src = "./assets/arrow-right-light.svg";
	previousBtn.src = "./assets/arrow-left-light.svg";
	themeBtn.src = "./assets/dark-mode.svg";
	closeBtn.src = "./assets/close.svg";
	logo.src = "./assets/logo.svg";
}
