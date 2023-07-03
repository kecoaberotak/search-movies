const moviesContainer = document.querySelector('.movies-container');

$.ajax({
  url: 'http://www.omdbapi.com/?apikey=3e7ec99d&s=batman',
  success: result => {
    const movies = result.Search;
    let cards = '';
    movies.forEach(movie => {
      cards += 
              `<div class="col-md-4 my-3">
                <div class="card">
                  <img src="${movie.Poster}" class="card-img-top" alt="Movie Poster">
                  <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                    <a href="#" class="btn btn-primary">Show Details</a>
                  </div>
                </div>
              </div>`
      // Pakai vanilla JS
      // moviesContainer.innerHTML = cards;

      // Pake Jquery
      $('.movies-container').html(cards);
    });
  },

  error: e => console.log(e.responseText)
});