const fs = require('fs');
let words = [];
let errors = [];
function executeAllActions(actions){
    errors = [];
    loadWholeDictionary();
    for(let i = 0; i < actions.length; i++){
        if(actions[i][0] == "update"){
            updateAction(actions[i][1], actions[i][2]);
        }else if(actions[i][0] == "delete"){
            deleteAction(actions[i][1]);
        }else if(actions[i][0] == "insert"){
            insertAction(actions[i][1], actions[i][2]);
        }
    }
    updateWholeDictionary();
}
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
function updateAction(id, value){
    id--;
    words[id] = value;
}
function deleteAction(id){
    id--;
    words[id] = null;
}
function insertAction(id, value){
    id--;
    words.splice(id, 0, value);
}
function resetDictionary(){
    const defaultPath = "dictionary-bkp/default-dictionary.xml";
    fs.copyFile(defaultPath, 'dictionary.xml', (err) => {
        errors.push("impossibile resettare il dizionario!");
    });
}
function sanitizeInput(){
    
}
module.exports = {executeAllActions, errors, resetDictionary};