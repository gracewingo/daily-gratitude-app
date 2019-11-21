function setup(){    
    let canvas = getCanvas();
    let lat, lon, cityState;
    const button = document.getElementById("submit")
    const inputs = document.querySelectorAll('input');
    if('geolocation' in navigator){
        console.log("geo avail")
            navigator.geolocation.getCurrentPosition(async position => {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                document.getElementById("latitude").textContent = lat.toFixed(2);
                document.getElementById("longitude").textContent = lon.toFixed(2);
            });
    } 
    button.addEventListener("click", async event => {
        let mood = document.getElementById("mood").value;
        let grateful = document.getElementById("grateful").value;
        canvas.loadPixels();
        const image = canvas.canvas.toDataURL();
        
        const gURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAir9zLuptSbfJEMCZY-3LDny7dj19DCVk`
        const results = await fetch(gURL);
        const info = await results.json();
        cityState = info.results[7].formatted_address;
        const data = { cityState, mood, grateful, image };
        const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        for (input of inputs){ input.value = ""; }
        // on submit clear canvas 
        canvas = clear();
    });
}

function getCanvas(){
    canvas = createCanvas(320, 300);
    pixelDensity(1);
    background(255, 0, 200);
    const container = document.querySelector(".canvas-container");
    canvas.parent(container);
    return canvas;
}

  function draw() {
    stroke(255);
    strokeWeight(8);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }












/*

   TO DO: 
   - create upload feature 
   - fix that lat long bug - if location data exists, do this 


*/