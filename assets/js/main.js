/*  vue-boolflix
Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5,
// così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, 
lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezzepiene (o mezze vuote :P)

Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, 
gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono in FontAwesome).

Allarghiamo poi la ricerca anche alle serie tv. 
Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, 
stando attenti ad avere alla fine dei valori simili 
(le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs     SERIE TV

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
        search:'ci',
        movies: [],
        seriesTv: [],
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
            // this.vote_average= 
            
            
        this.search=''
        },

    }

});

// Arrotondamento al decimale da traformare e convertire
/* <script type="text/javascript">
var numero = 3.55;
var arrotondato = Math.round(numero);
document.write(arrotondato);
</script> */