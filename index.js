 const URL_ONION = "https://www.omdbapi.com/?apikey=450e73c0&s=onion+movie";
 const URL_NIGHTMARE_MOVIES = "https://www.omdbapi.com/?apikey=450e73c0&s=nightmare&type=movie";
 const URL_WATCHMAN_SERIES = "https://www.omdbapi.com/?apikey=450e73c0&s=watchman&type=series";

 export const onion = () => {
     fetch(URL_ONION)
     .then(jsonResponse => jsonResponse.json())
     .then(objResult => {
        const movie = objResult.Search;
        console.log("stampa the onion movie");
        console.log(movie);
     });
 }

 export const nightmare = () => {
     fetch(URL_NIGHTMARE_MOVIES)
     .then(response => response.json())
     .then(result => {
         const movies = result.Search;
         console.log("stampa movies nightmare");
         console.log(movies);
     });
 }

 export const watchman = () => {
    fetch(URL_WATCHMAN_SERIES)
    .then(response => response.json())
    .then(result => {
        const series = result.Search;
        console.log("stampa series watchman");
        console.log(series);
    });
}