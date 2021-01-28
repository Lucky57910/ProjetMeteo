const API_KEY = '0f2ff4573a055bf6684dd417bc11a6a6';

export async function getMeteo(lat = '0.00000000', lon = '0.00000000') {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&lang=fr&units=metric&appid=" + API_KEY;
    //console.log(url);
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getMeteo ${error.message}`);
    throw error;
  }
};