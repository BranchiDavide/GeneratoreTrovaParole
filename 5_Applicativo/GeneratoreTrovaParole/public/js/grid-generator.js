let genBtn = document.getElementById("genBtn");
let alreadyGenerated = false;
let grid = [];
let inputs = document.getElementsByClassName("word-input");
let words = [];

/**
 * Funzione per inizializzare la matrice grid, in ogni posizione della
 * matrice viene inserita una stringa vuota
 */
function initGrid(){
    grid = [];
    for(let i = 0; i < 10; i++){
        grid.push([]);
        for(let j = 0; j < 15; j++){
            grid[i].push("");
        }
    }
}
genBtn.addEventListener("click", () =>{
    if(!alreadyGenerated){ //Controllo per verificare se la griglia è già stata generata
        //charCounter = 142; //TMP!
        if(charCounter >= 140 && charCounter <= 147){
            initGrid();
            words = [];
            for(let input of inputs){
                let value = input.value.trim();
                if(input.style.visibility = "visible" && value != ""){
                    if(value.length > 15){ //Se la parola è più lunga di 15 caratteri
                        value = value.substring(0, 15); //Tronca la parola a 15 caratteri
                    }
                    words.push(value);
                }
            }
            words = words.sort((a, b) => b.length - a.length);
            generateTable();
            alreadyGenerated = true;
        }else{
            alert("Numero di caratteri massimi/minimi non rispettato, impossibile generare la griglia");
        }
    }else{ //Se la griglia è già stata generata
        //Parola finale da inserire
        let fw = document.getElementById("finalWordInput").value.trim();
        if(fw != ""){
            if(fw.length > countEmptySpaces()){
                fw = fw.substring(0, countEmptySpaces()); //Tronca la parola finale in base al numero di spazi vuoti
            }
            placeFinalWord(fw);
            fillEmptyCells();
            displayTable();
            disableFinalWordInput();
            document.getElementsByClassName("final-words-div")[0].style.visibility = "hidden";
            genBtn.setAttribute("disabled", "");
            genBtn.style.opacity = "0.5";
            genBtn.style.cursor = "default";
        }else{
            alert("È necessario inserire la parola finale!");
        }
    }
});
//Costante per assegnare ad ogni direzione un valore intero
const Direction = {
    UP: 0,
    UP_RIGHT: 1,
    RIGHT: 2,
    DOWN_RIGHT: 3,
    DOWN: 4,
    DOWN_LEFT: 5,
    LEFT: 6,
    UP_LEFT: 7
}

/**
 * Funzione per verificare se a partire da una determinata cella della griglia
 * è possibile piazzare una parola in una determinata posizione
 * la funzione controlla se c'è abbastanza spazio per posizionare la parola
 * nella direzione passata come parametro
 * @param i coordinata della riga
 * @param j coordinata della colonna
 * @param len lunghezza della parola da piazzare
 * @param direction direzione in cui piazzare la parola (costante Direction)
 * @returns true se c'è abbastanza spazio per la parola, false altrimenti
 */
function isValidDirection(i, j, len, direction){
    switch(direction){
        case Direction.UP:
            return i - len >= 0;
        case Direction.UP_RIGHT:
            return i - len >= 0 && j + len <= 14;
        case Direction.RIGHT:
            return j + len <= 14;
        case Direction.DOWN_RIGHT:
            return i + len <= 9 && j + len <= 14;
        case Direction.DOWN:
            return i + len <= 9;
        case Direction.DOWN_LEFT:
            return i + len <= 9 && j - len >= 0;
        case Direction.LEFT:
            return j - len >= 0;
        case Direction.UP_LEFT:
            return i - len >= 0 && j - len >= 0;
    }
}

/**
 * Funzione che controlla se a partire da una determinata cella della griglia
 * è possibile piazzare la parola
 * la funzione controlla se partendo dalla cella e proseguendo nella direzione passata come
 * parametro è possibile posizionare la parola, viene controllato se nella direzione ci sono spazi
 * vuoti oppure lettere uguali che quindi possono essere sovrascritte
 * @param row coordinata della riga
 * @param column coordinata della colonna
 * @param len lunghezza della parola da piazzare
 * @param direction direzione in cui controllare (costante Direction)
 * @param word parola da piazzare
 * @returns true se è possibile piazzare la parola nella direzione, false altrimenti
 */
