const express = require ('express');
const Datastore = require('nedb');
const app = express();
const fs = require('fs');
const path = require('path');

app.listen(3000, () => console.log("listening at 3000!"));
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }));
app.use(express.static("exports"));

const database = new Datastore('database.db');
database.loadDatabase();

app.get("/api", (req, res) => {
    database.find({}, (err, data) => {
        if (err){ response.end(); return; }
        res.json(data);
    })
})

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp
    let img64 = data.image;
    let dataImg = img64.replace(/^data:image\/\w+;base64,/, "");
    
    fs.writeFile(`public/logs/exports/all/image_${data.timestamp}.png`, dataImg, {encoding: 'base64'}, (err) => 
        console.log('File created')
    );
    let image_file = `./exports/all/image_${data.timestamp}.png`;
    data.image = image_file;
    database.insert(data);
    response.json(data);
});

/*

i could set the imagefile to the image when i make the get request 

path module:
The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

making a GET request from logs/  to the public/exports folder 
goes here: http://localhost:3000/logs/public/exports/all/ 

learnings: 
- wherever i make a request, the PATH is from that location 
- i need to learn more about express and node.js functions and routing... 
https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs
- https://github.com/krakenjs/kraken-js/issues/490
*/
