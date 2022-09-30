
import {URL_BASE} from "./config.js";
import {URL_BASE_STREAMING} from "./config.js";
import {URL_BASE_MAGNET} from "./config.js";

//console.log(URL_BASE_STREAMING + " " + URL_BASE_MAGNET)

/*----------------------------------------NAVBAR------------------------------------------*/

// <!--KeyboardEvent {isTrusted: true, key: 'Enter', code: 'Enter', location: 0, ctrlKey: false, …}
//         isTrusted: true
//         altKey: false
//         bubbles: true
//         cancelBubble: false
//         cancelable: true
//         charCode: 13
//         code: "Enter"
//         composed: true
//         ctrlKey: false
//         currentTarget: null
//         defaultPrevented: false
//         detail: 0
//         eventPhase: 0
//         isComposing: false
//         key: "Enter"
//         keyCode: 13-->
  

// VERSIONE NUOVA
export const enterKeyPressed = (event, idPaginaRicerca) => {
    console.log(event);

    if (event.keyCode === 13) 
    {
        ricercaGenerica(idPaginaRicerca);
    }
}

export const ricercaGenerica = ( idPaginaRicerca ) => {
    //const but = document.getElementById("buttonSearch3");
    //id = research3
    const inputSearch = document.getElementById( idPaginaRicerca );
    //se esiste contenuto, avvia la ricerca. altrimenti non fare niente
    if(inputSearch.value != "")
    {
        //piglio il contenuto testuale dalla barra di ricerca
        const keywords = inputSearch.value;
        //lo applico all url e mi manda alla pagina in automatico
        location.href = "./dynamic.html?keywords=" + keywords;
    }
}
        
/*---------------------------------------HOME.HTML----------------------------------------*/
/*TODO:
fare un case per gestire 1 card in particolare passandogli l' id
    per sistemare lo svarione degli anelli
fare la divisione per lettere con bootstrap
    struttura a cassetti --> collapse accordion
    quando premo il primo con la lettera A
    gli passo A come parametro e mi genera le card di tutti i film dal titolo che inizia per A
    primo cassetto: all --> resta com è
*/                //TODO: button switch a-z o random per la lista dei film

export const topDistanceCalculator = (id) => {
    const testDiv = document.getElementById(id);
    console.table(testDiv.id,testDiv.offsetTop);
    return testDiv.offsetTop;
}

export const filmCardsGenerator = () => {
    console.time();
    try {
        const wrapperContenitore = document.getElementById("collapseExample");
        const contenitore = document.getElementById("contenitoreLista");
        const rigaimdbFilms = document.getElementById("imdbFilms");
        
        //perche allora trovo la stessa lista 1000 volte?????
        contenitore.removeChild(rigaimdbFilms);
        //TODO:riscrivila
        contenitore.appendChild(rigaimdbFilms);
        
        fetch("./listaFilm.json")
            .then(responseLocale => responseLocale.json())
            .then(listaCompleta => {
                
                if (listaCompleta.ivList <= 0)
                {
                    console.log("lista vuota")
                }
                else
                {
                    // asincrona
                    getDetailedMovieArray(listaCompleta.ivList, rigaimdbFilms); 
                    // sincrona
                    console.log(wrapperContenitore.className);
                    if(wrapperContenitore.className == "collapse") {
                        wrapperContenitore.classList.remove("collapse");
                        wrapperContenitore.className("collapsing");
                        // wrapperContenitore.classList.add("collapsing");
                    }
                    
                } 
            });

    } catch (error) {
        console.error(error);
    }
}

//SYNC WAY
const getDetailedMovieArray = (ivListOriginal, rigaimdbFilms) => {
    let randomMoviesJson = [];
    ivListOriginal.map( (singoloObj) => {
        const urlID = URL_BASE+`i=${singoloObj.imdbID}`;
        
            fetch(urlID)
            .then(responseImdb => responseImdb.json())
            .then(responseJson => {
                randomMoviesJson.push(responseJson);
                console.log("randomMoviesJson.length: ", randomMoviesJson.length);
                //questo fa funzionare tutta la programmazione sync, senza questo crasha tutto
                if(randomMoviesJson.length == ivListOriginal.length) {
                    sortArray(randomMoviesJson, rigaimdbFilms);
                }
            });
    });
}

const sortArray = (notSortedArray, rigaimdbFilms) => {
    console.log("notSortedArray", notSortedArray);
    const sortedArray = notSortedArray.sort((a, b) => {
        if (a.Title < b.Title) {
            return -1;
        }
    });
    console.log("sorted: ", sortedArray);
    genCard(sortedArray, rigaimdbFilms);
}

