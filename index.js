import {CONTENT_TYPE, URL_BASE} from "./config.js"
// const URL_ONION = "https://www.omdbapi.com/?apikey=450e73c0&i=tt0392878";

/*
 export const delay = () => {
    setTimeout(5);
    for(let i=5;i>0;i--){
        setTimeout(1);
        console.log(i);
    }
 }*/

export const apiList = (s,type) => {
    const url=URL_BASE+`s=${s}&type=${type}`;
    fetch(url)
        .then(jsonResponse => jsonResponse.json())
        .then(objResult => {
           

            const everything = document.getElementById("search");
            const argomentoDiv = document.createElement("h1");
            argomentoDiv.className = "text-white text-center";
            
                const nodo1 = document.createTextNode("search: " + s);
                argomentoDiv.appendChild(nodo1);
            everything.appendChild(argomentoDiv);
            const items = objResult.Search;
            viewItems(items);
           
        });
   }

   
   const viewItems = (items) => {
    const place = document.getElementById("search");
    const riga = document.createElement("div");
    riga.className = "row row-cols-1 row-cols-md-2 row-cols-xxl-4";
    place.appendChild(riga);

    items.map((media) => {
        riga.appendChild(mediaCardGenerator(media));
    });

    return place;
   }

   const mediaCardGenerator = (media) =>{
    const colonna = document.createElement("div");
    colonna.className="col my-5" 
        const card = document.createElement("div");
        card.className="filmCard";
        card.setAttribute("class", "filmCard");
        colonna.appendChild(card);
            const header = document.createElement("ul");
            header.className="list-group list-group-flush ulHide";
            card.appendChild(header);
                const elementoLista1 = document.createElement("li");
                elementoLista1.className="list-group-item bg-dark";
                header.appendChild(elementoLista1);
                    const titolo = document.createElement("h5");
                    titolo.className="card-title text-white text-center";
                    elementoLista1.appendChild(titolo);
                        const nodoTitolo = document.createTextNode(media.Title);
                        titolo.appendChild(nodoTitolo);
                const elementoLista2 = document.createElement("li");
                elementoLista2.className="list-group-item bg-dark text-white text-center";
                header.appendChild(elementoLista2);
                    const paragrafo2 = document.createElement("p");
                    elementoLista2.appendChild(paragrafo2);
                        const nodoRelised = document.createTextNode(media.Relised);
                        paragrafo2.appendChild(nodoRelised);
            //const linkAllaSchedaTec = document.createElement("a");
            //linkAllaSchedaTec.setAttribute("href", "#");
            //card.appendChild(linkAllaSchedaTec);
                const imgPoster = document.createElement("img");
                imgPoster.className="filmImg";
                //imgPoster.setAttribute("title", "media.Title");
                //const nodoPoster = document.createTextNode(media.Poster);
                //imgPoster.setAttribute("src", nodo); //da ERRORE QUA
                imgPoster.src=media.Poster;
                card.appendChild(imgPoster);
                //linkAllaSchedaTec.appendChild(imgPoster);   //attacco al link
            const footer = document.createElement("ul");
            footer.className="list-group list-group-flush ulHide"
            card.appendChild(footer);
                const elementoLista3 = document.createElement("li");
                elementoLista3.className="list-group-item bg-dark text-white text-center";
                footer.appendChild(elementoLista3);
                    const nodoRuntime = document.createTextNode(media.Runtime);
                    elementoLista3.appendChild(nodoRuntime);
                const elementoLista4 = document.createElement("li");
                elementoLista4.className="list-group-item bg-dark text-white text-center";
                footer.appendChild(elementoLista4);
                    const nodoDirector = document.createTextNode(media.Director);
                    elementoLista4.appendChild(nodoDirector);
                const elementoLista5 = document.createElement("li");
                elementoLista5.className="list-group-item bg-dark text-white text-center";
                footer.appendChild(elementoLista5);
                    const paragrafo5 = document.createElement("p");
                    elementoLista5.appendChild(paragrafo5);
                    //elementoLista5.appendChild(nodoGenre);
                        const nodoGenre = document.createTextNode(media.Genre);
                        paragrafo5.appendChild(nodoGenre);
                    
                    
    return colonna;
   }






   /*ritorna un pacchetto con tutte le info insieme separate da uno spazio*/
   /*const createHTMLfilm = (film) => {
    const info = ["film.Title", "film.Year", "film.imdbID", "film.Type", "film.Poster"];
    const tutto = document.createElement("div");
    for(let i=0;i<info.length; i++){
         const paragrafo = document.createElement("p");
         const nodo = document.createTextNode(info[i]);
         paragrafo.appendChild(nodo);
         tutto.appendChild(paragrafo);
    }
    const immagine = createFilmPoster(film);
    tutto.appendChild(immagine);
     const spazio = document.createElement("br");
     tutto.appendChild(spazio);
     return tutto;
 }

   const createFilmPoster = (film) => {
        const imgPoster = document.createElement("img");
        imgPoster.setAttribute("class", "filmImg");
        const nodo = document.createTextNode(film.Poster); 
        imgPoster.src=nodo;
        
        
        return imgPoster;
    }

    const createFilmTitle = (film) => {
        document.getElementById("all")
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
    }*/

   /* const createHTMLcard = (film) => {
        
        const riga = document.createElement("div");
            riga.class = "row";
        const colonna = document.createElement("div");
            colonna.class = "col";
        riga.appendChild(colonna);
        riga.appendChild(colonna);
        riga.appendChild(colonna);
        const carta = document.createElement("div.card")

    }*/

    
   
/*   prova def funzionante
export const prova = () => {
   
   const main = document.getElementById("all");
   const container = document.createElement("div");
   main.appendChild(container);
   container.setAttribute("class", "bggrey");
   container.style.height = "100px";
   container.style.width = "150px";

   const riga = document.createElement("div");
   riga.setAttribute("class", "rig");
   container.appendChild(riga);
   const heading = document.createElement("h1");
   heading.setAttribute("class", "red");
   riga.appendChild(heading);
   const contenutoTestuale = document.createTextNode("PROVAAAAA");
   heading.appendChild(contenutoTestuale);
   return container;
}*/
    

 /*prova funzionante
   export const prova = () => {
   
    const main = document.getElementById("all");
    const heading = document.createElement("h1");
   heading.setAttribute("class", "red rig");
   main.appendChild(heading);
   
   const contenutoTestuale = document.createTextNode("PROVAAAAAAA");
   heading.appendChild(contenutoTestuale);
   return heading;
}*/