async function getMovies(){

    let data = [];

    //Do API call Studio Ghibli
    const response = await fetch (`https://ghibliapi.herokuapp.com/films`);

    //log response if connection sucessfull
    console.log('Response: ', response);

    //log data from response into json
    data = await response.json();
    console.log('Data: ', data);     


    //Array sort of recieved data from A to Z
    const comparedArray = data.sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? ((a.title > b.title) ? 1 : -1) : -1 )
    console.log("Compared:", comparedArray);


    //Filter based on top rated scores
    //function filter() {
        //const scoreFilter = data.sort((a, b) => (a.rt_score > b.rt_score) ? 1 : (a.rt_score === b.rt_score) ? ((a.rt_score > b.rt_score) ? 1 : -1) : -1 )
       // console.log(scoreFilter);
      //}
       

      
    //get specific data from every array (forEach)
    let htmlString ='';
    data.forEach(movies => {htmlString += 
        `<div id="${movies.title}">
            <button type="button" class="show" id="${movies.title}"><h2>${movies.title} </h2></button>
            <ul class="content">
                <li id="Description" > Description:
                 ${movies.description} </li> 
                <li id="Director"> Director: ${movies.director} </li>
                <li id="Producer"> Producer: ${movies.producer} </li> 
                <li id="Realease Date"> Release Date: ${movies.release_date} </li>
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

          if(button.classList.contains('show--active')){
            movieContent.style.maxHeight = movieContent.scrollHeight + 'px'; 
          }else{
            movieContent.style.maxHeight = 0;
          }

        });
      });

      //search bar filtering
      const searchBar = document.getElementById('searchForMovies');
      searchBar.addEventListener('keyup', (e)=> {
          const searchString = e.target.value.toLowerCase();
          console.log("search: ",searchString);
          const filteredMovies = data.filter(moviesSearch =>{
            return (moviesSearch.title.toLowerCase().includes(searchString));
          });

          //update view to filter
            var elements = document.getElementsByClassName('show');
            var elements_array = [].slice.call(elements);
            var ids = elements_array .map(function(element){ return element.id });

          console.log(filteredMovies);
          console.log(ids);

          if(ids != filteredMovies){
            elements.style.display = 'none'

          }else{
            elements.style.display = 'block'
          }
      });

}

getMovies();