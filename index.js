const express = require ('express');
const Datastore = require('nedb');
const app = express();
const fs = require('fs');

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
    data.alt = "graphic painted on a pink canvas"
    database.insert(data);
    response.json(data);
});

/*

learnings: 
- wherever i make a request, the PATH is from that location 
- learn more about express and node.js functions and routing... 
*/
