function setup(){    
    let canvas = getCanvas();
    let lat, lon, cityState, mood, grateful;
    const button = document.getElementById("submit")
    const inputs = document.querySelectorAll('input');
    //on page load/set up call the /weather endpoint  - get request
    if('geolocation' in navigator){
        console.log("geo avail")
            navigator.geolocation.getCurrentPosition(async position => {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                document.getElementById("latitude").textContent = lat.toFixed(2);
                document.getElementById("longitude").textContent = lon.toFixed(2);
                const gURL = `weather/${lat},${lon}`;
                const response1 = await fetch(gURL);
                const json1 = await response1.json();
                cityState = json1.results[4].formatted_address;
            });
    } 
    button.addEventListener("click", async event => {
        mood = document.getElementById("mood").value;
        grateful = document.getElementById("grateful").value;
        canvas.loadPixels();
        const image = canvas.canvas.toDataURL();
       //cityState = ().results[0].address_components[4].long_name + ().results[0].address_components[5].long_name
        //cityState = data.results[7].formatted_address;
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
