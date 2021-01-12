/*  vue-boolflix
// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto

// “​Se il titolo originale è uguale al titolo, magari dovrei nasconderlo​”
// Se faccio una ricerca che non ha nessun risultato dovrei scrivere qualcosa*/

// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher   SEARCH API
// d5a7446f47b98b836ef74678cc601179     API KEY
// https://api.themoviedb.org/3/movie/76341?api_key=d5a7446f47b98b836ef74678cc601179    EXAMPLE
let app = new Vue ({
	el: "#app",
    data : {
        APi: 'https://api.themoviedb.org/3/search/movie?api_key=d5a7446f47b98b836ef74678cc601179&query=',
        searchAPi:'',
        search:'',
        movies: []
    },
    mounted () {
        // let APi= 'https://api.themoviedb.org/3/search/movie?api_key=d5a7446f47b98b836ef74678cc601179&query='+ 'Jack+Reacher';
    },
    methods:{
        submit(){
            console.log(this.search)
            this.searchAPi = this.APi + this.search
            axios.get(this.searchAPi)
            .then(response => {
                console.log(response.data.results);
                if (response.data.results.length !== 0){
                    this.movies= response.data.results;
                } else {
                    alert('La seguente ricerca non ha dato nessu risultato')
                }
        })
         this.search=''
        }
    },

});