const genCard = (sortedMoviesArray, rigaimdbFilms) => {    
    for(let i=0; i<sortedMoviesArray.length; i++)
    {
        rigaimdbFilms.appendChild(newFilmCardGenerator(sortedMoviesArray[i]));
    } 
    console.log("time:");
    console.timeEnd();
}

// const GetSortOrder = (campo) => {    
//     return function(a, b) {    
//         if (a[campo] > b[campo]) {    
//             return 1;    
//         } else if (a[campo] < b[campo]) {    
//             return -1;    
//         }    
//         return 0;    
//     }    
// } 

export const newFilmCardGenerator = (film) => {
    try {
        const newCol = document.createElement("div");
        newCol.className = "col my-5";
            const newCard = document.createElement("div");
            newCard.className = "card filmCard";
            newCol.appendChild(newCard)
                const newUl1 = document.createElement("ul");
                newUl1.className = "list-group list-group-flush ulHide lineeColorate";
                newCard.appendChild(newUl1);
                    const newLi1 = document.createElement("li");
                    newLi1.className = "list-group-item bg-dark lineeColorate";
                    newUl1.appendChild(newLi1);
                        const newHtitolo = document.createElement("h5");
                        newHtitolo.className = "card-title text-white text-center";
                        newLi1.appendChild(newHtitolo);
                            newHtitolo.append(film.Title);
                            //const newTextTitolo = document.createTextNode(film.Title);
                        const newLi2 = document.createElement("li");
                        newLi2.className = "list-group-item bg-dark text-white text-center lineeColorate";
                        newUl1.appendChild(newLi2);
                            newLi2.append(film.Released);
                        const linkID = document.createElement("a");
                        linkID.href = "./moreInfo.html?keywords_id=" + film.imdbID;
                        newCard.appendChild(linkID);
                            const newPoster = document.createElement("img");
                            newPoster.src = film.Poster;
                            newPoster.alt = "IMMAGINE FILM";
                            linkID.appendChild(newPoster);
                        const newUl2 = document.createElement("ul");
                        newUl2.className = "list-group list-group-flush ulHide lineeColorate";
                        newCard.appendChild(newUl2);

                                    const newLi3 = document.createElement("li");
                                    newLi3.className = "list-group-item bg-dark text-white text-center lineeColorate";
                                        newLi3.append(film.Released);
                                    newUl2.appendChild(newLi3);

                                    const newLi4 = document.createElement("li");
                                    newLi4.className = "list-group-item bg-dark text-white text-center lineeColorate";
                                        newLi4.append(film.Director);
                                    newUl2.appendChild(newLi4);

                                    const newLi5 = document.createElement("li");
                                    newLi5.className = "list-group-item bg-dark text-white text-center lineeColorate";
                                        newLi5.append(film.Genre);
                                    newUl2.appendChild(newLi5);
        return newCol;
    } catch(err) {
        console.error(err)
    }
}
/*-------------------------------------DYNAMIC.HTML----------------------------------------*/

 //genera contenuto pagina dynamic