function isWordPlaceable(row, column, len, direction, word){
    switch(direction){
        case Direction.UP: {
            let charIndex = 0;
            let valid = true;
            for(let i = row; i >= row - len; i--){
                if(grid[i][column] != "" && grid[i][column] != word[charIndex]){
                    valid = false;
                }
                charIndex++;
            }
            return valid;
        }
        case Direction.UP_RIGHT: {
            let charIndex = 0;
            let valid = true;
            let j = column;
            for(let i = row; i >= row - len; i--){
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    valid = false;
                }
                j++;
                charIndex++;
            }
            return valid;
        }
        case Direction.RIGHT: {
            let charIndex = 0;
            let valid = true;
            for(let j = column; j <= column + len; j++){
                if(grid[row][j] != "" && grid[row][j] != word[charIndex]){
                    valid = false;
                }
                charIndex++;
            }
            return valid;
        }
        case Direction.DOWN_RIGHT: {
            let charIndex = 0;
            let valid = true;
            let j = column;
            for(let i = row; i <= row + len; i++){
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    valid = false;
                }
                j++;
                charIndex++;
            }
            return valid;
        }
        case Direction.DOWN: {
            let charIndex = 0;
            let valid = true;
            for(let i = row; i <= row + len; i++){
                if(grid[i][column] != "" && grid[i][column] != word[charIndex]){
                    valid = false;
                }
                charIndex++;
            }
            return valid;
        }
        case Direction.DOWN_LEFT: {
            let charIndex = 0;
            let valid = true;
            let j = column;
            for(let i = row; i <= row + len; i++){
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    valid = false;
                }
                j--;
                charIndex++;
            }
            return valid;
        }
        case Direction.LEFT: {
            let charIndex = 0;
            let valid = true;
            for(let j = column; j >= column - len; j--){
                if(grid[row][j] != "" && grid[row][j] != word[charIndex]){
                    valid = false;
                }
                charIndex++;
            }
            return valid;
        }
        case Direction.UP_LEFT: {
            let charIndex = 0;
            let valid = true;
            let j = column;
            for(let i = row; i >= row - len; i--){
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    valid = false;
                }
                j--;
                charIndex++;
            }
            return valid;
        }
    }
}

/**
 * Funzione che piazza effettivamente ogni carattere della parola nella griglia
 * La direzione viene scelta randomicamente da un array passato come parametro
 * @param validDirections array contenente la lista di direzioni possibili in cui può essere piazzata la parola
 */
function placeWord(validDirections){
    let random = rand(0, validDirections.length-1);
    let direction = validDirections[random];
    let row = direction[0];
    let column = direction[1];
    let len = direction[2];
    let dir = direction[3];
    let word = direction[4];

    switch(dir){
        case Direction.UP: {
            let charIndex = 0;
            for(let i = row; i >= row - len; i--){
                grid[i][column] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.UP_RIGHT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i >= row - len; i--){
                grid[i][j] = word[charIndex];
                j++;
                charIndex++;
            }
            break;
        }
        case Direction.RIGHT: {
            let charIndex = 0;
            for(let j = column; j <= column + len; j++){
                grid[row][j] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.DOWN_RIGHT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i <= row + len; i++){
                grid[i][j] = word[charIndex];
                j++;
                charIndex++;
            }
            break;
        }
        case Direction.DOWN: {
            let charIndex = 0;
            for(let i = row; i <= row + len; i++){
                grid[i][column] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.DOWN_LEFT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i <= row + len; i++){
                grid[i][j] = word[charIndex];
                j--;
                charIndex++;
            }
            break;
        }
        case Direction.LEFT: {
            let charIndex = 0;
            for(let j = column; j >= column - len; j--){
                grid[row][j] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.UP_LEFT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i >= row - len; i--){
                grid[i][j] = word[charIndex];
                j--;
                charIndex++;
            }
            break;
        }
    }
}

/**
 * Funzione che mostra a schermo la tabella html
 */
function displayTable(){
    let rows = document.querySelectorAll("#mainTable tr");
    for(let i = 0; i < rows.length; i++){
        let columns = rows[i].querySelectorAll("td");
        for(let j = 0; j < columns.length; j++){
            columns[j].textContent = grid[i][j];
        }
    }
}

