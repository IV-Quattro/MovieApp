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
           delay();
           viewItems(items);
           console.log(items);
        });
   }
   


 const viewItems = (items) => {
     
    items.map((item) => {
        console.group(item.Title);
            console.log(item.Year);
            console.log(item.Type);
            console.log(item.Poster);
        console.groupEnd();
    });

   }