//questa funzione richiama la ricerca per parametro S, solo movies
export const apiList = (s,type) => {
    //generazione url completo
    const url=URL_BASE+`s=${s}&type=${type}`;
    //fetch asincrona
    fetch(url)
        //piglia la risposta della fetch e la trasformo in stringa
        .then(jsonResponse => jsonResponse.json())
        //utilizzo del ritorno di jsonResponse in formato Json
        .then(objResult => {
            if(objResult.Response == "True")
            {
                const everything = document.getElementById("search");
                const argomentoDiv = document.createElement("h1");
                argomentoDiv.className = "text-white text-center strisciaColorata titoloDynamic";
                    //parametro ricerca come titolo pagina decodificato
                    const titoloDecodificato = s.split("%20").join(" ");
                    const nodo1 = document.createTextNode("search: " + titoloDecodificato);
                    
                    argomentoDiv.appendChild(nodo1);
                everything.appendChild(argomentoDiv);

                //inserisco in items l' array Search ritornato con chiamata ajax
                const items = objResult.Search;
                //questa funzione genera l'insieme delle cards chiamate con parametro s
                viewItems(items); 
            }
            else if(objResult.Response == "False")
            {
                location.href = "./titleNotFound.html?keywords=" + s;
            }
            
           
        });

}

   //richiamata da apiList() (se c ' è contenuto nell array search)
   const viewItems = (items) => {
    const place = document.getElementById("search");
    //creazione riga alla quale applicare un for di colonne
    const riga = document.createElement("div");
    riga.className = "row row-cols-1 row-cols-md-2 row-cols-xxl-4";
    place.appendChild(riga);
    //questo for inserisce nella variabile media il contenuto di una cella dell array items
    //e ad ogni ripetizione genera la card relativa
    items.map((media) => {
        riga.appendChild(mediaCardGenerator(media));
    });
    //ritorna il div con l id dove generare HTML dinamico
    return place;
   }
        
        //chiamata da viewItems(items)
      //funzione per chiamare films con parametro S
      //il parametro media è 1 degli oggetti nell' array search della response in json
      //richiama anche creazioneFooter ma alla fine ritorna la colonna con la card che si applica alla row
      export const mediaCardGenerator = (media) => {
        //creazione colonna da applicare alla row
        const colonna = document.createElement("div");
        colonna.className="col my-5" 
            const card = document.createElement("div");
            card.className="filmCard colCard";
            colonna.appendChild(card);
            //link a moreInfo.html clickando sull immagine
            const linkAllaSchedaTec = document.createElement("a");
            linkAllaSchedaTec.href="./moreInfo.html?keywords_id=" + media.imdbID;
                
                const imgPoster = document.createElement("img");
                imgPoster.className="filmImg";
                //immagine originale se disponibile, oppure placeholder
                imgPoster.src = imgMediaCardGenerator(media);
                //meccanica per mettere un placeholder in caso non ci sia l immagine
               /* if(media.Poster == "N/A")
                {
                    imgPoster.src = "./IV_STUFF/img/imageNotFound.svg";
                }
                else
                {imgPoster.src = media.Poster;}*/

                /*const imgPoster = document.createElement("img");
                imgPoster.className="filmImg";
                //meccanica per mettere un placeholder in caso non ci sia l immagine
                if(media.Poster == "N/A")
                {
                    imgPoster.src= "./IV_STUFF/img/imageNotFound.svg";
                }
                else
                {imgPoster.src=media.Poster;}*/
                
                    //imgPoster.addEventListener("click",genMoreInfo(media.Title));
//SISTEMA QUA CHE NON ATTENDE IL CLICK PER RIMANDARE A MOREINFO.HTML
//manda in link l ultimo film della lista
//posso salvare location.href in una var per dargli unicità
                    //imgPoster.onclick = "genMoreInfo(media.Title)";
                linkAllaSchedaTec.appendChild(imgPoster);
            card.appendChild(linkAllaSchedaTec);
                    // card.appendChild(imgPoster);
                    
    
                //creazione footer card  
                card.appendChild(creazioneFooter(media)); //mi ritorna il footer e lo attacco sotto l immagine
                        
        return colonna;

       }

       //chiamata da MediaCardGenerator
       const imgMediaCardGenerator =  (media) => {
            

            //meccanica per mettere un placeholder in caso non ci sia l immagine
            if(media.Poster == "N/A")
            {
                 //return "./IV_STUFF/img/imageNotFound.svg";
                 return "https://www.davidebertozzi.it/wp-content/uploads/2020/03/errore-404.jpg"
            }
            else
            {
                 return media.Poster;
            }
        
    }

       //chiamata da MediaCardGenerator
    const creazioneFooter = (media) =>{
        //creo tag ul
        const footer = document.createElement("ul");
        footer.className="list-group list-group-flush ulHide lineeColorate";
            //creo primo tag li titolo
            const elementoLista1 = document.createElement("li");
            elementoLista1.className="list-group-item bg-dark lineeColorate";
            footer.appendChild(elementoLista1);
                const titolo = document.createElement("h5");
                titolo.className="card-title text-white text-center";
                elementoLista1.appendChild(titolo);
                    const decodedTitle = decodeURI(media.Title);
                    const nodoTitolo = document.createTextNode(decodedTitle);
                    titolo.appendChild(nodoTitolo);
            //creo secondo tag li
            const elementoLista2 = document.createElement("li");
            elementoLista2.className="list-group-item bg-dark text-white text-center lineeColorate";
            footer.appendChild(elementoLista2);
                const nodoYear = document.createTextNode(media.Year);
                elementoLista2.appendChild(nodoYear);
        //ritorno la variabile footer <ul> con attaccati i 2 tag li
        return footer;
   }

   //collegamento a moreInfo
  /* const genMoreInfo = (nomeFilm) =>{
    //inutilizzata!!!!
    //lo applico all url e mi manda alla pagina moreInfo il valore richiesto
    location.href = "./moreInfo.html?keywords=" + nomeFilm;
   }*/

/*-------------------------------------MOREINFO.HTML----------------------------------------*/


   //per generare pagina dinamica moreInfo relative ad 1 solo film (in modalità sincrona)
   export const apiDetail = async (t) => {  
    //generazione url completo
    //deve passare come parametro I o T per ottenere dati completi
    const urlDetail = URL_BASE+`t=${t}`;
    //fetch modalità sincrona
    const response = await fetch(urlDetail);
    const result = await response.json();
    viewDetails(result);
    //equivalente a:
   /* fetch(urlDetail)
       .then(jsonResponse => jsonResponse.json())
       .then(objResult => {
           const details = objResult;
           viewDetails(details);
       });*/
}

