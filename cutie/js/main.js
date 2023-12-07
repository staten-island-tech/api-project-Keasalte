
const URL = "http://shibe.online/api/shibes?count=100&urls=true&httpsUrls=true"

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
    console.log

  }
  catch (error) {
    document.querySelector("h1").textContent = error;
  }
}
getData(URL);

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
