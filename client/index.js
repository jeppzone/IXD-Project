var API_URL = 'https://ixd-project-backend.herokuapp.com'
var forest = document.querySelector('#forest .content');

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

function fetch(){
  return axios.get(API_URL + '/board')
}

var fetching = false
var interval = setInterval(function(){
  if (fetching) {
    return
  }
  fetching = true
  fetch().then(function(res){
    forest.innerHTML = ''
    var arr = res.data.board
    arr.forEach(function(val){
      append(createTile(val))
    })
    fetching = false
  })

}, 5000)
