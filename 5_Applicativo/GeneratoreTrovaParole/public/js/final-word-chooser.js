let finalWordsTable = document.getElementById("finalWordsTable");
let dictionary;

/**
 * Funzione che propone le parole finali.
 * Questa funzione si occupa di effettuare la richiesta del dizionario e di
 * chiamare le altre funzioni che cercano delle parole finali casualmente
 * e le mostrano nella tabella html
 */
function proposeFinalWords(){
    document.getElementsByClassName("final-words-div")[0].style.visibility = "visible";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "get-dictionary"); //Richiesta del dizionario
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                dictionary = this.responseXML.querySelectorAll('LENGTH2,LENGTH3,LENGTH4,LENGTH5,LENGTH6,LENGTH7,LENGTH8,LENGTH9,LENGTH10,LENGTH11,LENGTH12,LENGTH13,LENGTH14,LENGTH15');
                showFinalWords(searchWords());//Chiamata alla funzione per mostrare la tabella html
                setTrListeners();//Creazione dei listener per il clic sulle righe della tabella
            }else{
                finalWordsTable.innerHTML = `<p>Impossibile caricare le parole finali dal dizionario</p><br><p>Errore nella richiesta, codice: ${this.status}</p>`;
            }
       }
    };
}

/**
 * Funzione che cerca 10 parole casuali da proporre
 * @returns array contenente le 10 parole trovate casualmente dal dizionario
 */
function searchWords(){
    let fWords = [];
    while(fWords.length != 10){
        let w = dictionary[rand(0,dictionary.length-1)].childNodes[0].nodeValue;
        //Controllo per verificare che la parola non superi il limite 
        //massimo di caratteri (spazi vuoti rimasti nella griglia)
        if(w.length <= countEmptySpaces()){
            fWords.push(w);
        }
    }
    return fWords;
}

/**
 * Funzione per mostrare la tabella html con le
 * parole finali passate come parametro
 * @param fWords array con le parole finali da proporre
 */
function showFinalWords(fWords){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i++){
        let columns = rows[i].getElementsByTagName("td");
        for(let j = 0; j < columns.length; j++){
            columns[j].textContent = fWords[i];
        }
    }
}

let lastRowClicked = null; //Variabile per memorizzare l'ultima riga cliccata
/**
 * Funzione per creare i listener quando viene cliccata una riga nella tabella
 * delle parole finali proposte
 */
function setTrListeners(){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let row of rows){
        row.addEventListener("click", () =>{
            if(lastRowClicked != null){
                lastRowClicked.style.backgroundColor = "";
            }
            row.style.backgroundColor = "lightskyblue";
            lastRowClicked = row;
            //Funzione di input-manager.js per inserire la parola selezionata nell'input della parola finale
            insertOnFinalWordBox(row.getElementsByTagName("td")[0].childNodes[0].nodeValue);
        });
    }
}

/**
 * Funzione per rimuovere la selezione della parola finale nella tabella
 */
function removeFinalWordSelection(){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let row of rows){
        row.style.backgroundColor = "";
    }
}