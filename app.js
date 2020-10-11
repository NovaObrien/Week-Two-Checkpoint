let hayAuto = 0


let farmables = {
  hay: {
    name: "Hay",
    value: 10,

    // season: "green"
  },
  potatoes: {
    name: "Potatoes",
    value: 25,
    // season: "yellow"
  },
  fruit: {
    name: "Cherry Trees",
    value: 100,
    // season: "yellow"
  },
  cows: {
    name: "Cattle",
    value: 250,
    // season: "yellow"
  }
}

let playerTotals = {
  money: {
    type: '$',
    value: 0
  },
  children: {
    type: 'Adopted Children',
    value: 0
  }

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
      <div class="col-12">
      <h5>${farmablesInfo.name}</h5>
      <h5>${farmablesInfo.value}</h5>
      </div>`
    }
  }

  for (const key in playerTotals) {
    if (playerTotals.hasOwnProperty(key)) {
      const playerInfo = playerTotals[key];

      playerStats += /*html */`
      <div class="col-12">
      <h5>${playerInfo.type}</h5>
      <h5>${playerInfo.value}</h5>
      </div>`
    }
  }

  infoElem.innerHTML = template
  playerElem.innerHTML = playerStats
  mainElem.innerHTML = /*html*/`
  <img src="Images/pixil-frame-0.png" class="btn btn-lg" onclick="Playerclick()"/>

  <button class="btn btn-lg btn-info" onclick=autoUpgrade()>Helping Hands</button>
  <button class="btn btn-lg btn-info" onclick=()>Purchase Tractor</button>

  <button class="btn btn-lg btn-info" onclick=clickerUpgrade()>Adopt</button>
  <button class="btn btn-lg btn-info" onclick=sell()>Sell Hay</button>`

}

function clickerUpgrade() {
  playerTotals.children.value += 1
  draw()
}

function Playerclick() {
  // console.log('Hello')
  farmables.hay.value += playerTotals.children.value + 1

  draw()
}

function autoUpgrade() {
  hayAuto += 1

}

function autoAmounts() {

  draw()
  console.log(farmables.hay.value += hayAuto)
}



function autoPlant() {
  let time = 1.25
  setInterval(autoAmounts, 1000 * time)



  // let clearIntervalHandler = function () {
  //   clearInterval(intervalID)
  // }

  // setTimeout(clearIntervalHandler, 5000)
}
draw()
autoPlant()
