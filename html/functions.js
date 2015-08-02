// Animal size, population etc
var n = 5 ;
var population = new Array() ;
var sqrtNPop = 10 ;
var nPop = sqrtNPop*sqrtNPop ;
for(var i=0 ; i<nPop ; i++){ population[i] = randomAnimal() ; }

// Food
var food = blankAnimal() ;
updateFood() ;
var foodCounter = 0 ;
var foodThreshold = 200 ;

var averageAnimal = blankAnimal() ;

// Parents
var p1 = blankAnimal() ;
var p2 = blankAnimal() ;

// Running settings
var nIterations = 1000 ;
var iterationCounter = 0 ;
var interrupt = false ;
var delay = 100 ;
var nSteps = 10 ;
var mutateProbability = 50 ;

function updateFood(){
  // Make small change to existing food
  var newFood = randomAnimal() ;
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      newFood[i][j] = newFood[i][j]*0.01 ;
      food[i][j] = food[i][j] + newFood[i][j] ;
    }
  }
  food = normaliseAnimal(food) ;
  
  // Create new food centered on randomly chosen square
  gaussianFood() ;
}

function gaussianFood(){
  var i0 = Math.floor(Math.random()*n) ;
  var j0 = Math.floor(Math.random()*n) ;
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      food[i][j] = Math.exp(-0.25*((i-i0)*(i-i0)+(j-j0)*(j-j0))) ;
    }
  }
  normaliseAnimal(food) ;
}

function normaliseAnimal(animal){
  var total = 0 ;
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      total += animal[i][j] ;
    }
  }
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      animal[i][j] = animal[i][j]/total ;
    }
  }
  return animal ;
}

function blankAnimal(){
  var animal = new Array() ;
  for (var i=0 ; i<n ; i++){
    animal[i] = new Array() ;
    for(var j=0 ; j<n ; j++){
      animal[i][j] = 0 ;
    }
  }
  return animal ;
}
function randomAnimal(){
  var animal = blankAnimal() ;
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      animal[i][j] = Math.random() ;
    }
  }
  animal = normaliseAnimal(animal) ;
  return animal ;
}

function feedAnimal(a){
  var total = 0 ;
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      //total += a[i][j]*food[i][j] ;
      total += (a[i][j]-food[i][j])*(a[i][j]-food[i][j]) ;
    }
  }
  total = - total ;
  return total ;
}

function mutate(animal){
  var i = Math.floor(Math.random()*n) ;
  var j = Math.floor(Math.random()*n) ;
  if(animal[i][j]>1e-3){
    animal[i][j] = 0.01*Math.random()*200*animal[i][j] ;
  }
  else{
    animal[i][j] = 0.1*Math.random() ;
  }
  animal = normaliseAnimal(animal) ;
  return animal ;
}

function breed(animals){
  var coinToss ;
  var a1 = animals[0] ;
  var a2 = animals[1] ;
  var a3 = animals[2] ;
  if(Math.random()*100<mutateProbability) a1 = mutate(a1) ;
  if(Math.random()*100<mutateProbability) a2 = mutate(a2) ;
  if(Math.random()*100<mutateProbability) a3 = mutate(a3) ;
  
  // Take three animals, pick the best two and breed them
  var feed1 = feedAnimal(a1) ;
  var feed2 = feedAnimal(a2) ;
  var feed3 = feedAnimal(a3) ;
  
  // Kill off the weakest animal
  if(feed1<feed2 && feed1<feed3){ p1 = a2 ; p2 = a3 ; }
  if(feed2<feed3 && feed2<feed1){ p1 = a3 ; p2 = a1 ; }
  if(feed3<feed1 && feed3<feed2){ p1 = a1 ; p2 = a2 ; }
  
  // Breed the remaining two
  var child = blankAnimal() ;
  for (var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      coinToss = Math.floor(Math.random()*2) ;
      if(coinToss<1){
        child[i][j] = p1[i][j] ;
      }
      else{
        child[i][j] = p2[i][j] ;
      }
    }
  }
  child = normaliseAnimal(child) ;
  var animals = new Array() ;
  animals[0] = p1 ;
  animals[1] = p2 ;
  animals[2] = child ;
  return animals ;
}

