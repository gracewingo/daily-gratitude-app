const express = require ('express');
const app = express();
const fs = require('fs');
const fetch = require('node-fetch');
const Datastore = require('nedb');
const database = new Datastore('database.db');
require('dotenv').config()
database.loadDatabase();


app.get('/weather/:latlon', async (req, res) => {
    const latlon  = req.params.latlon.split(",");
    const lat = latlon[0];
    const lon = latlon[1];
    const gURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.API_KEY}`;
    const fetch_response = await fetch(gURL);
    const json = await fetch_response.json();
    //this is a proxy server 
    res.json(json);
    //if we want to use the fetch api (client side api) in node, install the node-fetch package 
})

// Handling JSON data 
app.listen(3000, () => console.log("listening at 3000!"));
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }));

app.get("/api", (req, res) => {
    database.find({}, (err, data) => {
        if (err){ res.end(); return; }
        res.json(data);
    })
})

/* Export all images to PNG on the server */
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp
    let img64 = data.image;
    let dataImg = img64.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(`public/logs/exports/all/image_${data.timestamp}.png`, dataImg, {encoding: 'base64'}, (err) => 
    console.log("file created"));

    let image_file = `./exports/all/image_${data.timestamp}.png`;
    data.image = image_file;
    data.alt = "graphic painted on a pink canvas"
    database.insert(data);
    response.json(data);
});

/*
learnings: 
- wherever i make a request, the PATH is from that location 
- learn more about express and node.js functions and routing... 
*/
