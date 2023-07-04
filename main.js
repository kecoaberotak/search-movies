// Seach bar
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
  const inputKeyword = document.querySelector('.input-keyword');
  
  // Nangkep judul film berdasarkan keyword
  const movies = await getMovies(inputKeyword.value);
  
  // Nampilin list film seusai keyword
  updateUI(movies);
});


// Event binding buat nampilin modal
document.addEventListener('click', async function(e){
  if(e.target.classList.contains('modal-detail-button')){
    const imdbID = e.target.dataset.imdbid;

    // fetch data
    const movieDetail = await getMovieInfo(imdbID);

    // update ui 
    updateModalUI(movieDetail);
  }
});




// Fungsi
function getMovies(keyword){
  return fetch(`http://www.omdbapi.com/?apikey=3e7ec99d&s=${keyword}`)
  .then(response => response.json())
  .then(movies => movies.Search);
};

function getMovieInfo(imdbID){
  return fetch(`http://www.omdbapi.com/?apikey=3e7ec99d&i=${imdbID}`)
  .then(response => response.json())
  .then(result => result);
};

function updateUI(movies){
  const moviesContainer = document.querySelector('.movies-container');
  let cards = '';

  movies.forEach(movie => {
    cards += showCard(movie);
  });

  moviesContainer.innerHTML = cards;
};

function updateModalUI(movie){
  const modalContent = showModal(movie);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = modalContent;
}

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
};

function showModal(movie){
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${movie.Poster}" alt="Movie Poster" class="img-fluid">
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
        <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
        <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
        <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
        <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
        <li class="list-group-item"><strong>Plot : </strong><br>${movie.Plot}</li>
      </ul>
    </div>
  </div>
</div>`
};