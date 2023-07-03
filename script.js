// JS Vanilla - Fetch
// fetch('http://www.omdbapi.com/?apikey=3e7ec99d&s=batman')
//   .then(response => response.json())
//     .then(response => console.log(response.Search))


// Promise
// Contoh 1
const ditepati = true;

const janji1 = new Promise((resolve, reject) => {
  if(ditepati){
    resolve('Janji ditepati!');
  }else {
    reject('Ingkar Janji!');
  }
});

function Contoh1(){
  const test = janji1.then(response => console.log(`OK! : ${response}`)).catch(response => console.log(response))
  return test;
}



// Contoh2
let ditepati2 = false;

const janji2 = new Promise((resolve, reject) => {
  if(ditepati2){
    setTimeout(() => {
      resolve('Janji ditepati setelah beberapa saat');
    }, 2000);
  }else {
    setTimeout(() => {
      reject('Janji Tidak ditepati');
    }, 2000);
  }
});

function Contoh2(){
  const test = janji2
  .finally(() => console.log('Selesai menunggu'))
  .then(response => console.log(`OK! : ${response}`))
  .catch(response => console.log(`NOOO! ${response}`))
  return test;
}

console.log('Mulai');
Contoh2();
console.log('Selesai');