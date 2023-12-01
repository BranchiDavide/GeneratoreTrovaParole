/**
 * Script contenente delle funzioni per testare la corretta
 * generazione della griglia.
 * Il seguente script è utilizzato solo per test, qundi deve essere caricato
 * manualmente nel head della pagina e le funzioni devono essere chiamate dalla
 * console del browser.
 */

/**
 * Funzione che chiama l'auto generazione, e successivamente evidenzia tutte le
 * parole con dei colori casuali
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
        let rgb = getRndColor();
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
    let finalWordColor = getRndColor();
    document.getElementById("finalWordInput").style.backgroundColor = `rgb(${finalWordColor[0]},${finalWordColor[1]},${finalWordColor[2]})`;
    document.getElementById("finalWordInput").style.color = getColorByBgColor(rgbToHex(finalWordColor[0],finalWordColor[1],finalWordColor[2]));
    for(let coords of placedFinalWordInfo){
        colorGrid[coords[0]][coords[1]] = finalWordColor;
    }
    for(let input of inputs){
        let inputValue = input.value.toUpperCase();
        let rgb = [];
        for(let i = 0; i < combColorWord.length; i++){
            if(combColorWord[i][0] == inputValue){
                rgb = combColorWord[i][1];
            }
        }
        input.style.color = getColorByBgColor(rgbToHex(rgb[0],rgb[1],rgb[2]));
        input.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }
    let rows = document.querySelectorAll("#mainTable tr");
    for(let i = 0; i < rows.length; i++){
        let columns = rows[i].querySelectorAll("td");
        for(let j = 0; j < columns.length; j++){
            let rgb = colorGrid[i][j];
            if(!Array.isArray(rgb)){
                rgb = [255,255,255];
            }
            columns[j].style.color = getColorByBgColor(rgbToHex(rgb[0],rgb[1],rgb[2]));
            columns[j].style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        }
    }
    console.log('%cGrid with colors successfully generated', 'color: green');
}

/**
 * Funzione che ritorna un colore rgb casuale
 * @returns array contenente le componenti [red, green, blue]
 */
function getRndColor(){
    return [rand(0,255),rand(0,255),rand(0,255)];
}

/**
 * Funzione per convertire un colore in formato rgb in una stringa esadecimale
 * @param r valore rosso
 * @param g valore verde
 * @param b valore blu
 * @returns stringa che rappresenta il colore in formato esadecimale
 */
//Tratta da:
//https://learnersbucket.com/examples/interview/convert-rgb-to-hex-color-in-javascript/
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

/**
 * Funzione che ritorna un colore fra bianco e nero in base al colore di background
 * per fare in modo che un testo sia leggibile
 * @param bgColor colore di background in formato esadecimale
 * @returns stringa che rappresenta nero o bianco in esadecimale (#000/#fff)
 */
function getColorByBgColor(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}