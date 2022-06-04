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
           

            const everything = document.getElementById("all");
            const argomentoDiv = document.createElement("h1");
            argomentoDiv.setAttribute("class", "text-white");
            argomentoDiv.setAttribute("class", "text-center");
                const nodo1 = document.createTextNode(type);
                argomentoDiv.appendChild(nodo1);
            everything.appendChild(argomentoDiv);
            const items = objResult.Search;
            viewItems(items);
           
        });
   }

   
   const viewItems = (items) => {
    const place = document.getElementById("all");
    const riga = document.createElement("div");
    riga.setAttribute("class", "row");
    riga.setAttribute("class", "row-cols-1");
    riga.setAttribute("class", "row-cols-md-2");
    riga.setAttribute("class", "row-cols-xxl-4");
    place.appendChild(riga);



    items.map((media) => {
        riga.appendChild(mediaCardGenerator(media));
    });

    return place;
   }

   const mediaCardGenerator = (media) =>{
    //const rig = document.querySelector("row"); //riguardareee
    const colonna = document.createElement("div"); 
    colonna.setAttribute("class", "col");
    colonna.setAttribute("class", "my-5");
    
        const card = document.createElement("div");
        card.setAttribute("class", "filmCard");
        colonna.appendChild(card);
            const header = document.createElement("ul");
            header.setAttribute("class", "list-group");
            header.setAttribute("class", "list-group-flush");
            header.setAttribute("class", "ulHide");
            card.appendChild(header);
                const elementoLista1 = document.createElement("li");
                elementoLista1.setAttribute("class", "list-group-item");
                elementoLista1.setAttribute("class", "bg-dark");
                header.appendChild(elementoLista1);
                    const titolo = document.createElement("h5");
                    titolo.setAttribute("class", "card-title");
                    titolo.setAttribute("class", "text-white");
                    titolo.setAttribute("class", "text-center");
                    elementoLista1.appendChild(titolo);
                        const nodoTitolo = document.createTextNode("media.Title");
                        titolo.appendChild(nodoTitolo);

                const elementoLista2 = document.createElement("li");
                elementoLista2.setAttribute("class", "list-group-item");
                elementoLista2.setAttribute("class", "bg-dark");
                elementoLista2.setAttribute("class", "text-white");
                elementoLista2.setAttribute("class", "text-center");
                header.appendChild(elementoLista2);
                    const nodoRelised = document.createTextNode(media.Relised);
                    elementoLista2.appendChild(nodoRelised);
            const linkAllaSchedaTec = document.createElement("a");
            linkAllaSchedaTec.setAttribute("href", "#");
            card.appendChild(linkAllaSchedaTec);
                const imgPoster = document.createElement("img");
                imgPoster.setAttribute("class", "filmImg");
                imgPoster.setAttribute("title", "media.Title")
                const nodo = document.createTextNode(media.Poster); //da ERRORE QUA
                imgPoster.src=nodo;
                linkAllaSchedaTec.appendChild(imgPoster);
            const footer = document.createElement("ul");
            footer.setAttribute("class", "list-group");
            footer.setAttribute("class", "list-group-flush");
            footer.setAttribute("class", "ulHide");
            card.appendChild(footer);
                const elementoLista3 = document.createElement("li");
                elementoLista3.setAttribute("class", "list-group-item");
                elementoLista3.setAttribute("class", "bg-dark");
                elementoLista3.setAttribute("class", "text-white");
                elementoLista3.setAttribute("class", "text-center");
                footer.appendChild(elementoLista3);
                    const nodoRuntime = document.createTextNode(media.Runtime);
                    elementoLista3.appendChild(nodoRuntime);
                const elementoLista4 = document.createElement("li");
                elementoLista4.setAttribute("class", "list-group-item");
                elementoLista4.setAttribute("class", "bg-dark");
                elementoLista4.setAttribute("class", "text-white");
                elementoLista4.setAttribute("class", "text-center");
                footer.appendChild(elementoLista4);
                    const nodoDirector = document.createTextNode(media.Director);
                    elementoLista4.appendChild(nodoDirector);
                const elementoLista5 = document.createElement("li");
                elementoLista5.setAttribute("class", "list-group-item");
                elementoLista5.setAttribute("class", "bg-dark");
                elementoLista5.setAttribute("class", "text-white");
                elementoLista5.setAttribute("class", "text-center");
                footer.appendChild(elementoLista5);
                    const nodoGenre = document.createTextNode(media.Genre);
                    elementoLista5.appendChild(nodoGenre);
                


                    


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