async function getMovies() {

  let data = [];

  //Do API call Studio Ghibli
  const response = await fetch(`https://ghibliapi.herokuapp.com/films`);

  //log response if connection sucessfull
  console.log('Response: ', response);

  //log data from response into json
  data = await response.json();
  console.log('Data: ', data);


  //Array sort of recieved data from A to Z
  const comparedArray = data.sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? ((a.title > b.title) ? 1 : -1) : -1)
  console.log("Compared:", comparedArray);



  //Filter based on top rated scores
  //function filter() {
  //const scoreFilter = data.sort((a, b) => (a.rt_score > b.rt_score) ? 1 : (a.rt_score === b.rt_score) ? ((a.rt_score > b.rt_score) ? 1 : -1) : -1 )
  // console.log(scoreFilter);
  //}



  //get specific data from every array (forEach)
  let htmlString = '';
  comparedArray.forEach(movies => {
    htmlString +=
      `<div id="${movies.title}">
            <button type="button" class="show" id="${movies.title}"><h2>${movies.title}</h2></button>
            <ul class="content">
                <li id="Description" > Description: ${movies.description} </li> 
                <li id="Director"> Director: ${movies.director} </li>
                <li id="Producer"> Producer: ${movies.producer} </li> 
                <li id="Realease Date"> Release Date: ${movies.release_date} </li>
                <i id="${movies.title}" class="far fa-star"></i>
            </ul>   
         </div>`
  });


  //log selected data from array
  //console.log('htmlString', htmlString);

  //put all movies into html
  let moviesList = document.getElementById('allMovies');
  moviesList.innerHTML = htmlString;


  //Code to show and hide contet of the movies
  document.querySelectorAll('.show').forEach(button => {
    button.addEventListener('click', () => {

      const movieContent = button.nextElementSibling
      button.classList.toggle('show--active');

      if (button.classList.contains('show--active')) {
        movieContent.style.maxHeight = movieContent.scrollHeight + 'px';
      } else {
        movieContent.style.maxHeight = 0;
      }

    });
  });

  //search bar filtering
  const searchBar = document.getElementById('searchForMovies');
  searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log("search: ", searchString);
    const filteredMovies = data.filter(moviesSearch => {
      return (moviesSearch.title.toLowerCase().includes(searchString));
    });

    //Logt wat er geschreven word in het search balk
    console.log(filteredMovies);

    //controle om te zien als de ids gelijk zijn aan de filteredMovies
    var showMovies = document.getElementsByClassName('show');

    for (var j = 0; j < data.length; j++) {
      //console.log('Movies Titles: ', data[j].title);
      for (var i = 0; i < showMovies.length; i++) {
        if (filteredMovies == data[j].title.toLowerCase()) {
          showMovies[i].style.display = 'none'
        } else {
          showMovies[i].style.display = 'block';
        }
      }
    }
  });


  // add to favorites star animation
  document.querySelectorAll('.far').forEach(button => {
    button.addEventListener('click', (e) => {
      //console.log('clicked');
      if (button.classList.contains("far")) {
        button.classList.remove("far");
        button.classList.add("fas");
        addMovie(e);
      } else {
        button.classList.remove("fas");
        button.classList.add("far");;
      }
    });
  });
}



//firebase initializatie
firebase.initializeApp({
  apiKey: 'AIzaSyDPpF7vVKd97RcGOJXCEL2o6H4DTtWb2hI',
  projectId: 'otalorarojasjuancarlos'
});

const database = firebase.firestore();
const moviesCollection = database.collection("favoriteMovies");
const convertToArray = (querySnapshot) => querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));


async function renderMovieTitles() {
  moviesCollection.onSnapshot((querySnapshot) => {

    const moviesTitles = convertToArray(querySnapshot);
    //console.log('Show saved movies in database: ',moviesTitles);

    //html string voor het populaten van mijn table
    let htmlString = '';
    moviesTitles.forEach(movie => {
      //console.log('Movies: ', moviesTitles);

      let checked = '';
      if (movie.Seen) {
        checked = 'checked'
      }

      htmlString += `
      <tr id="MoviesTitles">
        <th id="${movie.id}"><input ${checked} name="checked" value="${movie.id}" type="checkBox"/></th>
        <th id="${movie.id}">${movie.MovieTitle}</th>
      </tr>
      `
    });
    //console.log(htmlString);
    document.getElementById('MoviesTable2').innerHTML = htmlString;

    let checkBox = document.getElementsByName('checked');
    checkBox.forEach(checkBoxes => {
      checkBoxes.addEventListener('change', checkBoxChange);
    });
  });
}


function checkBoxChange(event) {
  console.log('changed');
  const checked = event.target.checked;
  const id = event.target.value;
  //console.log(event);
  console.log('Checked: ', checked, 'Id: ', id);

  moviesCollection.doc(id).update({
    checked: checked
  });
}

function addMovie(e) {
  const idTitle = e.target.id;
  console.log('Toegevoegd: ', idTitle);
  moviesCollection.add({
    MovieTitle: idTitle,
    Seen: true,
  });
}



//Voert de functie getMovies uit
getMovies();

//Voert de functie renderMovieTitles uit
renderMovieTitles();