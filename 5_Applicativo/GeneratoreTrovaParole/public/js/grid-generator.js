let grid = [];
let inputs = document.getElementsByClassName("word-input");
let words = [];
function initGrid(){
    grid = [];
    for(let i = 0; i < 10; i++){
        grid.push([]);
        for(let j = 0; j < 15; j++){
            grid[i].push("");
        }
    }
}
document.getElementById("genBtn").addEventListener("click", () =>{
    charCounter = 142; //TMP!
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
    }else{
        alert("Numero di caratteri massimi/minimi non rispettato, impossibile generare la griglia");
    }
});
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
function isWordPlaceable(row, column, len, direction, word){
    switch(direction){
        case Direction.UP: {
            let charIndex = 0;
            let valid = true;
            for(let i = row; i >= row - len; i--){
                if(grid[i][column] != "" && grid[i][column] != word[charIndex]){
                    valid = false;
                }
                if(grid[i][column] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][column]} word: ${word[charIndex]}`)
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
                if(grid[i][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][j]} word: ${word[charIndex]}`)
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
                if(grid[row][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[row][j]} word: ${word[charIndex]}`)
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
                if(grid[i][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][j]} word: ${word[charIndex]}`)
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
                if(grid[i][column] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][column]} word: ${word[charIndex]}`)
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
                if(grid[i][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][j]} word: ${word[charIndex]}`)
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
                if(grid[row][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[row][j]} word: ${word[charIndex]}`)
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
                if(grid[i][j] == word[charIndex]){
                    console.log(`Intersezione? valid: ${valid} grid: ${grid[i][j]} word: ${word[charIndex]}`)
                }
                j--;
                charIndex++;
            }
            return valid;
        }
    }
}
function placeWord(validDirections){
    let random = rand(0, validDirections.length-1);
    let direction = validDirections[random];
    console.log(direction)
    let row = direction[0];
    let column = direction[1];
    let len = direction[2];
    let dir = direction[3];
    let word = direction[4];

    switch(dir){
        case Direction.UP: {
            let charIndex = 0;
            for(let i = row; i >= row - len; i--){
                if(grid[i][column] != ""){
                    console.log(`Override ${grid[i][column]} with ${word[charIndex]}`)
                }
                if(grid[i][column] != "" && grid[i][column] != word[charIndex]){
                    console.log("Errore UP");
                }
                grid[i][column] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.UP_RIGHT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i >= row - len; i--){
                if(grid[i][j] != ""){
                    console.log(`Override ${grid[i][j]} with ${word[charIndex]}`)
                }
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    console.log("Errore UP_RIGHT");
                }
                grid[i][j] = word[charIndex];
                j++;
                charIndex++;
            }
            break;
        }
        case Direction.RIGHT: {
            let charIndex = 0;
            for(let j = column; j <= column + len; j++){
                if(grid[row][j] != ""){
                    console.log(`Override ${grid[row][j]} with ${word[charIndex]}`)
                }
                if(grid[row][j] != "" && grid[row][j] != word[charIndex]){
                    console.log("Errore RIGHT");
                }
                grid[row][j] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.DOWN_RIGHT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i <= row + len; i++){
                if(grid[i][j] != ""){
                    console.log(`Override ${grid[i][j]} with ${word[charIndex]}`)
                }
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    console.log("Errore DOWN_RIGHT");
                }
                grid[i][j] = word[charIndex];
                j++;
                charIndex++;
            }
            break;
        }
        case Direction.DOWN: {
            let charIndex = 0;
            for(let i = row; i <= row + len; i++){
                if(grid[i][column] != ""){
                    console.log(`Override ${grid[i][column]} with ${word[charIndex]}`)
                }
                if(grid[i][column] != "" && grid[i][column] != word[charIndex]){
                    console.log("Errore DOWN");
                }
                grid[i][column] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.DOWN_LEFT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i <= row + len; i++){
                if(grid[i][j] != ""){
                    console.log(`Override ${grid[i][j]} with ${word[charIndex]}`)
                }
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    console.log("Errore DOWN_LEFT");
                }
                grid[i][j] = word[charIndex];
                j--;
                charIndex++;
            }
            break;
        }
        case Direction.LEFT: {
            let charIndex = 0;
            for(let j = column; j >= column - len; j--){
                if(grid[row][j] != ""){
                    console.log(`Override ${grid[row][j]} with ${word[charIndex]}`)
                }
                if(grid[row][j] != "" && grid[row][j] != word[charIndex]){
                    console.log("Errore LEFT");
                }
                grid[row][j] = word[charIndex];
                charIndex++;
            }
            break;
        }
        case Direction.UP_LEFT: {
            let charIndex = 0;
            let j = column;
            for(let i = row; i >= row - len; i--){
                if(grid[i][j] != ""){
                    console.log(`Override ${grid[i][j]} with ${word[charIndex]}`)
                }
                if(grid[i][j] != "" && grid[i][j] != word[charIndex]){
                    console.log("Errore UP_LEFT");
                }
                grid[i][j] = word[charIndex];
                j--;
                charIndex++;
            }
            break;
        }
    }
}

function displayTable(){
    let rows = document.querySelectorAll("#mainTable tr");
    for(let i = 0; i < rows.length; i++){
        let columns = rows[i].querySelectorAll("td");
        for(let j = 0; j < columns.length; j++){
            columns[j].textContent = grid[i][j];
        }
    }
}

function generateTable(){
    let impossiblePlacement = [];
    for(let word of words){
        word = word.toUpperCase();
        let len = word.length - 1;
        let validDirections = [];
        //Per ogni cella della griglia
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                let tmpDir = [];
                //Controllare in quali direzioni è possibile andare
                for(const key in Direction){
                    if(isValidDirection(i, j, len, Direction[key])){
                        tmpDir.push([i, j, len, Direction[key]]);
                    }
                }
                //Controllare se nelle direzioni in cui è possibile andare
                //sia anche possibile piazzare la parola
                if(tmpDir.length != 0){
                    for(let k = 0; k < tmpDir.length; k++){
                        if(isWordPlaceable(tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word)){
                            validDirections.push([tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word]);
                        }
                    }
                }
            }
        }
        console.log("Placing possibilities: " + validDirections.length);
        if(validDirections.length == 0){
            console.log("IMPOSSIBILE PIAZZARE --> " + word)
            impossiblePlacement.push(word);
        }else{
            placeWord(validDirections);
        }
        console.log(grid);
    }
    displayTable();
    if(impossiblePlacement.length != 0){
        for(let word of impossiblePlacement){
            for(let input of inputs){
                if(input.value.trim().toUpperCase() == word){
                    input.style.border = "2px solid orange";
                }
            }
        }
    }

}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}