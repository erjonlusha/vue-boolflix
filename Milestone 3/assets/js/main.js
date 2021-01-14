/*  vue-boolflix
Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. 
Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare(troviamo tutte le dimensioni possibili a questo link:https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) 
per poi aggiungere la parte finale dell’URL passata dall’API.
Esempio di URL:https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png


*/
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher   SEARCH API
// d5a7446f47b98b836ef74678cc601179     API KEY
// https://api.themoviedb.org/3/movie/76341?api_key=d5a7446f47b98b836ef74678cc601179    EXAMPLE
// https://api.themoviedb.org/3/search/tv?api_key= {{api key}} &language=it_IT&query=scrubs     SERIE TV

// COMPOSIZIONE APi ******  GET + TV || MOVIES + api_key= API KEY + LANG + SEARCH APi
    // 'https://api.themoviedb.org/3/search/' = get
    //  'tv?'= tv
    //  'movie?'= MOVIES
    //  '&language=it_IT'= lang
    //  '&query=' = search APi

let app = new Vue ({
	el: "#app",
    data : {
        // Link axios
        APi: 'https://api.themoviedb.org/3/search/movie?api_key=d5a7446f47b98b836ef74678cc601179&query=',

        getAPi:'https://api.themoviedb.org/3/search/',
        tvAPi:'tv?',
        movieAPi:'movie?',
        keyAPi:'api_key=e99307154c6dfb0b4750f6603256716d',
        lang:'&language=it_IT', 

        vote_average:[],
        searchMoviesAPi:'',
        searchTvAPi:'',
        search:'',
        movies: [],
        seriesTv: [],
        flags: [],
        imgNonDisponibile:'https://tabook.it/img/cover_non_disp.jpg'
    },
    mounted () {
        // let APi= 'https://api.themoviedb.org/3/search/movie?api_key=d5a7446f47b98b836ef74678cc601179&query='+ 'Jack+Reacher';
    },
    methods:{
        submit(){
            console.log(this.search)
            this.searchMoviesAPi =this.getAPi + this.movieAPi + this.keyAPi + '&query=' + this.search
            axios.get(this.searchMoviesAPi)
            .then(response => {
                console.log(response.data.results);
                if (response.data.results.length !== 0){
                    this.movies= response.data.results;
                    this.flags= this.movies.original_language; 
                    // console.log(this.flags)
                } else {
                    alert('La seguente ricerca non ha dato nessun risultato');
                };
                }),
                
                //https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs   this.getAPi + this.tvAPi + this.keyAPi + '&query=' + this.lang  SERIE TV
                
            this.searchTvAPi = 'https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=' + this.search
            axios.get(this.searchTvAPi)
            .then(response => {
                console.log(response.data.results);
                if (response.data.results.length !== 0){
                    this.seriesTv= response.data.results;
                    } else {
                        alert('La seguente ricerca non ha dato nessun risultato')
                    }
                }),
            
            
        this.search=''
        },
    
        getRate(voto){
            let rate = Math.round(voto/2);
            return rate;
        },
        getFlag(lang){
            return `https://www.countryflags.io/${lang}/shiny/32.png`
        }
    }

});