//ricerca per id (anche questa come la precedente sfrutta viewDetail())
export const apiDetailID = async (i) => {  
    //generazione url completo
    //deve passare come parametro I o T per ottenere dati completi
    const urlDetailID = URL_BASE+`i=${i}`;
    //fetch modalità sincrona
    const response = await fetch(urlDetailID);
    const result = await response.json();
    viewDetails(result);
}

//genera contenuto pagina moreInfo
const viewDetails = (dettagli) => {
    
    const scheda = document.getElementById("details");
        //riga contente praticamente tutto
        //racchiusa dalla cornice arancio
        const rigaSplash = document.createElement("div");
        rigaSplash.className = "row row-cols-1 row-cols-lg-2 blckCentrale white";
        scheda.appendChild(rigaSplash);
        
            //immagine
            const colonna1A = genColImg(dettagli); 
            rigaSplash.appendChild(colonna1A);
            //rigaSplash.appendChild(genColImg(dettagli)); funziona ma è meno ordinata

            //info in evidenza
            const colonna2A = genColEvidenza(dettagli);
            rigaSplash.appendChild(colonna2A);

            //info generale
            const colonna3A = genColGenerale(dettagli);
            rigaSplash.appendChild(colonna3A);

            //dati
            const colonna4A = genColDati(dettagli);
            rigaSplash.appendChild(colonna4A);

        const tabellaVoti = genTabellaVoti(dettagli);
        scheda.appendChild(tabellaVoti);

    return scheda;
}
//generazione colonna 1 --> chiamata da viewDetails()
const genColImg = (dettagli) =>{
const colonna1B = document.createElement("div");
colonna1B.className = "col my-5";

    //div centrabile
    const filmCardImmagine = document.createElement("div");
    filmCardImmagine.className = "filmCard posterInfoCard";
    colonna1B.appendChild(filmCardImmagine);
        const buttonTrailer = document.createElement("a");
        const titoloCod = dettagli.Title;
        const titoloPerTrailer = titoloCod.split("%20").join("+");
        const linkTrailer = "https://www.youtube.com/results?search_query=trailer+" + titoloPerTrailer;
        buttonTrailer.setAttribute("href", linkTrailer);
        buttonTrailer.setAttribute("target", "_blank");
            const filmImmagine = document.createElement("img");
            filmImmagine.className = "posterInfoCard moreInfoImg";
            if(dettagli.Poster == "N/A")
            {
                //link in internet o non la piglia  -->     da locale funziona
                //filmImmagine.src = "./IV_STUFF/img/imageNotFound.svg";
                filmImmagine.src = "https://www.davidebertozzi.it/wp-content/uploads/2020/03/errore-404.jpg";
                filmImmagine.className="filmImg";
                filmImmagine.title=dettagli.Title;

            }
            else
            {
                filmImmagine.src=dettagli.Poster;
                filmImmagine.className="filmImg";
                filmImmagine.title=dettagli.Title;
            }
            buttonTrailer.appendChild(filmImmagine);
        filmCardImmagine.appendChild(buttonTrailer);

return colonna1B;

}

