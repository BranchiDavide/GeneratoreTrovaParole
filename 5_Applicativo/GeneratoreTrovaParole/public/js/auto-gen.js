wordsInput = document.getElementsByClassName("word-input");

/**
 * Funzione che si occupa di riempire gli input con parole casuali prese
 * dal dizionario.
 */
function writeWords(){
    if(dictionaryRequestError == null){
        let words = [];
        let charCount = 0;
        while(charCount < 140){
            let w = getRandomWord();
            if(words.includes(w)){ //Saltare la parola se esiste già nell'array
                continue;
            }
            if(words.length >= 30){
                words.pop();
            }
            if(charCount + w.length <= 147){ //Controllo per non superare il massimo di caratteri
                words.push(w);
                charCount += w.length;
            }
        }
        for(let i = 0; i < words.length; i++){
            wordsInput[i].style.visibility = "visible";
            wordsInput[i].value = words[i];
            changeBorderInput(wordsInput[i]);
        }
        updateCharsCount();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Errore nel caricamento del dizionario',
            text: 'status code: ' + dictionaryRequestError,
        });
    }
}

/**
 * Funzione che inserisce casualmente una parola finale
 * (presa dalla funzione searchWords() di final-word-chooser.js)
 * nell'input dedicato alla parola finale.
 */
function writeFinalWord(){
    let fw = searchWords();
    document.getElementById("finalWordInput").value = fw[rand(0, fw.length-1)];
}

/**
 * Funzione che ritorna una parola casuale presa dal dizionario
 * @returns parola casuale del dizionario
 */
function getRandomWord(){
    return dictionary[rand(0,dictionary.length-1)].childNodes[0].nodeValue;
}