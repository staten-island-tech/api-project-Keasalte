
//https://www.w3schools.com/js/js_graphics_chartjs.asp
//2daKFNLswJB2H6mxCEMAi08YV63ws4AdKjsoAhHL
//b1WoSzHY2m7tsLycpVyt3CywMOGNIzgSD8JB4UB6
//OYuAjtm7D4Wm4zYl3fNKZR8gJtZF3w5MT0qzeEye
let URL ="https://api.stockdata.org/v1/data/eod?symbols=TSLA&api_token=OYuAjtm7D4Wm4zYl3fNKZR8gJtZF3w5MT0qzeEye";
let nom = [];
let nom1 = [];
let nom2 = [];
let nom3 = [];
let count = 0;
let count2 = 0;
let k = 0;
let s = 0;
let charting = null;

const DOM = {
  Up: document.getElementById("colorthing"),
  Down: document.getElementById("colorthing2"),
  count: document.getElementById("counter"),
  count2: document.getElementById("counter2"),
  count3: document.getElementById("counter3"),
  chart: document.getElementById("Chart"),
  'PZZA': document.getElementById('PZZA'),
  'AMZN': document.getElementById('AMZN'),
  'NVDA': document.getElementById('NVDA'),
  'TSLA': document.getElementById('TSLA'),
};

async function getData(URL) {
  try {
    const response = await fetch(URL);
    console.log(response);
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    nom.push(data);
    console.log(nom);
    console.log(Object.keys(nom[0]["data"]));
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML(
      "beforeend",
      `<dialog class="card">
        <h2 class = "text">${error}, Please Retry.</h2>
        <button id="close" autofocus> click to return </button>
      </dialog>`
      );
  }
}

async function getRandomDates(nom) {
  try {
    await getData(URL);
    const dates = Object.keys(nom[0]["data"]);
    let x = Math.floor(Math.random() * dates.length);
    console.log(x);
    nom1 = [];
    nom2 = [];
    nom3 = [];
    for (let i = x; i < x + 5; i++) {
      nom1.push(dates[i]);
      console.log(nom1);
    }
    console.log(nom1); //random numbers to grab data

    nom1.forEach((closing) => {
      nom2.push(nom[0]["data"][closing]["close"]); //get the closing value for the day
    });
    console.log(nom2);
    console.log("hehehehaw");

    nom1.forEach((date) =>
      nom3.push(nom[0]["data"][date]["date"].slice(0, 10))
    );
    console.log(nom3); //random dates; doesn't matter
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML(
      "beforeend",
      `<dialog class="card">
        <h2 class = "text">${error}, Please Retry.</h2>
        <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
      </dialog>`
      );
  }
}

async function chart() {
  try {
    await getRandomDates(nom);
    let bottomdate = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5",];
    charting = new Chart(DOM.chart, {
      type: "line",
      data: {
        labels: bottomdate,
        datasets: [
          {
            fill: true,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,1.0)",
            data: nom2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
        title:{
          display:true,
          text: 'Graph of stock price for 5 consecutive days',
          padding: {
            top:10,
            boottom:30,
          }
        },
        legend: { display:false
        },
        tooltips:{
          enabled:false
        }
      },}
    });
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML(
      "beforeend",
      `<dialog class="card">
        <h2 class = "text">${error}, Please Retry.</h2>
        <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
      </dialog>`
      );
  }
}

async function nextValue(){
  try {
    await chart();
    const seep = nom1[4];
    const keep =  parseInt(seep) + 1
    s = nom[0]["data"][seep]["close"]
    k = nom[0]["data"][keep]["close"] 
    console.log(s);
    console.log(k);
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML(
      "beforeend",
      `<dialog class="card">
        <h2 class = "text">${error}, Please Retry.</h2>
        <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
      </dialog>`
      );
  }
}

DOM.Up.addEventListener("click",function (){
  if( k > s ){
    Win();
    resetchart();
  }
  else{
    Lose();
    resetchart();
  }
})
DOM.Down.addEventListener("click",function (){
  if( k < s ){
    Win();
    resetchart();
  }
  else{
    Lose();
    resetchart();
  }
})

nextValue();

function resetchart(){
charting.destroy();
nom = [];
nextValue();
} 

function Win(){
  document.querySelector('body').insertAdjacentHTML(
    "beforeend",
    `<dialog class="card">
      <h2 class = "text">You were right!</h2>
      <h3 class = "text"> Previous Day's Closing Price: ${s}</h3>
      <h3 class = "text"> The Next Day's Closing Price: ${k}</h3>
      <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
    </dialog>`
  );
  document.querySelector("dialog").showModal();
  console.log("W")
  count++;
  Update();

  document.getElementById("close").addEventListener("click",function(){
      this.parentElement.remove();
    })
}

function Lose(){
  document.querySelector('body').insertAdjacentHTML(
    "beforeend",
    `<dialog class="card">
      <h2 class = "text">Unfortunately you lost the 50/50.</h2>
      <h3 class = "text"> Previous Day's Closing Price: ${s}</h3>
      <h3 class = "text"> The Next Day's Closing Price: ${k}</h3>
      <button alt = "click escape to return" id="close" class="button-1" autofocus> click to return </button>
    </dialog>`
  );
  document.querySelector("dialog").showModal();
  console.log("L")
  count2++;
  Update();
  document.getElementById("close").addEventListener("click",function(){
    this.parentElement.remove();
  })
}

function Update(){
  DOM.count.innerText = `Win Counter: ${count}`;
  DOM.count2.innerText = `Lose Counter: ${count2}`;
}

function changeURL(comp) {DOM[comp].addEventListener("click", function(){
URL = `https://api.stockdata.org/v1/data/eod?symbols=${comp}&api_token=OYuAjtm7D4Wm4zYl3fNKZR8gJtZF3w5MT0qzeEye`
console.log(URL);
DOM.count3.innerText = `Current Company ${comp}`
})}

changeURL('PZZA');
changeURL('AMZN');
changeURL('NVDA');
changeURL('TSLA');