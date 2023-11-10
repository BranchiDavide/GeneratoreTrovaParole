const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

morgan.token('date', (req, res, tz) => {
    const date = new Date().toLocaleString('it-CH', { timeZone: 'Europe/Zurich' });
    return date.replace(/,/, '');
});

const morganMiddleware = morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
    {
      stream: {
        write: (message) => console.log(message.trim()),
      },
    }
);
app.use(morganMiddleware);

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
});