//generazione colonna 2 --> chiamata da viewDetails()
const genColEvidenza = (dettagli) =>{
    const colonna2B = document.createElement("div");
    colonna2B.className = "col my-5 white";
        //titolo film
        const campoA1 = document.createElement("h2");
        campoA1.className = "diventaArancio";
            const dettTitolo = document.createTextNode(dettagli.Title);
            campoA1.appendChild(dettTitolo);
        colonna2B.appendChild(campoA1);

        //genere film
        const campoA2 = document.createElement("h3");
        campoA2.className = "scrittaMoreInfo";
            const dettGenre = document.createTextNode(dettagli.Genre);
            campoA2.appendChild(dettGenre);
        colonna2B.appendChild(campoA2);

        //anno pubblicazione
        const campoA3 = document.createElement("h6");
        campoA3.className = "scrittaMoreInfo";
            const dettYear = document.createTextNode(dettagli.Year);
            campoA3.appendChild(dettYear);
        colonna2B.appendChild(campoA3);

        //plot
        const campoA4 = document.createElement("h4");
        campoA4.className = "scrittaMoreInfo";
            const dettPlot = document.createTextNode("Plot: ");
            campoA4.appendChild(dettPlot);
            dettPlot.appendData(dettagli.Plot); 
            //devo trovare il modo di mettere tutto in un <p> senza andare poi a capo      
        colonna2B.appendChild(campoA4);

        //trailer
        const campoA7 = document.createElement("h5");
        campoA7.className = "scrittaMoreInfo";
            const buttonTrailer = document.createElement("a");
                const titoloCod = dettagli.Title;
                const titoloPerTrailer = titoloCod.split("%20").join("+");
                const linkTrailer = "https://www.youtube.com/results?search_query=trailer+" + titoloPerTrailer;
                buttonTrailer.setAttribute("href", linkTrailer);
                buttonTrailer.setAttribute("target", "_blank");
                buttonTrailer.className = "senzaDecorazione";

                    const dettTrailer = document.createTextNode("Cerca un Trailer");
                    buttonTrailer.appendChild(dettTrailer);
            campoA7.appendChild(buttonTrailer);
                  
        colonna2B.appendChild(campoA7);

        //awards
        const campoA5 = document.createElement("h5");
        campoA5.className = "scrittaMoreInfo";
            const dettAwards = document.createTextNode("Awards: ");
            campoA5.appendChild(dettAwards);
            dettAwards.appendData(dettagli.Awards); 
            //devo trovare il modo di mettere tutto in un <p> senza andare poi a capo      
        colonna2B.appendChild(campoA5);

        //nuova riga con i bottoni
        const campoA6 = document.createElement("div");
        campoA6.className = "row row-cols-sm-2";
        
            //bottone1
            const col6I= document.createElement("div");
            col6I.className = "col";
                //bottone streaming
                const linkBtnStream = document.createElement("a");
                //URL_BASE_STREAMING from config.js
                const url_streaming = URL_BASE_STREAMING;
                console.log(url_streaming)
                console.log(url_streaming + dettagli.Title);
                linkBtnStream.href = url_streaming + dettagli.Title;
                    const btn1 = document.createElement("button");
                    btn1.type = "button";
                    btn1.className = "btn btn-primary btnStreaming";
                        const imgStreaming = document.createElement("img");
                        imgStreaming.src = "https://img.icons8.com/ios/100/undefined/circled-play--v1.png";
                        imgStreaming.title = "Free Streaming";
                        //<!--<a target="_blank" href="https://icons8.com/icon/3017/calamita">Calamita icon by Icons8</a>-->
                        btn1.appendChild(imgStreaming);
                    linkBtnStream.appendChild(btn1);
                col6I.appendChild(linkBtnStream);
            campoA6.appendChild(col6I);
            //bottone2
            const col6II= document.createElement("div");
            col6II.className = "col";
                //bottone torrent
                const linkBtnMagnet = document.createElement("a");
                //URL_BASE_MAGNET from config.js
                const url_magnet = URL_BASE_MAGNET;
                linkBtnMagnet.href = url_magnet + "/category-search/" + dettagli.Title + "/Movies/1/";
                    const btn2 = document.createElement("button");
                    btn2.type = "button";
                    btn2.className = "btn btn-primary btnMagnet";
                        const imgMagnet = document.createElement("img");
                        imgMagnet.src = "https://img.icons8.com/ios/100/undefined/magnet.png";
                        imgMagnet.title = "Magnet Download";
                        //<!--<a target="_blank" href="https://icons8.com/icon/3017/gioca-cerchiato">Gioca icon by Icons8</a>-->
                        btn2.appendChild(imgMagnet);
                    linkBtnMagnet.appendChild(btn2);
                col6II.appendChild(linkBtnMagnet);
            campoA6.appendChild(col6II);


        colonna2B.appendChild(campoA6); //chiusura row bottoni


    return colonna2B;
}




