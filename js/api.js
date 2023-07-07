const api = axios.create({
	baseURL:
		"https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false",
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});
