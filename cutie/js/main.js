//B7IMQ6V9OVTI4OFE
const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=B7IMQ6V9OVTI4OFE"

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

/* let rando = Math.random() *  */
dates = Object.keys(nom[0]["Monthly Time Series"])
const nom1 = [];
nom1.push(dates);
console.log(dates);
x = Math.floor(Math.random() * dates.length);
console.log(x);

/*     let contain = document.querySelector('#app');
    data.forEach((picturelink)=> contain.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
      <img src="${picturelink}" alt=""><br>
      <button class="Choose">Choose this!</button>
      </div>
      `
    )) */
