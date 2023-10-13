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
        generateTable();
    }else{
        alert("Numero di caratteri massimi/minimi non rispettato, impossibile generare la griglia");
    }
});
function generateTable(){
    for(let word of words){
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
                            for(let i = coords[1]; i < coords[1] + len; i++){
                                console.log("dir 0, coords: ", coords[0],coords[1], " i: " ,i);
                                if(grid[coords[0]][i] != ""){
                                    valid = false;
                                }
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
                            for(let i = coords[0]; i < coords[0] + len; i++){
                                console.log("dir 1, coords: ", coords[0],coords[1], " i: " ,i);

                                if(grid[i][coords[1]] != ""){
                                    valid = false;
                                }
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
    }
}
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
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}