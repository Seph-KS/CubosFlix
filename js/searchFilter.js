async function searchMovie(query) {
	const response = await api.get(
		`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${query}`
	);
	const resultList = response.data.results;
	const pageList = [];
	const totalPages = Math.ceil(resultList.length / 6);
	let counter = 0;
	page = 0;
	secondPage = null;
	lastPage = null;

	clearMovieCards();

	for (let i = 0; i < totalPages; i++) {
		pageList.push(resultList.slice(counter, counter + 6));
		counter += 6;
	}

	firstPage = pageList[0];
	if (pageList.length > 1) {
		secondPage = pageList[1];
	}
	if (pageList.length > 2) {
		lastPage = pageList[2];
	}

	renderMovieCards(firstPage);
}