const aCapo = document.createElement("br"); //inutilizzato
//generazione colonna 3 --> chiamata da viewDetails()
const genColGenerale = (dettagli) =>{
    const colonna3B = document.createElement("div");
    colonna3B.className = "col my-5 white colonneDati";

        const campoB1 = document.createElement("h3");
        campoB1.className = "scrittaMoreInfo1";
            const dettGenerale = document.createTextNode("GENERALE");
            //dettGenerale.appendData(aCapo); non funziona aCapo
            campoB1.appendChild(dettGenerale);
        colonna3B.appendChild(campoB1);

        //direttore: 3 campi max
        const campoB2 = document.createElement("h6");
        campoB2.className = "scrittaMoreInfo2";
            const dettDirector = document.createTextNode("Director: ");
            campoB2.appendChild(dettDirector);
                const dettDirPar = document.createElement("p");
                    const dirPar = document.createTextNode(dettagli.Director);
                    //dettDirector.appendChild(dirPar);
                    dettDirPar.appendChild(dirPar);
                    //campoB2.appendChild(dirPar)
                campoB2.appendChild(dettDirPar);
        colonna3B.appendChild(campoB2);

        //writers: 3 campi max
        const campoB3 = document.createElement("h6");
        campoB3.className = "scrittaMoreInfo2";
            const dettWriter = document.createTextNode("Writers: ");
            campoB3.appendChild(dettWriter);
                const dettWriPar = document.createElement("p");
                    const WriPar = document.createTextNode(dettagli.Writer);
                dettWriPar.appendChild(WriPar);
            campoB3.appendChild(dettWriPar);
        colonna3B.appendChild(campoB3);

        //actors: 3 campi max
        const campoB4 = document.createElement("h6");
        campoB4.className = "scrittaMoreInfo2";
            const dettActor = document.createTextNode("Actors: ");
            campoB4.appendChild(dettActor);
                const dettActPar = document.createElement("p");
                    const ActPar = document.createTextNode(dettagli.Actors);
                dettActPar.appendChild(ActPar);
            campoB4.appendChild(dettActPar);
        colonna3B.appendChild(campoB4);

        //country: 3 campi max
        const campoB5 = document.createElement("h6");
        campoB5.className = "scrittaMoreInfo2";
            const dettCountry = document.createTextNode("Country: ");
            campoB5.appendChild(dettCountry);
                const dettCounPar = document.createElement("p");
                    const CounPar = document.createTextNode(dettagli.Country);
                dettCounPar.appendChild(CounPar);
            campoB5.appendChild(dettCounPar);
        colonna3B.appendChild(campoB5);

        //production
        const campoB6 = document.createElement("h6");
        campoB6.className = "scrittaMoreInfo2";
            const dettProduction = document.createTextNode("Production: ");
            campoB6.appendChild(dettProduction);
                const dettProdPar = document.createElement("p");
                    const ProdPar = document.createTextNode(dettagli.Production);
                dettProdPar.appendChild(ProdPar);
            campoB6.appendChild(dettProdPar);
        colonna3B.appendChild(campoB6);

        //website: link solo se disponibile
        const campoB7 = document.createElement("h6");
        campoB7.className = "scrittaMoreInfo2";
            const dettWebsite = document.createTextNode("Website: ");
            campoB7.appendChild(dettWebsite);
                //se il link è disponibile viene scritto url con link al sito
                //altrimenti non compare niente
                if(dettagli.Website != "N/A")
                {
                    const dettWebAnc = document.createElement("a");
                    dettWebAnc.href = dettagli.Website;   
                    urlWebsite = document.createTextNode("url");
                    dettWebAnc.appendChild(urlWebsite);
                    campoB7.appendChild(dettWebAnc);
                }
                
            

        colonna3B.appendChild(campoB7);

    return colonna3B;
}

//generazione colonna 4 DATI FILM --> chiamata da viewDetails()
const genColDati = (dettagli) =>{
    const colonna4B = document.createElement("div");
    colonna4B.className = "col my-5 white colonneDati datiFilmCol";

        const campoC1 = document.createElement("h3");
            const dettDati = document.createTextNode("DATI FILM");
            campoC1.appendChild(dettDati);
        colonna4B.appendChild(campoC1);

        //budget
        const campoC2 = document.createElement("h6");
            const dettBox = document.createTextNode("Boxoffice: ");
            campoC2.appendChild(dettBox);
                const dettBoxPar = document.createElement("p");
                    const BoxPar = document.createTextNode(dettagli.Boxoffice);
                dettBoxPar.appendChild(BoxPar);
            campoC2.appendChild(dettBoxPar);
        colonna4B.appendChild(campoC2);

        //data di rilascio film
        const campoC3 = document.createElement("h6");
            const dettRelised = document.createTextNode("Released: ");
            campoC3.appendChild(dettRelised);
                const dettRelPar = document.createElement("p");
                    const RelPar = document.createTextNode(dettagli.Released);
                dettRelPar.appendChild(RelPar);
            campoC3.appendChild(dettRelPar);
        colonna4B.appendChild(campoC3);

        //data di rilascio DVD
        const campoC4 = document.createElement("h6");
            const dettDVD = document.createTextNode("DVD: ");
            campoC4.appendChild(dettDVD);
                const dettDVDPar = document.createElement("p");
                    const DVDPar = document.createTextNode(dettagli.DVD);
                dettDVDPar.appendChild(DVDPar);
            campoC4.appendChild(dettDVDPar);
        colonna4B.appendChild(campoC4);

        //lingua: 3 campi max
        const campoC5 = document.createElement("h6");
            const dettLanguage = document.createTextNode("Language: ");
            campoC5.appendChild(dettLanguage);
                const dettLangPar = document.createElement("p");
                    const LangPar = document.createTextNode(dettagli.Language);
                dettLangPar.appendChild(LangPar);
            campoC5.appendChild(dettLangPar);
        colonna4B.appendChild(campoC5);

        //durata film
        const campoC6 = document.createElement("h6");
            const dettRuntime = document.createTextNode("Runtime: ");
            campoC6.appendChild(dettRuntime);
                const dettRunPar = document.createElement("p");
                    const RunPar = document.createTextNode(dettagli.Runtime);
                dettRunPar.appendChild(RunPar);
            campoC6.appendChild(dettRunPar);
        colonna4B.appendChild(campoC6);

    return colonna4B;
}

