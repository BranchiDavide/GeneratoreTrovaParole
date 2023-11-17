/**
 * Script contenente alcune funzioni utili che vengono utilizzate in più
 * punti dell'applicativo
 */

/**
 * Funzione per generare un numero random fra min e max inclusi
 * @param min numero minimo incluso
 * @param max numero massimo incluso
 * @returns 
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Funzione per fermare l'esecuzione del programma per i millisecondi passati come parametro
 * @param ms millisecondi per cui fermare il programma
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Funzione utile per rimuovere un elemento da un array una sola volta
 * @param arr array da cui rimuovere l'elemento
 * @param value valore da rimuovere dall'array
 * @returns nuovo array senza l'elemento che era da rimuovere
 */
function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}