/**
 * Script contenente delle funzioni per testare la corretta
 * generazione della griglia.
 * Il seguente script è utilizzato solo per test, qundi deve essere caricato
 * manualmente nel head della pagina e le funzioni devono essere chiamate dalla
 * console del browser.
 */

async function genWithColorsTest(){
    await autoGen();
    let colorGrid = grid;
    let combColorWord = [];
    for(let info of placedWordsInfo){
        let row = info[0];
        let column = info[1];
        let len = info[2];
        let dir = info[3];
        let word = info[4];
        let rgb = getRdnColor();
        combColorWord.push([word, rgb]);
        switch(dir){
            case Direction.UP: {
                for(let i = row; i >= row - len; i--){
                    colorGrid[i][column] = rgb;
                }
                break;
            }
            case Direction.UP_RIGHT: {
                let j = column;
                for(let i = row; i >= row - len; i--){
                    colorGrid[i][j] = rgb;
                    j++;
                }
                break;
            }
            case Direction.RIGHT: {
                for(let j = column; j <= column + len; j++){
                    colorGrid[row][j] = rgb;
                }
                break;
            }
            case Direction.DOWN_RIGHT: {
                let j = column;
                for(let i = row; i <= row + len; i++){
                    colorGrid[i][j] = rgb;
                    j++;
                }
                break;
            }
            case Direction.DOWN: {
                for(let i = row; i <= row + len; i++){
                    colorGrid[i][column] = rgb;
                }
                break;
            }
            case Direction.DOWN_LEFT: {
                let j = column;
                for(let i = row; i <= row + len; i++){
                    colorGrid[i][j] = rgb;
                    j--;
                }
                break;
            }
            case Direction.LEFT: {
                for(let j = column; j >= column - len; j--){
                    colorGrid[row][j] = rgb;
                }
                break;
            }
            case Direction.UP_LEFT: {
                let j = column;
                for(let i = row; i >= row - len; i--){
                    colorGrid[i][j] = rgb;
                    j--;
                }
                break;
            }
        }
    }
    for(let input of inputs){
        let wordIndex = -1;
        let inputValue = input.value;
        for(let i = 0; i < combColorWord.length; i++){
            if(combColorWord[i][0] == inputValue){
                
            }
        }
    }
}

function getRdnColor(){
    return [rand(0,255),rand(0,255),rand(0,255)];
}