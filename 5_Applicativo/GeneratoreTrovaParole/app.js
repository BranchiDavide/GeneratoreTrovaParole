const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) =>{
    res.sendFile(`${__dirname}/public/index.html`);
});
app.get('/edit-dictionary', (req, res) =>{
    res.sendFile(`${__dirname}/public/html/edit-dictionary.html`);
});
app.get("/get-dictionary", (req, res) =>{
    res.sendFile(`${__dirname}/dictionary.xml`)
})