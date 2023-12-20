  //B7IMQ6V9OVTI4OFE
  //5E6XQ7EEC3KSRLTP
//lookup selectelement
//https://www.w3schools.com/js/js_graphics_chartjs.asp

//const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=NVDA&apikey=5E6XQ7EEC3KSRLTP"
const URL = "https://api.stockdata.org/v1/data/eod?symbols=TSLA&api_token=b1WoSzHY2m7tsLycpVyt3CywMOGNIzgSD8JB4UB6";
const nom = [];
const nom1 = [];
const nom2 = [];
const nom3 = [];

 async function getData(URL){
  try {
    const response = await fetch(URL);
    console.log(response);
    if( response.status != 200){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    nom.push(data);
    console.log(nom);
    console.log(Object.keys(nom[0]["data"]));
  }
  catch (error) {
    document.querySelector("h1").textContent = error;
  }
}
getData(URL);

async function getRandomDates(nom){
  try {
  await getData(URL); 
  nom1 = [];
  const dates = Object.keys(nom[0]["data"])
  let x = Math.floor(Math.random() * dates.length);
  console.log(x);
  for(let i = x; i < x+5; i++){
    nom1.push(dates[i]);
    console.log(nom1);
  }

  nom1.forEach((closing) => {
    nom2.push(nom[0]["data"][closing]["close"]);
  });
  console.log(nom2);
  console.log('hehehehaw');

  nom1.forEach((date) => nom3.push(nom[0]["data"][date]["date"].slice(0,10)));
  console.log(nom3);

   } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}
getRandomDates(nom);

async function chart(nom2,nom3){
  try {
    await getRandomDates(nom);

    new Chart("Chart", {
      type: "line",
      data: {
        labels: nom3,
        datasets: [{
          backgroundColor:"rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: nom2
        }]
      },
      options:{
        legend: {display:false}
      }
    }); 
  } catch (error) {
    document.querySelector("h1").textContent = error;
  }
}

chart(nom2,nom3);

 

