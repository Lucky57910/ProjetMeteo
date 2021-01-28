const API_KEY = 'AIzaSyCvp5FIZ5FHPY5HNIRGSLQaqwuI6aM4FS8';

export async function geocoding(ville = "", pays = "", cp = "") {
  try {
    const myHeaders = new Headers();
    const address = ville + "%20" + pays + "%20" + cp;
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&language=fr&key=" + API_KEY;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getMeteo ${error.message}`);
    throw error;
  }
};

export async function photoOfPlace(address = ""){
  try {
    const myHeaders = new Headers();
    const url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + address + "&inputtype=textquery&fields=photos&key=" + API_KEY;

    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    if(JSON.stringify(json.candidates) != "[{}]"){
        return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + json.candidates[0].photos[0].photo_reference + "&key=" + API_KEY;
    }else{
        return "https://media.giphy.com/media/m5oQabBdoOye4/giphy.gif";
    }
  } catch (error) {
    console.log(`Error with function photoOfPlace ${error.message}`);
    throw error;
  }
}

export async function reverseGeocoding(lat= "0.00000000", lon = "0.00000000") {
  try {
    const latlng = lat + "," + lon;
    const myHeaders = new Headers();
    const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&language=fr&key=" + API_KEY;
    //return latlng;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function reverseGeocoding ${error.message}`);
    throw error;
  }
};