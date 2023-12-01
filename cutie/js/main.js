
const URL = "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true"

async function getData(URL){
  try {
    const response = await fetch(URL);
    console.log(response);
    
    if( response.status != 200){
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    document.querySelector("image1").src = data;

  } 

  catch (error) {
    document.querySelector("h1").textContent = error;
    
  }
}
getData(URL);