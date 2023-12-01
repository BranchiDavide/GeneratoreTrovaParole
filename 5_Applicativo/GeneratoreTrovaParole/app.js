const express = require('express');
const morgan = require('morgan');
const dictionaryManager = require('./dictionary-manager.js');
const app = express();
const port = 3000;

//Formattazione della data con fuso orario Europe/Zurich per log su console
morgan.token('date', (req, res, tz) => {
    const date = new Date().toLocaleString('it-CH', { timeZone: 'Europe/Zurich' });
    return date.replace(/,/, '');
});

//Formattazione log delle richieste sulla console
const morganMiddleware = morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
    {
      stream: {
        write: (message) => console.log(message.trim()),
      },
    }
);
app.use(morganMiddleware);
app.use(express.json());

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.use(express.static(__dirname + '/public'));

//GET dell'index principale
app.get('/', (req, res) =>{
    res.sendFile(`${__dirname}/public/index.html`);
});

//GET dell'interfaccia di modifica del dizionario
app.get('/edit-dictionary', (req, res) =>{
    res.sendFile(`${__dirname}/public/html/edit-dictionary.html`);
});

//GET del file xml contenente il dizionario
app.get("/get-dictionary", (req, res) =>{
    res.sendFile(`${__dirname}/dictionary.xml`)
});

//POST delle modifiche del dizionario
app.post("/change-dictionary", (req, res) =>{
    /**
     * L'array dictionaryChanges contiene tutte le modifiche da applicare al dizionario.
     * L'array contiene un'insieme di array con all'interno le modifiche da apportare.
     * Gli array contenuti in dictionaryChanges sono formattati nel seguente modo:
     * [string azione, int id, string parola]
     * L'azione può essere update/delete/insert
     */
    let dictionaryChanges = req.body.dictionaryChanges;
    dictionaryManager.executeAllActions(dictionaryChanges);
    res.sendStatus(200);
});

//POST per il reset del dizionario
app.post("/reset-dictionary", (req,res) =>{
    if(req.body.confirm){
        dictionaryManager.resetDictionary();
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
});