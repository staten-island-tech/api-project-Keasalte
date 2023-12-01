
function cardCreator(charactercards) {
  document.querySelector(".app").insertAdjacentHTML(
    "beforeend",
    `<div class="card">
      <img src=${data.url} alt="" class="card-img">
    </div>`
  );
}


const URL = "http://shibe.online/api/shibes?count=2&urls=true&httpsUrls=true"

async function getData(URL){
  try {
    const response = await fetch(URL);
    console.log(response);
    
    if( response.status != 200){
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    data.forEach((petimg) => 

    )
    document.getElementById("Image1").src = URL.url
  } 
  catch (error) {
    document.querySelector("h1").textContent = error;
    
  }
}
getData(URL);