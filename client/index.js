/*

How much of the forest is gone
how many hamburgers generated
how many animals lost their home

*/

var API_URL = 'https://ixd-project-backend.herokuapp.com'
var forest = document.querySelector('#forest .content');
var hamburgers = document.querySelector('#hamburgers-collected');
var goneRainforest = document.querySelector('#rainforest-percent');
var goneAnimals = document.querySelector('#animal-count');

function getRandomInt(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function createTile(type){
  var types = {
    0: {
      name: 'forest',
      format: '.svg'
    },
    1: {
      name: 'farm',
      format: '.png'
    }
  }

  var container = document.createElement('div')
  var el = document.createElement('img')
  el.src = './assets/' + types[type].name + types[type].format

  container.className = 'tile ' + types[type].name
  container.appendChild(el)
  return container
}

function append(el){
  forest.appendChild(el)
}

function setHamburgers(number){
  hamburgers.innerHTML = number
}

function setForest(forest){
  var percent = forest + '%'
  goneRainforest.style.width = percent
}

function setAnimals(animals){
  goneAnimals.innerHTML = animals
}

function fetch(){
  return Promise.all([
      axios.get(API_URL + '/board'),
      axios.get(API_URL + '/information')
    ])
}

var fetching = false
var interval = setInterval(function(){
  if (fetching) {
    return
  }
  fetching = true
  fetch().then(function(response){
    fetching = false;

    var board = response[0].data
    var information = response[1].data

    //generate board
    forest.innerHTML = ''
    board.board.forEach(function(val){
      append(createTile(val))
    })

    //generate information
    setHamburgers(information.hamburgers)
    setForest(information.rainforestGone * 100)
    setAnimals(information.homelessAnimals)

  })

}, 5000)