//generazione tabella voti
const genTabellaVoti = (dettagli) =>{
    const tagTable = document.createElement("table");
    tagTable.className = "table table-dark table-striped-columns tabellaVoti text-center";

        
        const tagTr1 = document.createElement("tr");
            const tagTh7 = document.createElement("th");
            tagTh7.setAttribute("colspan", "3");
                const tit1 = document.createElement("h6");
                    const tit1Testo = document.createTextNode("RATINGS");
                tit1.appendChild(tit1Testo);
            tagTh7.appendChild(tit1);
        tagTr1.appendChild(tagTh7);

    tagTable.appendChild(tagTr1);
    //end row 1
        
        const tagTr2 = document.createElement("tr");
            //Internet Movie Database
            const tagTh1 = document.createElement("th");
            tagTh1.className = "cellsWidth";
                const rat1 = document.createTextNode(dettagli.Ratings[0].Source);
            tagTh1.appendChild(rat1);
        tagTr2.appendChild(tagTh1);
            //Rotten Tomatoes
            const tagTh2 = document.createElement("th");
            tagTh2.className = "cellsWidth";
                const rat2 = document.createTextNode(dettagli.Ratings[1].Source);
            tagTh2.appendChild(rat2);
        tagTr2.appendChild(tagTh2);
            //Metacritic
            const tagTh3 = document.createElement("th");
            tagTh3.className = "cellsWidth";
                const rat3 = document.createTextNode(dettagli.Ratings[2].Source);
            tagTh3.appendChild(rat3);
        tagTr2.appendChild(tagTh3);

    tagTable.appendChild(tagTr2);
    //end row 2
        const tagTr3 = document.createElement("tr");
            //Internet Movie Database
            const tagTd1 = document.createElement("td");
                const valore1 = document.createTextNode(dettagli.Ratings[0].Value);
            tagTd1.appendChild(valore1)
        tagTr3.appendChild(tagTd1);
            //Rotten Tomatoes
            const tagTd2 = document.createElement("td");
                const valore2 = document.createTextNode(dettagli.Ratings[1].Value);
            tagTd2.appendChild(valore2)
        tagTr3.appendChild(tagTd2);
            //Metacritic
            const tagTd3 = document.createElement("td");
                const valore3 = document.createTextNode(dettagli.Ratings[2].Value);
            tagTd3.appendChild(valore3)
        tagTr3.appendChild(tagTd3);

    tagTable.appendChild(tagTr3);
    //end row 3

        const tagTr4 = document.createElement("tr");
            const tagTh8 = document.createElement("th");
            tagTh8.setAttribute("colspan", "3");
                const tit2 = document.createElement("h6");
                    const tit2Testo = document.createTextNode("IMDB RATINGS");
                tit2.appendChild(tit2Testo);
                tagTh8.appendChild(tit2)
        tagTr4.appendChild(tagTh8);

    tagTable.appendChild(tagTr4);
    //end row 4

        const tagTr5 = document.createElement("tr");

            //imdbVotes
            const tagTh4 = document.createElement("th");
                const rat4 = document.createTextNode("imdbVotes");  //TODO: prova a manipolarlo come un dict
            tagTh4.appendChild(rat4);
        tagTr5.appendChild(tagTh4);
            //imdbRating
            const tagTh5 = document.createElement("th");
                const rat5 = document.createTextNode("imdbRating");
            tagTh5.appendChild(rat5);
        tagTr5.appendChild(tagTh5);
            //Metascore
            const tagTh6 = document.createElement("th");
                const rat6 = document.createTextNode("Metascore");
            tagTh6.appendChild(rat6);
        tagTr5.appendChild(tagTh6);

    tagTable.appendChild(tagTr5);
    //end row 5

        const tagTr6 = document.createElement("tr");

            //imdbVotes
            const tagTd4 = document.createElement("td");
                const valore4 = document.createTextNode(dettagli.imdbVotes);
            tagTd4.appendChild(valore4)
        tagTr6.appendChild(tagTd4);
            //imdbRating
            const tagTd5 = document.createElement("td");
                const valore5 = document.createTextNode(dettagli.imdbRating);
            tagTd5.appendChild(valore5)
        tagTr6.appendChild(tagTd5);
            //Metascore
            const tagTd6 = document.createElement("td");
                const valore6 = document.createTextNode(dettagli.Metascore);
            tagTd6.appendChild(valore6)
        tagTr6.appendChild(tagTd6);

    tagTable.appendChild(tagTr6);
    //end row 5
    return tagTable;
}



