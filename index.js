import {URL_BASE} from "./config.js"
// const URL_ONION = "https://www.omdbapi.com/?apikey=450e73c0&i=tt0392878";


 export const delay = () => {
    setTimeout(5);
    for(let i=5;i>0;i--){
        setTimeout(1);
        console.log(i);
    }
 }

export const apiList = (s,type) => {
    const url=URL_BASE+`s=${s}&type=${type}`;
    fetch(url)
        .then(jsonResponse => jsonResponse.json())
        .then(objResult => {
           const items = objResult.Search;
         
           viewItems(items);
           
        });
   }
   
  


 const viewItems = (items) => {
    const place = document.getElementById("all");
    items.map((film) => {
        //place.appendChild(createHTMLfilm(film));
        place.appendChild(createFilmTitle(film));
        place.appendChild(createFilmPoster(film));
        place.appendChild(createFilmYear(film));
    });
   }
   

 /*ritorna un pacchetto con tutte le info insieme separate da uno spazio
   const createHTMLfilm = (film) => {
       let parametro = [film.Title, film.Year, film.imdbID, film.Type, film.Poster];
       const tutto = document.createElement("div");
       for(let i=0;i<parametro.length; i++){
            const paragrafo = document.createElement("p");
            const nodo = document.createTextNode(parametro[i]);
            paragrafo.appendChild(nodo);
            tutto.appendChild(paragrafo);
       }
        const spazio = document.createElement("br");
        tutto.appendChild(spazio);
        return tutto;
    }*/

    const createFilmPoster = (film) => {
        const paragrafo = document.createElement("p");
        const nodo = document.createTextNode(film.Poster);
        paragrafo.appendChild(nodo);
        return paragrafo;
    }

    const createFilmTitle = (film) => {
        const paragrafo = document.createElement("p");
        const nodo = document.createTextNode(film.Title);
        paragrafo.appendChild(nodo);
        return paragrafo;
    }
    const createFilmYear = (film) => {
        const paragrafo = document.createElement("p");
        const nodo = document.createTextNode(film.Year);
        paragrafo.appendChild(nodo);
        return paragrafo;
    }

    const createHTMLcard = (film) => {
        const riga = document.createElement("div");
            riga.class = "row";
        const colonna = document.createElement("div");
        colonna.class = "col"
        riga.appendChild(colonna);
        riga.appendChild(colonna);
        riga.appendChild(colonna);
        const carta = document.createElement("div.card")

    }