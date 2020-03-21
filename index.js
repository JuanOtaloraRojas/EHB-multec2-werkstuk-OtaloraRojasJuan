async function getMovies(){

    //Do API call Studio Ghibli
    const response = await fetch (`https://ghibliapi.herokuapp.com/films`);

    //log response if connection sucessfull
    console.log('Response: ', response);

    //log data from response into json
    const data = await response.json();
    console.log('Data: ', data);


    //get specific data from every array (forEach)
    let htmlString ='';
    data.forEach(movies => {htmlString += 
        `<ul>
            <h2> ${movies.title} </h2>
             <li> ${movies.id} </li> 
             <li> ${movies.title} </li>
             <li> ${movies.description} </li> 
             <li> ${movies.director} </li>
             <li> ${movies.producer} </li> 
             <li> ${movies.release_date} </li>
         </ul>`
    });

    //log selected data from array
    console.log('htmlString', htmlString);

    //put all movies into html
    let moviesList = document.getElementById('allMovies');
    moviesList.innerHTML = htmlString;
}




















getMovies();