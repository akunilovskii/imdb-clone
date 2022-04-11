# imdb-clone by Aleksandr Kunilovskii
My partial copy of IMDB website made using only vanilla JavaScript and HTML / CSS (SASS)

Live copy: https://imdb-clone-akunilovskii.netlify.app/

Features I implemented in this vanilla JS SPA project and its REACT mirror
1. Circular (infinite) 1-slide big animated horizontal carousel
2. Vertical animated 3-slide carousel linked to horizontal that's better than the original one
3. One time full circle slideshow that starts on the first page load and can be interrupted if one of the buttons or movie cards is clicked
4. On load fetch call to TMDB with randomly chosen movie genre (from 5 options) and year (from 3 options)
5. After click on any movie card fetch call is sent to TMBD to retrieve trailer links for the clicked movie.
6. Trailer window opens and first trailer starts to play automatically. 
7. If there's more than 1 traiiler in the database, all of them (maximum 5) will be played in sequence.
8. With a click on the Back button user will be returned to the home screen.
