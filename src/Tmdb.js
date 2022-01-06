const API_KEY = 'c0370fec37793c1cd94267b3d5cb432e';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originaisNetflix',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'recomendados',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'emAlta',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'acao',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_generes=28&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'comedia',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_generes=35&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'terror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_generes=27&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_generes=10749&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'documentarios',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_generes=99&language=pt-BR&api_key=${API_KEY}`),
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            if(type === 'movie'){
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            }else if(type === 'tv'){
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            }else{
                info = null;
            }
        }
        return info;
    }
}