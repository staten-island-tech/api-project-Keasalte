//B7IMQ6V9OVTI4OFE
//lookup selectelement
//https://www.w3schools.com/js/js_graphics_chartjs.asp

const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=NVDA&apikey=B7IMQ6V9OVTI4OFE"
const nom = [];

async function getData(URL){
  try {
    const response = await fetch(URL);
    console.log(response);
    
    if( response.status != 200){
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    nom.push(data);
    console.log(nom);
    console.log(Object.keys(nom[0]["Monthly Time Series"]));
  }
  catch (error) {
    document.querySelector("h1").textContent = error;
  }
}
getData(URL);

async function getRandomDates(nom){
  try {
  await getData(URL);
  const dates = Object.keys(nom[0]["Monthly Time Series"])
  const nom1 = [];
/*   console.log(dates); */
  let x = Math.floor(Math.random() * dates.length);
  console.log(x);
  nom1.push(dates[x]);
  for(let i = 0; i < 5; i++){
    x -=  1;
    nom1.push(dates[x]);
  }
  console.log(nom1);
  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}
getRandomDates(nom);

async function gettingValues(nom,nom1){
  try {
    await getRandomDates(nom);
    nom1.forEach((date) => nom[0]["Monthly Time Series"][date]["4. close"])
    console.log(nom);
  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}

gettingValues(nom,nom1);