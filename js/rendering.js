function renderMovieCards(movieList) {
	movieList.forEach((movie) => {
		const movieDiv = document.createElement("div");
		movieDiv.classList.add("movie");
		movieDiv.style.backgroundImage = `url(${movie.poster_path})`;
		movies.appendChild(movieDiv);
		movieDiv.addEventListener("click", () => {
			renderModal(movie.id);
		});

		const infoDiv = document.createElement("div");
		infoDiv.classList.add("movie__info");
		movieDiv.appendChild(infoDiv);

		const movieTitle = document.createElement("span");
		movieTitle.classList.add("movie__title");
		movieTitle.textContent = movie.title;
		infoDiv.appendChild(movieTitle);

		const movieRating = document.createElement("span");
		movieRating.classList.add("movie__rating");
		movieRating.textContent = movie.vote_average.toFixed(1);
		infoDiv.appendChild(movieRating);

		const starIcon = document.createElement("img");
		starIcon.src = "./assets/estrela.svg";
		starIcon.alt = "Estrela";
		movieRating.appendChild(starIcon);
	});
}

async function renderDailyMovie() {
	const responseA = await api.get(
		"https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
	);
	const responseB = await api.get(
		"https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
	);
	const movieInfo = responseA.data;
	const movieTrailer = responseB.data.results;
	const releaseDate = new Date(movieInfo.release_date).toLocaleDateString(
		"pt-BR",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		}
	);

	const highlightVideo = highlightDiv.querySelector(".highlight__video");
	highlightVideo.style.position = "relative";
	highlightVideo.style.backgroundImage = `url(${movieInfo.backdrop_path})`;
	highlightVideo.style.backgroundSize = "contain";
	const playBtn = highlightVideo.querySelector("img");
	playBtn.style.position = "absolute";
	const OpacityMask = document.createElement("div");
	OpacityMask.classList.add(".highlight__video");
	OpacityMask.style.position = "absolut";
	OpacityMask.style.width = "560px";
	OpacityMask.style.height = "310px";
	OpacityMask.style.background = "rgba(0, 0, 0, 0.6)";
	highlightVideo.insertBefore(OpacityMask, playBtn);

	const highlightTitle = highlightDiv.querySelector(".highlight__title");
	highlightTitle.textContent = movieInfo.title;

	const highLightRating = highlightDiv.querySelector(".highlight__rating");
	highLightRating.textContent = movieInfo.vote_average.toFixed(1);

	const highlightGenres = highlightDiv.querySelector(".highlight__genres");
	movieInfo.genres.forEach((genre) => {
		if (movieInfo.genres.indexOf(genre) !== movieInfo.genres.length - 1) {
			highlightGenres.textContent += `${genre.name}, `;
		} else {
			highlightGenres.textContent += `${genre.name} `;
		}
	});

	const highlightLaunch = highlightDiv.querySelector(".highlight__launch");
	highlightLaunch.textContent = releaseDate;

	const highlightDescription = highlightDiv.querySelector(
		".highlight__description"
	);
	highlightDescription.textContent = movieInfo.overview;

	const highlightVideoLink = highlightDiv.querySelector(
		".highlight__video-link"
	);
	highlightVideoLink.href = `https://www.youtube.com/watch?v=${movieTrailer[0].key}`;
}

async function renderModal(id) {
	const response = await api.get(
		`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`
	);
	const result = response.data;

	clearGenreDivs();

	const title = modalBody.querySelector(".modal__title");
	title.textContent = result.title;

	const img = modalBody.querySelector(".modal__img");
	img.src = result.backdrop_path;

	const description = modalBody.querySelector(".modal__description");
	description.textContent = result.overview;

	const rating = modalBody.querySelector(".modal__average");
	rating.textContent = result.vote_average.toFixed(1);

	const genres = modalBody.querySelector(".modal__genres");
	result.genres.forEach((genre) => {
		const genreDiv = document.createElement("span");
		genreDiv.classList.add("modal__genre");
		genreDiv.textContent = genre.name;
		genres.appendChild(genreDiv);
	});
	modal.classList.toggle("hidden");
}