/**
 * Funzione che genera la tabella, questa funzione contiene tutta la logica
 * per prendere ogni parola passata come input e posizionarla correttamente nella griglia
 */
async function generateTable(){
    let impossiblePlacement = []; //Parole che sono impossibili da piazzare
    for(let word of words){ //Per ogni parola inserita come input
        word = word.toUpperCase();
        let len = word.length - 1;
        //Array in cui verranno memorizzate le direzioni valide in cui è possibile piazzare la parola
        let validDirections = [];
        //Per ogni cella della griglia
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                //Array per memorizzare temporaneamente le direzioni in cui c'è spazio per posizionare la parola
                let tmpDir = [];
                //Controllare in quali direzioni è possibile andare
                for(const key in Direction){
                    if(isValidDirection(i, j, len, Direction[key])){
                        tmpDir.push([i, j, len, Direction[key]]); //Aggiunta alle direzioni temporanee i dati validi per quella cella
                    }
                }
                //Controllare se nelle direzioni in cui è possibile andare
                //sia anche possibile piazzare la parola
                if(tmpDir.length != 0){ //Se ci sono direzioni temporanee in cui è possibile andare 
                    for(let k = 0; k < tmpDir.length; k++){
                        if(isWordPlaceable(tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word)){
                            //Conferma che nella direzione temporanea è effettivamente possibile piazzare la parola
                            //Aggiunta dei dati all'array delle direzioni definitivamente valide
                            validDirections.push([tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word]);
                        }
                    }
                }
            }
        }
        //Se non ci sono direzioni in cui è possibile posizionare la parola
        //(la parola non è piazzabile)
        if(validDirections.length == 0){
            impossiblePlacement.push(word); //Aggiunta della parola all'array di parole non piazzabili
        }else{
            //Se ci sono delle direzioni valide in cui posizionare la parola
            placeWord(validDirections); //Piazzare la parola nella griglia
        }
    }
    displayTable();
    //Mostra le parole impossibili da piazzare
    if(impossiblePlacement.length != 0){
        for(let word of impossiblePlacement){
            for(let input of inputs){
                if(input.value.trim().toUpperCase() == word){
                    input.style.border = "2px solid orange";
                }
            }
        }
        await sleep(200);
        alert("Impossibile piazzare le parole arancioni");
        //Rimozione parole impossibili da piazzare
        let restart = false;
        do{
            restart = false;
            for(let word of impossiblePlacement){
                    for(let input of inputs){
                        if(input.value.trim().toUpperCase() == word){
                            input.value = "";
                            //Funzione di input-manager.js, rimuovere le parole impossibili da inserire e spstare le altre
                            resetNotPlaceableWords();
                            restart = true;
                            impossiblePlacement = removeItemOnce(impossiblePlacement, word);
                            break;
                        }
                    }
                    if(restart){
                        break;
                    }
            }
        }while(restart);
    }
    document.getElementsByClassName("chars-info-div")[0].style.visibility = "hidden"; //Nascondere indicatori caratteri
    disableAllWordInputs();
    alert(`Inserire la parola finale (max. ${countEmptySpaces()} caratteri) e premere su genera`);
    document.getElementById("finalWordInput").removeAttribute("disabled");
    proposeFinalWords();
}

let emptySpacesCoords = [];
function countEmptySpaces(){
    let count = 0;
    emptySpacesCoords = [];
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] == ""){
                count++;
                emptySpacesCoords.push([i, j]);
            }
        }
    }
    return count;
}

function placeFinalWord(fw){
    countEmptySpaces();
    fw = fw.toUpperCase();
    for(let i = 0; i < fw.length; i++){
        let coords = emptySpacesCoords[rand(0,emptySpacesCoords.length-1)];
        grid[coords[0]][coords[1]] = fw[i];
        emptySpacesCoords = removeItemOnce(emptySpacesCoords, coords);
    }
}

function fillEmptyCells(){
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    countEmptySpaces();
    for(let coords of emptySpacesCoords){
        grid[coords[0]][coords[1]] = alphabet[rand(0,alphabet.length-1)];
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}