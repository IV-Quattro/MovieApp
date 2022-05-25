 const URL_ONION = "https://www.omdbapi.com/?apikey=450e73c0&s=onion+movie";

 export const onion = () => {
     fetch(URL_ONION)
     .then(jsonResponse => jsonResponse.json())
     .then(objResult => {
        const movie = objResult.Search;
        console.log(movie);
     });
 }