$('.search-button').on('click', function(){
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=3e7ec99d&s=${$('.input-keyword').val()}`,
    success: result => {
      const movies = result.Search;
      let cards = '';
      movies.forEach(movie => {
        cards += showCard(movie);
        
        $('.movies-container').html(cards);
  
        $('.modal-detail-button').on('click', function(){
          $.ajax({
            url: `http://www.omdbapi.com/?apikey=3e7ec99d&i=${$(this).data('imdbid')}`,
            success: (result) => {
              let modalMovie = showModal(result);
              
              $('.modal-movie').html(modalMovie);
            },
  
            error: (result) => console.log(result.responseText)
          });
        })
      });
    },
  
    error: e => {
      console.log(e)
      $('.movies-container').html(`<h1>Not Found.</h1>`);
    }
  });
});



function showCard(movie){
  return `<div class="col-md-4 my-3">
  <div class="card">
    <img src="${movie.Poster}" class="card-img-top" alt="Movie Poster">
    <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid = ${movie.imdbID}>Show Details</a>
    </div>
  </div>
</div>`
}

function showModal(result){
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${result.Poster}" alt="Movie Poster" class="img-fluid">
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${result.Title} (${result.Year})</h4></li>
        <li class="list-group-item"><strong>Director : </strong>${result.Director}</li>
        <li class="list-group-item"><strong>Actors : </strong>${result.Actors}</li>
        <li class="list-group-item"><strong>Writer : </strong>${result.Writer}</li>
        <li class="list-group-item"><strong>Genre : </strong>${result.Genre}</li>
        <li class="list-group-item"><strong>Plot : </strong><br>${result.Plot}</li>
      </ul>
    </div>
  </div>
</div>`
}