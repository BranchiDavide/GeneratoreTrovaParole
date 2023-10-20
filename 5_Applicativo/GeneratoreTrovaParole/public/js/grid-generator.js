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
                    valid = true;
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
    for(let word of words){
        word = word.toUpperCase();
        let len = word.length - 1;
        let validDirections = [];
        //Per ogni cella della griglia
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid.length; j++){
                let tmpDir = [];
                //Controllare in quali direzioni è possibile andare
                for(const key in Direction){
                    if(isValidDirection(i, j, len, Direction[key])){
                        tmpDir.push([i, j, len, Direction[key]]);
                    }
                }
                //Controllare se nelle direzioni in cui è possibile andare
                //sia anche possibile piazzare la parola
                for(let k = 0; k < tmpDir.length; k++){
                    if(isWordPlaceable(tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word)){
                        validDirections.push([tmpDir[k][0], tmpDir[k][1], tmpDir[k][2], tmpDir[k][3], word]);
                    }
                }
            }
        }
        console.log("Placing possibilities: " + validDirections.length);
        placeWord(validDirections);
        console.log(grid);
        /*for(let riga of grid){
            let str = "";
            for(let cella of riga){
                str += cella + " ";
            }
            console.log(str)
        }*/
    }
    displayTable();




    //Vecchio algoritmo
    /*for(let word of words){
        let allValid = true;
        let len = word.length - 1;
        let coords = [];
        let direction = -1;
        do{
            coords = [];
            direction = -1;
            allValid = true;
            let validCoords = false;
            let validDirection = false;
            while(!validCoords){
                let row = random(0,9);
                let column = random(0,14);
                if(grid[row][column] == ""){
                    coords[0] = row;
                    coords[1] = column;
                    validCoords = true;
                }
            }
            let dirChose = [];
            while(!validDirection){
                let dir = random(0,2); //0 --> orizzontale, 1 --> verticale, 2 --> diagonale
                if(dirChose.includes(dir)){
                    if(dirChose.length == 3){
                        allValid = false;
                        break;
                    }else{
                        continue;
                    }
                }
                dirChose.push(dir);
                switch(dir){
                    case 0:
                        if(coords[1] + len <= 14){
                            let valid = true;
                            let charIndex = 0;
                            for(let i = coords[1]; i < coords[1] + len; i++){
                                console.log("dir 0, coords: ", coords[0],coords[1], " i: " ,i);
                                if(grid[coords[0]][i] != "" && grid[coords[0]][i] != word[charIndex]){
                                    valid = false;
                                    console.log(grid[coords[0]][i], word[charIndex])
                                }
                                charIndex++;
                            }
                            if(valid){
                                validDirection = true;
                                direction = dir;
                            }
                        }
                        break;
                    case 1:
                        if(coords[0] + len <= 9){
                            let valid = true;
                            let charIndex = 0;
                            for(let i = coords[0]; i < coords[0] + len; i++){
                                console.log("dir 1, coords: ", coords[0],coords[1], " i: " ,i);
                                if(grid[i][coords[1]] != "" && grid[i][coords[1]] != word[charIndex]){
                                    valid = false;
                                    console.log(grid[coords[i]][1], word[charIndex])
                                }
                                charIndex++;
                            }
                            if(valid){
                                validDirection = true;
                                direction = dir;
                            }
                        }
                        break;
                    case 2:
                        if(coords[0] + len <= 9 && coords[1] + len <= 14){
                            let valid = true;
                            let i = coords[0];
                            for(let j = coords[1]; j < coords[1] + len; j++){
                                console.log("dir 2, coords: ", coords[0],coords[1], " i: " ,i, " j: ", j);
                                if(grid[i][j] != ""){
                                    valid = false;
                                }
                                i++;
                            }
                            if(valid){
                                validDirection = true;
                                direction = dir;
                            }
                        }
                        break;
                }
            }    
        }while(!allValid);
        placeWord(word, len, coords, direction);
    console.log(grid);
    }*/
}
/*
function placeWord(word, len, coords, direction){
    let charIndex = 0;
    len = len + 1;
    switch(direction){
        case 0:
            for(let i = coords[1]; i < coords[1] + len; i++){
                grid[coords[0]][i] = word[charIndex];
                charIndex++;
            }
            break;
        case 1:
            for(let i = coords[0]; i < coords[0] + len; i++){
                grid[i][coords[1]] = word[charIndex];
                charIndex++;
            }
            break;
        case 2:
            let i = coords[0];
            for(let j = coords[1]; j < coords[1] + len; j++){
                grid[i][j] = word[charIndex];
                i++;
                charIndex++;
            }
            break;
    }
}
*/
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}