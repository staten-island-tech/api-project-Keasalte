//B7IMQ6V9OVTI4OFE
//5E6XQ7EEC3KSRLTP
//lookup selectelement
//https://www.w3schools.com/js/js_graphics_chartjs.asp

//const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=NVDA&apikey=5E6XQ7EEC3KSRLTP"
const URL ="https://api.stockdata.org/v1/data/eod?symbols=TSLA&api_token=b1WoSzHY2m7tsLycpVyt3CywMOGNIzgSD8JB4UB6";
const nom = [];
let nom1 = [];
const nom2 = [];
const nom3 = [];
let count = 0;
let count2 = 0;

const DOM = {
  Up: document.getElementById("colorthing"),
  Down: document.getElementById("colorthing2"),
  count: document.getElementById("counter"),
  count2: document.getElementById("counter2"),
};

function Update(){
  DOM.count.innerText = `Win Counter: ${count}`;
  DOM.count2.innerText = `Lose Counter: ${count2}`;
}

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
    document.querySelector("h1").textContent = error;
  }
}

async function getRandomDates(nom) {
  try {
    await getData(URL);
    const dates = Object.keys(nom[0]["data"]);
    let x = Math.floor(Math.random() * dates.length);
    console.log(x);
    nom1 = [];
    for (let i = x; i < x + 5; i++) {
      nom1.push(dates[i]);
      console.log(nom1);
    }
    console.log(nom1);

    nom1.forEach((closing) => {
      nom2.push(nom[0]["data"][closing]["close"]);
    });
    console.log(nom2);
    console.log("hehehehaw");

    nom1.forEach((date) =>
      nom3.push(nom[0]["data"][date]["date"].slice(0, 10))
    );
    console.log(nom3);
  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}

async function chart(nom2) {
  try {
    await getRandomDates(nom);
    let bottomdate = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5",];
    new Chart("Chart", {
      type: "line",
      data: {
        labels: bottomdate,
        datasets: [
          {
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: nom2,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}

async function nextValue(){
  try {
    await chart(nom2);
    console.log(nom1);
    console.log(nom);
    const seep = nom1[4];
    console.log(seep);
    const keep =  parseInt(seep) + 1
    console.log(keep);
    const s = nom[0]["data"][seep]["close"]
    const k = nom[0]["data"][keep]["close"] 
    console.log(s);
    console.log(k);
    DOM.Up.addEventListener("click",function (){
      if( k > s ){
        Win();
      }
      else{
        Lose();
      }
    })
    DOM.Down.addEventListener("click",function (){
      if( k < s ){
        Win();
      }
      else{
        Lose();
      }
    })

  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}

nextValue();


function Win(){
  document.querySelector('body').insertAdjacentHTML(
    "beforeend",
    `<dialog class="card">
      <h2 class = "text">you winn</h2>
      <button id="close" autofocus> click to return </button>
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
      <h2 class = "text">you losee</h2>
      <button id="close" autofocus> click to return </button>
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