function start(){
  var tbody ;
  var tr ;
  var td ;
  
  var table_inner ;
  var tbody_inner ;
  var tr_inner ;
  var td_inner ;
  
  tbody = document.getElementById('tbodyFood') ;
  for (var i=0 ; i<n ; i++){
    tr = document.createElement('tr') ;
    for(var j=0 ; j<n ; j++){
      td = document.createElement('td') ;
      td.style.width  = '20px' ;
      td.style.height = '20px' ;
      td.id = 'td_food_' + i + '_' + j ;
      tr.appendChild(td) ;
    }
    tbody.appendChild(tr) ;
  }
  
  tbody = document.getElementById('tbodyAverage') ;
  for (var i=0 ; i<n ; i++){
    tr = document.createElement('tr') ;
    for(var j=0 ; j<n ; j++){
      td = document.createElement('td') ;
      td.style.width  = '20px' ;
      td.style.height = '20px' ;
      td.id = 'td_average_' + i + '_' + j ;
      tr.appendChild(td) ;
    }
    tbody.appendChild(tr) ;
  }
  
  tbody = document.getElementById('tbodyPop') ;
  for (var i=0 ; i<sqrtNPop ; i++){
    tr = document.createElement('tr') ;
    for(var j=0 ; j<sqrtNPop ; j++){
      td = document.createElement('td') ;
      td.style.width  = '12px' ;
      td.style.height = '12px' ;
      td.id = 'td_pop_' + i + '_' + j ;
      
      var table_inner = document.createElement('table') ;
      var tbody_inner = document.createElement('tbody') ;
      table_inner.id = 'table_animal_' + i + '_' + j ;
      tbody_inner.id = 'tbody_animal_' + i + '_' + j ;
      table_inner.appendChild(tbody_inner) ;
      for (var k=0 ; k<n ; k++){
        tr_inner = document.createElement('tr') ;
        for(var l=0 ; l<n ; l++){
          td_inner = document.createElement('td') ;
          td_inner.style.width  = '10px' ;
          td_inner.style.height = '10px' ;
          //td_inner.style.backgroundColor = '#ddffdd' ;
          td_inner.id = 'td_animal_' + i + '_' + j + '_' + k +  '_' + l ;
          tr_inner.appendChild(td_inner) ;
        }
        tbody_inner.appendChild(tr_inner) ;
      }
      td.appendChild(table_inner) ;
      tr.appendChild(td) ;
    }
    tbody.appendChild(tr) ;
  }
  
  drawPopulation() ;
  drawFood() ;
  updateAverage() ;
  drawAverage() ;
  step() ;
}

function step(){
  if(interrupt==true) return ;
  iterationCounter++ ;
  for(var i=0 ; i<nSteps ; i++){
    document.getElementById('iteratorCounter').innerHTML = iterationCounter + ' iterations' ;
    iterate() ;
  }
  foodCounter++ ;
  if(foodCounter>foodThreshold){
    foodCounter = 0 ;
    updateFood() ;
    drawFood() ;
  }
  if(iterationCounter<nIterations) window.setTimeout('step()', delay) ;
  return ;
}

function iterate(){
  var rand1 = Math.floor(Math.random()*nPop) ;
  var rand2 = Math.floor(Math.random()*nPop) ;
  var rand3 = Math.floor(Math.random()*nPop) ;
  var animals = new Array() ;
  animals[0] = population[rand1] ;
  animals[1] = population[rand2] ;
  animals[2] = population[rand3] ;
  animals = breed(animals) ;
  population[rand1] = animals[0] ;
  population[rand2] = animals[1] ;
  population[rand3] = animals[2] ;
  drawAnimal(rand1) ;
  drawAnimal(rand2) ;
  drawAnimal(rand3) ;
  updateAverage() ;
  drawAverage() ;
}

function drawPopulation(){
  for(var index=0 ; index<nPop ; index++){
    drawAnimal(index) ;
  }
}

function drawAnimal(index){
  var j = index%sqrtNPop ;
  var i = (index-j)/sqrtNPop ;
  animal = population[index] ;
  for(var k=0 ; k<n ; k++){
    for(var l=0 ; l<n ; l++){
      td = document.getElementById('td_animal_' + i + '_' + j + '_' + k + '_' + l) ;
      td.style.backgroundColor = color(0, animal[k][l]) ;
    }
  }
}

function drawFood(){
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      td = document.getElementById('td_food_' + i + '_' + j) ;
      td.style.backgroundColor = color(1, food[i][j]) ;
    }
  }
}

function updateAverage(){
  average = blankAnimal() ;
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      for(var k=0 ; k<nPop ; k++){
        var animal = population[k] ;
        average[i][j] = average[i][j] + animal[i][j] ;
      }
    }
  }
  normaliseAnimal(average) ;
}

function drawAverage(){
  for(var i=0 ; i<n ; i++){
    for(var j=0 ; j<n ; j++){
      td = document.getElementById('td_average_' + i + '_' + j) ;
      td.style.backgroundColor = color(0, average[i][j]) ;
    }
  }
}

function color(color, value){
  if(color==0) return 'rgb(' + Math.round(255*value*10) +   ',0,0)' ;
  if(color==1) return 'rgb(' + Math.round(255*value*10) + ',0,'     + Math.round(255*value*10) + ')' ;
}