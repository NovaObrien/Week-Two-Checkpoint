let farmables = {
  hay: {
    name: "Hay!",
    valueString: 'Market Value: $',
    value: 10.00,
    plantedTotalString: 'Planted: ',
    plantedTotal: 0,
    costString: 'Cost: $',
    cost: 2,
    costWithChildren: 2


    // season: "green"
  },
  potatoes: {
    name: "Vegtables!",
    valueString: 'Market Value: $',
    value: 25,
    plantedTotalString: 'Planted: ',
    plantedTotal: 0,
    costString: 'Cost: $',
    cost: 2
    // season: "yellow"
  },
  fruit: {
    name: "Fruit Trees!",
    valueString: 'Market Value: $',
    value: 100,
    plantedTotalString: 'Planted: ',
    plantedTotal: 0,
    costString: 'Cost: $',
    cost: 2
    // season: "yellow"
  },
  cows: {
    name: "Cattle!",
    valueString: 'Market Value: $',
    value: 250,
    plantedTotalString: 'Planted: ',
    plantedTotal: 0,
    costString: 'Cost: $',
    cost: 2
    // season: "yellow"
  }
}

let playerTotals = {
  money: {
    type: 'Checkings $',
    value: 100
  },
  children: {
    type: 'Adopted Children: ',
    value: 0,
    multiplier: 2,
    cost: 200,

  },
  helpingHands: {
    type: 'Helping Hands Hired:',
    value: 0,
    cost: 1000,
    multiplier: 20,
    seasonalCost: 500
  },
  tractor: {
    type: 'Tractors:',
    value: 0,
    cost: 1000,
    multiplier: 100,
    seasonalCost: 500,
  }
}

let fertalizer = {
  multiplier: 3,
  cost: 200
}


function draw() {
  let template = ""
  let playerStats = ""
  let infoElem = document.getElementById("infoPanel")
  let mainElem = document.getElementById("main")
  let playerElem = document.getElementById("playerStats")

  for (const key in farmables) {
    if (farmables.hasOwnProperty(key)) {
      const farmablesInfo = farmables[key];

      template += /*html */`
      <div class="col col-4 shadow rounded m-3 pr-5">
      <h5>${farmablesInfo.name}</h5>
      <h5>${farmablesInfo.plantedTotalString} ${farmablesInfo.plantedTotal}</h5>
      <h5>${farmablesInfo.valueString} ${farmablesInfo.value}</h5>
      <h5>${farmablesInfo.costString} ${farmablesInfo.cost}</h5>
      </div>`
    }
  }

  for (const key in playerTotals) {
    if (playerTotals.hasOwnProperty(key)) {
      const playerInfo = playerTotals[key];

      playerStats += /*html */`
      <div class="col shadow">
      <h5>${playerInfo.type} ${playerInfo.value}</h5>
      </div>`
    }
  }

  infoElem.innerHTML = template
  playerElem.innerHTML = playerStats
  mainElem.innerHTML = /*html*/`
  <div className="col">
  <img src="Images/pixil-frame-0.png" class="btn btn-lg" onclick="Playerclick()"/>
  </div>
<div className="col">
<button class="btn btn-lg btn-info" onclick=autoUpgrade()>Helping Hands $${playerTotals.helpingHands.cost}</button>
<button class="btn btn-lg btn-info" onclick=tractorUpgrade()>Purchase Tractor $${playerTotals.tractor.cost}</button>

<button class="btn btn-lg btn-info" onclick=clickerUpgrade()>Adopt $${playerTotals.children.cost}</button>
<button class="btn btn-lg btn-info" onclick=fertalizeUpgrade()>Fertalize $${fertalizer.cost}</button>
<button class="btn btn-lg btn-info" onclick=sell()>Sell Hay</button>
</div>`

}
function Playerclick() {
  if (playerTotals.money.value < farmables.hay.costWithChildren) {

  } else {
    playerTotals.money.value -= farmables.hay.costWithChildren
    farmables.hay.plantedTotal += playerTotals.children.value + 1
  }
  draw()
}

function clickerUpgrade() {
  if (playerTotals.money.value < playerTotals.children.cost) {

  } else {
    playerTotals.children.value += 1
    playerTotals.money.value -= playerTotals.children.cost
    playerTotals.children.cost *= playerTotals.children.multiplier
    farmables.hay.costWithChildren = playerTotals.children.value * farmables.hay.cost + 2
  }
  draw()
}

function fertalizeUpgrade() {
  if (playerTotals.money.value < fertalizer.cost) {

  } else {
    farmables.hay.value *= fertalizer.multiplier
    playerTotals.money.value -= fertalizer.cost
    fertalizer.cost *= fertalizer.multiplier
  }
  draw()
}

function tractorUpgrade() {
  if (playerTotals.money.value < playerTotals.tractor.cost) {

  } else {
    playerTotals.tractor.value += 1
    playerTotals.money.value -= playerTotals.tractor.cost
    playerTotals.tractor.cost *= playerTotals.tractor.multiplier
  }
  draw()
}

function autoUpgrade() {
  if (playerTotals.money.value < playerTotals.helpingHands.cost) {

  } else {
    playerTotals.helpingHands.value += 1
    playerTotals.money.value -= playerTotals.helpingHands.cost
    playerTotals.helpingHands.cost *= playerTotals.helpingHands.multiplier
  }
  draw()
}

function autoAmounts() {
  farmables.hay.plantedTotal += playerTotals.helpingHands.value * playerTotals.helpingHands.multiplier

  farmables.hay.plantedTotal += playerTotals.tractor.value * playerTotals.tractor.multiplier


  draw()
}


function autoPlant() {
  let time = 1
  setInterval(autoAmounts, 1000 * time)
}

function sell() {
  playerTotals.money.value += farmables.hay.plantedTotal * farmables.hay.value
  farmables.hay.plantedTotal = 0
  draw()
}

draw()
autoPlant()
