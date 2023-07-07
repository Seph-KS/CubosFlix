const movies = document.querySelector(".movies");
const previousBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const searchInput = document.querySelector(".input");
const highlightDiv = document.querySelector(".highlight");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal__body");
const closeBtn = modalBody.querySelector(".modal__close");
const themeBtn = document.querySelector(".btn-theme");
const root = document.querySelector(":root");
const input = document.querySelector(".input");
const logo = document.querySelector(".header__container-logo img");

let currentTheme = localStorage.getItem("theme");

let firstPage;
let secondPage;
let lastPage;

let page = 0;

async function getMovieList() {
	const response = await api.get(
		"https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie"
	);

	const movieList = response.data.results;
	firstPage = movieList.slice(0, 6);
	secondPage = movieList.slice(6, 12);
	lastPage = movieList.slice(12, 18);

	renderMovieCards(firstPage);
	renderDailyMovie();

	previousBtn.addEventListener("click", () => {
		if (page === 0) {
			if (lastPage === null) {
				return;
			}
			changePage(lastPage);
			page = 2;
			return;
		}
		if (page === 1) {
			changePage(firstPage);
			page = 0;
			return;
		}
		changePage(secondPage);
		page = 1;
	});

	nextBtn.addEventListener("click", () => {
		if (secondPage === null) {
			return;
		}
		if (page === 0) {
			changePage(secondPage);
			page = 1;
			return;
		}
		if (page === 1) {
			if (lastPage === null) {
				return;
			}
			changePage(lastPage);
			page = 2;
			return;
		}
		changePage(firstPage);
		page = 0;
	});

	searchInput.addEventListener("keyup", (event) => {
		if (event.key === "Enter" && !searchInput.value) {
			clearMovieCards();
			getMovieList();
			searchInput.value = "";
		}

		if (event.key === "Enter" && searchInput.value) {
			searchMovie(searchInput.value);
			searchInput.value = "";
		}
	});
}

if (currentTheme === "dark") {
	changeToDark();
}
getMovieList();

if (!currentTheme) {
	localStorage.setItem("theme", "light");
	currentTheme = localStorage.getItem("theme");
}

modalBody.addEventListener("click", () => {
	modal.classList.toggle("hidden");
});

closeBtn.addEventListener("click", (event) => {
	event.stopPropagation();
	modal.classList.toggle("hidden");
});

themeBtn.addEventListener("click", () => {
	if (currentTheme === "light") {
		changeToDark();
		return;
	}
	currentTheme = "light";
	localStorage.setItem("theme", "light");
	root.style.setProperty("--background", "#fff");
	root.style.setProperty("--bg-secondary", "#ededed");
	root.style.setProperty("--text-color", "#1b2028");
	input.style.backgroundColor = "#fff";
	nextBtn.src = "./assets/arrow-right-dark.svg";
	previousBtn.src = "./assets/arrow-left-dark.svg";
	themeBtn.src = "./assets/light-mode.svg";
	closeBtn.src = "./assets/close-dark.svg";
	logo.src = "./assets/logo-dark.png";
});