/*-----------------------------------titleNotFound-----------------------------------------*/

export const pageNotFound = async (s) => {
            
    const findId = document.getElementById("redirect");
    const h1Errore = document.createElement("h1");
    h1Errore.className = "text-center white margineAvviso";
    findId.appendChild(h1Errore);
        /*per andare a capo è un po un casino quindi uso questa struttura piu ordinata
        genero prima i tag br
        poi i textnode con i testi
        poi metto tutto insieme alla fine*/

        //tag br
        const breakLine = document.createElement("br");
        const breakLine1 = document.createElement("br");

        //testo suddiviso in parti
        const testoErrore = document.createTextNode("404");
        const decodErrorTitle = s.split("%20").join(" ");
        const testoErrore1 = document.createTextNode("THE TITLE " + decodErrorTitle);
        const testoErrore2 = document.createTextNode("IS NOT FOUND");

        //unione testi e <br>
        h1Errore.append(testoErrore);
        h1Errore.append(breakLine);
        h1Errore.append(testoErrore1);
        h1Errore.append(breakLine1);
        h1Errore.append(testoErrore2);

    //operazioni sincrone per rispettare i tempi di attesa che ho imposto
    //attende tot secondi
    await delay(4000);
    //rimuove tutto il contenuto del div con id="redirect"
    findId.removeChild(h1Errore);
    //attende mezzo secondo
    await delay(500);
    //chiama questa funzione che ripopola il div di id="redirect"
    //con altro testo
    soluzione(s);

}

//chiamata da pageNotFound()
//attende il tempo passato come argomento in sincrono
const delay = async (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

//chiamata da pageNotFound()
//crea nuovo testo da mettere in sostituzione a quello appena cancellato
//e infine dopo 5s di attesa chiama ricercaAlternativa() 
const soluzione = async (s) => {
    const findId2 = document.getElementById("redirect");
    const h1Errore2 = document.createElement("h1");
    h1Errore2.className = "text-center white margineAvviso2";
    findId2.appendChild(h1Errore2);
        
        const breakLine2 = document.createElement("br"); //inutilizzato ma pronto per eventuali correzioni
        const breakLine3 = document.createElement("br");
        const breakLine4 = document.createElement("br");
        


        const testoErrore3 = document.createTextNode("BUT THE 34");
        h1Errore2.appendChild(testoErrore3);
            //sup --> supertext °^'
            const superTest = document.createElement("sup");
            const testoErrore4 = document.createTextNode("TH");
            superTest.appendChild(testoErrore4);
            h1Errore2.append(superTest);
            //h1Errore2.append(breakLine2);
                const h1Errore2A = document.createElement("h1");
                h1Errore2A.className = "text-center white";
                    const testoErrore5 = document.createTextNode("INTERNET RULE SAYS:");
                    h1Errore2A.appendChild(testoErrore5);
                    h1Errore2A.append(breakLine3);
                    h1Errore2A.append(breakLine4);

                        const testoErrore6 = document.createTextNode("IF IT EXISTS, THERE'S A ");
                        h1Errore2A.appendChild(testoErrore6);
                    //tag span inline per spezzare la frase
                    //e mandare la sola parola a comparsa in hover
                    const spanErrore2B = document.createElement("span");
                    spanErrore2B.className = "hiddenText";
                        const hiddenwords1 = document.createTextNode("PORN");
                        spanErrore2B.appendChild(hiddenwords1);
                    h1Errore2A.append(spanErrore2B);

                    const spanErrore2C = document.createElement("span");
                    
                        const footphrase = document.createTextNode(" OF IT. ");
                        spanErrore2C.appendChild(footphrase);
                    h1Errore2A.append(spanErrore2C);

                    
                    const h1Errore2D = document.createElement("h1");
                        //solo se posso fare l hover sull' intera scritta
                        //h1Errore2D.className = "hiddenText";  
                            const testoErrore7 = document.createTextNode("NO EXCEPTION.");
                            h1Errore2D.appendChild(testoErrore7);
                           // h1Errore2D.append(breakLine2);
                    
                    h1Errore2A.appendChild(h1Errore2D);

                h1Errore2.append(h1Errore2A);

    //appare tutto per 5 secondi e poi chiama la funzione di ridirect
    await delay(5000);
    //TODO: await -> ma funziona bene anche senza
    ricercaAlternativa(s);

}


const ricercaAlternativa = async (testoRicerca) => {
    location.href = "https://www.xnxx.com/search/" + testoRicerca;
}