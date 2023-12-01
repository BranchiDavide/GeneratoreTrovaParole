const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
let words = []; //Variabile che contiene tutte le parole presenti nel dizionario xml
let errors = []; //Array in caso id errori

/**
 * Metodo per eseguire tutte le modifiche al dizionario
 * @param actions array formattato come dictionaryChanges (vedi app.js r. 48)
 * contenente tutte le modifiche da aplicare al dizionario
 */
function executeAllActions(actions){
    errors = [];
    loadWholeDictionary();
    for(let i = 0; i < actions.length; i++){
        if(actions[i][0] == "update"){
            updateAction(sanitizeInput(actions[i][1]), sanitizeInput(actions[i][2]));
        }else if(actions[i][0] == "delete"){
            deleteAction(sanitizeInput(actions[i][1]));
        }else if(actions[i][0] == "insert"){
            insertAction(sanitizeInput(actions[i][1]), sanitizeInput(actions[i][2]));
        }
    }
    updateWholeDictionary();
}

/**
 * Funzione per caricare tutte le parole presenti nel dizionario xml
 * nell'array globale words
 */
function loadWholeDictionary(){
    words = [];
    const allFileContents = fs.readFileSync('dictionary.xml', 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        if(line != "<DICTIONARY>" && line != "</DICTIONARY>"){
            line = line.replace(/<LENGTH\d>|<LENGTH\d\d>/, "");
            line = line.replace(/<\/LENGTH\d>|<\/LENGTH\d\d>/, "");
            line = line.trim();
            words.push(line);
        }
    });
}

/**
 * Funzione par aggiornare tutto il dizionario in base al contenuto
 * dell'array words.
 * Questa funzione prende tutto il contenuto dell'array words, lo formatta
 * e lo scrive in dictionary.xml
 */
function updateWholeDictionary(){
    let xmlContent = "<DICTIONARY>\n";
    for(let w of words){
        if(w != null){
            xmlContent += `<LENGTH${w.length}>${w}</LENGTH${w.length}>\n`;
        }
    }
    xmlContent += "</DICTIONARY>";
    fs.writeFile('dictionary.xml', xmlContent, (err) => {
        errors.push("Impossibile modificare il dizionario!");
    });
}

/**
 * Funzione per aggiornare una parola del dizionario.
 * La funzione aggiorna la parola nell'array words
 * @param id id della parola da aggiornare
 * @param value valore della parola
 */
function updateAction(id, value){
    id--;
    words[id] = value;
}

/**
 * Funzione per eliminare una parola dal dizionario.
 * La funzione rimuove la parola dall'array words
 * @param id id della parola da rimuovere
 */
function deleteAction(id){
    id--;
    words[id] = null;
}

/**
 * Funzione per inserire una nuova parola all'interno del dizionario.
 * La funzione inserisce la parola all'interno dell'array words
 * @param id id della parola da inserire
 * @param value valore della parola da inserire
 */
function insertAction(id, value){
    id--;
    words.splice(id, 0, value);
}

/**
 * Funzione per resettare il dizionario.
 * Questa funzione copia tutto il dizionario di backup
 * (salvato in dictionary-bkp/default-dictionary.xml) nel dizionario
 * che l'applicativo utilizza (dictionary.xml)
 */
function resetDictionary(){
    const defaultPath = "dictionary-bkp/default-dictionary.xml";
    fs.copyFile(defaultPath, 'dictionary.xml', (err) => {
        errors.push("impossibile resettare il dizionario!");
    });
}

/**
 * Funzione che sanitizza gli input che arrivano dalla richiesta
 * di modifica del dizionario.
 * La funzione grazie alla libreria sanitize-html rimuove i tag che
 * potrebbero essere essere pericolosi, inoltre rimuove anche i carateri "/" e "\""
 * e rimuove anche tutti gli spazi all'inizio e alla fine del valore.
 * Nella funzione viene fatto anche un controllo per verificare che il valore
 * (parola da inserire) non superi la lunghezza massima di 15 caratteri
 * @param value valore da sanitizzare
 * @returns valore sanitizzato
 */
function sanitizeInput(value){
    if(typeof value === "string"){
        value = value.trim();
        value = value.replace(/[\/\\]/g, "");
        value = sanitizeHtml(value , {allowedTags: [], allowedAttributes: {}});
        if(value.length > 15){
            value = value.substring(0, 15);
        }
    }
    return value;
}

module.exports = {executeAllActions, errors, resetDictionary};