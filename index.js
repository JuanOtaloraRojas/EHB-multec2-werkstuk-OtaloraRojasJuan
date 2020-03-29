async function getMovies(){

    //Do API call Studio Ghibli
    const response = await fetch (`https://ghibliapi.herokuapp.com/films`);

    //log response if connection sucessfull
    console.log('Response: ', response);

    //log data from response into json
    const data = await response.json();
    console.log('Data: ', data);     


    //Array sort of recieved data
    const comparedArray = data.sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? ((a.title > b.title) ? 1 : -1) : -1 )
    console.log(comparedArray);
    console.log("Compared:", comparedArray);


    //Make array to give each new id
    var myArray = [];        
    for (var i = 0; i < data.length; i++){
      myArray[i] += 1;
  }

  console.log(myArray);


    //Filter based on top rated scores
    //function filter() {
        //const scoreFilter = data.sort((a, b) => (a.rt_score > b.rt_score) ? 1 : (a.rt_score === b.rt_score) ? ((a.rt_score > b.rt_score) ? 1 : -1) : -1 )
       // console.log(scoreFilter);
      //}
    

    //get specific data from every array (forEach)
    let htmlString ='';
    data.forEach(movies => {htmlString += 
        `<ul>
            <h2> ${movies.title} </h2>
            <p></p>
            <span id="dots">...</span>
            <span id="more">
             <li id="Description"[myArray]"> Description: ${movies.description} </li> 
             <li id="Director[myArray]"> Director: ${movies.director} </li>
             <li id="Producer[myArray]"> Producer: ${movies.producer} </li> 
             <li id="Realease Date[myArray]"> Release Date: ${movies.release_date} </li>
             </span>
             <p></p>
             <button onclick= "SeeMore()" id = SeeMore>See more</button>        
         </ul>`
    });
 
     
    //log selected data from array
    console.log('htmlString', htmlString);

    //put all movies into html
    let moviesList = document.getElementById('allMovies');
    moviesList.innerHTML = htmlString;
}

getMovies();