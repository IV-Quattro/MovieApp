
import {URL_BASE} from "./config.js"

/*-------------------------------------HOME.HTML----------------------------------------*/


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
        //utilizzo del ritorno di jsonResponse
        .then(objResult => {
           

            const everything = document.getElementById("search");
            const argomentoDiv = document.createElement("h1");
            argomentoDiv.className = "text-white text-center strisciaColorata titoloDynamic";
                //parametro ricerca come titolo pagina -->              decodificalo!
                const nodo1 = document.createTextNode("search: " + s);
                argomentoDiv.appendChild(nodo1);
            everything.appendChild(argomentoDiv);
            //inserisco in items l' array Search ritornato con chiamata ajax
            const items = objResult.Search;
            //questa funzione genera l'insieme delle cards chiamate con parametro s
            viewItems(items);
           
        });
   }

   //richiamata da quella sopra
   const viewItems = (items) => {
    const place = document.getElementById("search");
    //creazione riga alla quale applicare un for di colonne
    const riga = document.createElement("div");
    riga.className = "row row-cols-1 row-cols-md-2 row-cols-xxl-4";
    place.appendChild(riga);
    //questo for inserisce nella variabile media il contenuto della cella dell array items
    //e ad ogni ripetizione genera la card relativa
    items.map((media) => {
        riga.appendChild(mediaCardGenerator(media));
    });
    //ritorna il div con l id dove generare HTML dinamico
    return place;
   }
        
        //chiamata da quella sopra
      //funzione per chiamare films con parametro S
      //richiama anche creazioneFooter ma alla fine ritorna la colonna con la card che si applica alla row
      const mediaCardGenerator = (media) =>{
        //creazione colonna da applicare alla row
        const colonna = document.createElement("div");
        colonna.className="col my-5" 
            const card = document.createElement("div");
            card.className="filmCard colCard";
            colonna.appendChild(card);

            //OPZIONE CON LINK <a href>
            /*
                //const linkMoreInfo = genMoreInfo(nomeFilm);
                const linkAllaSchedaTec = document.createElement("a");
                linkAllaSchedaTec.setAttribute("href", "#");
                //linkAllaSchedaTec.setAttribute("href", linkMoreInfo);
                card.appendChild(linkAllaSchedaTec);
                    //inserimento immagini in base al risultato della ricerca
                    const imgPoster = document.createElement("img");
                    imgPoster.className="filmImg";
                        imgPoster.src=media.Poster;
                        //imgPoster.addEventListener("click",genMoreInfo(media.Title));
                        imgPoster.onclick = "genMoreInfo(media.Title)";
                        linkAllaSchedaTec.appendChild(imgPoster);*/

                //OPZIONE SENZA LINK <a href>
                //const linkMoreInfo = genMoreInfo(nomeFilm);
                //inserimento immagini in base al risultato della ricerca

            const linkAllaSchedaTec = document.createElement("a");
                //const urlMoreInfo = create
            linkAllaSchedaTec.href="/moreInfo.html?keywords=" + media.Title;
                const imgPoster = document.createElement("img");
                imgPoster.className="filmImg";
                imgPoster.src=media.Poster;
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
       //chiamata da quella sopra
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
   const genMoreInfo = (nomeFilm) =>{
    
    //sostituisci spazio con %20

    //lo applico all url e mi manda alla pagina moreInfo il valore richiesto
    location.href = "/moreInfo.html?keywords=" + nomeFilm;
   }

/*-------------------------------------MOREINFO.HTML----------------------------------------*/

   //per generare pagina dinamica moreInfo relative ad 1 solo film (in modalità sincrona)
   export const apiDetail = async (t) =>{  
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
//genera contenuto pagina moreInfo
const viewDetails = (dettagli) => {
    const scheda = document.getElementById("details");
        const rigaSplash = document.createElement("div");
        rigaSplash.className = "row row-cols-1 row-cols-md-2";
        scheda.appendChild(rigaSplash);
        
            const colonna1A = genColImg(dettagli); 
            rigaSplash.appendChild(colonna1A);
            //rigaSplash.appendChild(genColImg(dettagli)); funziona ma è meno ordinata

            const colonna2A = genColEvidenza(dettagli);
            rigaSplash.appendChild(colonna2A);

            const colonna3A = genColGenerale(dettagli);
            rigaSplash.appendChild(colonna3A);

            const colonna4A = genColDati(dettagli);
            rigaSplash.appendChild(colonna4A);

        const tabellaVoti = genTabellaVoti(dettagli);
        scheda.appendChild(tabellaVoti); 

    return scheda;
}
//generazione colonna 1
const genColImg = (dettagli) =>{
const colonna1B = document.createElement("div");
colonna1B.className = "col my-5";
    const filmCardImmagine = document.createElement("div");
    filmCardImmagine.className = "filmCard posterInfoCard";
    colonna1B.appendChild(filmCardImmagine);
        const filmImmagine = document.createElement("img");
        filmImmagine.src=dettagli.Poster;
        filmImmagine.className="filmImg";
        filmImmagine.title=dettagli.Title;
        filmCardImmagine.appendChild(filmImmagine);

return colonna1B;

}

//generazione colonna 2
const genColEvidenza = (dettagli) =>{
    const colonna2B = document.createElement("div");
    colonna2B.className = "col my-5 white";

        const campoA1 = document.createElement("h1");
        campoA1.className = "diventaArancio";
            const dettTitolo = document.createTextNode(dettagli.Title);
            campoA1.appendChild(dettTitolo);
        colonna2B.appendChild(campoA1);

        const campoA2 = document.createElement("h3");
            const dettGenre = document.createTextNode(dettagli.Genre);
            campoA2.appendChild(dettGenre);
        colonna2B.appendChild(campoA2);

        const campoA3 = document.createElement("h6");
            const dettYear = document.createTextNode(dettagli.Year);
            campoA3.appendChild(dettYear);
        colonna2B.appendChild(campoA3);

        const campoA4 = document.createElement("h4");
            const dettPlot = document.createTextNode("Plot: ");
            campoA4.appendChild(dettPlot);
            dettPlot.appendData(dettagli.Plot); 
            //devo trovare il modo di mettere tutto in un <p> senza andare poi a capo      
        colonna2B.appendChild(campoA4);

        const campoA5 = document.createElement("h5");
            const dettAwards = document.createTextNode("Awards: ");
            campoA5.appendChild(dettAwards);
            dettAwards.appendData(dettagli.Awards); 
            //devo trovare il modo di mettere tutto in un <p> senza andare poi a capo      
        colonna2B.appendChild(campoA5);

        const campoA6 = document.createElement("div");//nuova riga con i bottoni
        campoA6.className = "row row-cols-sm-2";
            //bottone1
            const col6I= document.createElement("div");
            col6I.className = "col";
                const linkBtnStream = document.createElement("a");
                linkBtnStream.href = "#";
                    const btn1 = document.createElement("button");
                    btn1.type = "button";
                    btn1.className = "btn btn-primary btnStreaming";
                        const imgStreaming = document.createElement("img");
                        imgStreaming.src = "https://img.icons8.com/ios/100/undefined/circled-play--v1.png";
                        imgStreaming.title = "Free download";
                        //<!--<a target="_blank" href="https://icons8.com/icon/3017/calamita">Calamita icon by Icons8</a>-->
                        btn1.appendChild(imgStreaming);
                    linkBtnStream.appendChild(btn1);
                col6I.appendChild(linkBtnStream);
            campoA6.appendChild(col6I);
            //bottone2
            const col6II= document.createElement("div");
            col6II.className = "col";
                const linkBtnMagnet = document.createElement("a");
                linkBtnMagnet.href = "#";
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

const aCapo = document.createElement("br");
//generazione colonna 3
const genColGenerale = (dettagli) =>{
    const colonna3B = document.createElement("div");
    colonna3B.className = "col my-5 white";

        const campoB1 = document.createElement("h3");
            const dettGenerale = document.createTextNode("GENERALE");
            //dettGenerale.appendData(aCapo); non funziona aCapo
            campoB1.appendChild(dettGenerale);
        colonna3B.appendChild(campoB1);

        const campoB2 = document.createElement("h6");
            const dettDirector = document.createTextNode("Director: ");
            campoB2.appendChild(dettDirector);
                const dettDirPar = document.createElement("p");
                    const dirPar = document.createTextNode(dettagli.Director);
                    //dettDirector.appendChild(dirPar);
                    dettDirPar.appendChild(dirPar);
                    //campoB2.appendChild(dirPar)
                campoB2.appendChild(dettDirPar);
        colonna3B.appendChild(campoB2);

        const campoB3 = document.createElement("h6");
            const dettWriter = document.createTextNode("Writers: ");
            campoB3.appendChild(dettWriter);
                const dettWriPar = document.createElement("p");
                    const WriPar = document.createTextNode(dettagli.Writer);
                dettWriPar.appendChild(WriPar);
            campoB3.appendChild(dettWriPar);
        colonna3B.appendChild(campoB3);

        const campoB4 = document.createElement("h6");
            const dettActor = document.createTextNode("Actors: ");
            campoB4.appendChild(dettActor);
                const dettActPar = document.createElement("p");
                    const ActPar = document.createTextNode(dettagli.Actors);
                dettActPar.appendChild(ActPar);
            campoB4.appendChild(dettActPar);
        colonna3B.appendChild(campoB4);

        const campoB5 = document.createElement("h6");
            const dettCountry = document.createTextNode("Country: ");
            campoB5.appendChild(dettCountry);
                const dettCounPar = document.createElement("p");
                    const CounPar = document.createTextNode(dettagli.Country);
                dettCounPar.appendChild(CounPar);
            campoB5.appendChild(dettCounPar);
        colonna3B.appendChild(campoB5);

        const campoB6 = document.createElement("h6");
            const dettProduction = document.createTextNode("Production: ");
            campoB6.appendChild(dettProduction);
                const dettProdPar = document.createElement("p");
                    const ProdPar = document.createTextNode(dettagli.Production);
                dettProdPar.appendChild(ProdPar);
            campoB6.appendChild(dettProdPar);
        colonna3B.appendChild(campoB6);

        const campoB7 = document.createElement("h6");
            const dettWebsite = document.createTextNode("Website: ");
            campoB7.appendChild(dettWebsite);
                const dettWebAnc = document.createElement("a");
                dettWebAnc.href = dettagli.Website;   
            campoB7.appendChild(dettWebAnc);
        colonna3B.appendChild(campoB7);

    return colonna3B;
}

//generazione colonna 4
const genColDati = (dettagli) =>{
    const colonna4B = document.createElement("div");
    colonna4B.className = "col my-5 white";

        const campoC1 = document.createElement("h3");
            const dettDati = document.createTextNode("DATI FILM");
            campoC1.appendChild(dettDati);
        colonna4B.appendChild(campoC1);

        const campoC2 = document.createElement("h6");
            const dettBox = document.createTextNode("Boxoffice: ");
            campoC2.appendChild(dettBox);
                const dettBoxPar = document.createElement("p");
                    const BoxPar = document.createTextNode(dettagli.Boxoffice);
                dettBoxPar.appendChild(BoxPar);
            campoC2.appendChild(dettBoxPar);
        colonna4B.appendChild(campoC2);

        const campoC3 = document.createElement("h6");
            const dettRelised = document.createTextNode("Released: ");
            campoC3.appendChild(dettRelised);
                const dettRelPar = document.createElement("p");
                    const RelPar = document.createTextNode(dettagli.Released);
                dettRelPar.appendChild(RelPar);
            campoC3.appendChild(dettRelPar);
        colonna4B.appendChild(campoC3);

        const campoC4 = document.createElement("h6");
            const dettDVD = document.createTextNode("DVD: ");
            campoC4.appendChild(dettDVD);
                const dettDVDPar = document.createElement("p");
                    const DVDPar = document.createTextNode(dettagli.DVD);
                dettDVDPar.appendChild(DVDPar);
            campoC4.appendChild(dettDVDPar);
        colonna4B.appendChild(campoC4);

        const campoC5 = document.createElement("h6");
            const dettLanguage = document.createTextNode("Language: ");
            campoC5.appendChild(dettLanguage);
                const dettLangPar = document.createElement("p");
                    const LangPar = document.createTextNode(dettagli.Language);
                dettLangPar.appendChild(LangPar);
            campoC5.appendChild(dettLangPar);
        colonna4B.appendChild(campoC5);

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
    tagTable.className = "table table-dark table-striped-columns";
        const tagTr1 = document.createElement("tr");
            const tit1 = document.createElement("h6");
             const tit1Testo = document.createTextNode("RATINGS");
             tit1.appendChild(tit1Testo);
        tagTr1.appendChild(tit1);
    tagTable.appendChild(tagTr1);
        const tagTr2 = document.createElement("tr");
            const tagTh1 = document.createElement("th");
                const rat1 = document.createTextNode(dettagli.Ratings);
            tagTh1.appendChild(rat1);
        tagTr2.appendChild(tagTh1);
    tagTable.appendChild(tagTr2);


    return tagTable;
}