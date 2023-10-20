let dictionary;
/**
 * Funzione chiamata al caricamento della pagina, questa funzione va
 * a richiedere il dizionario in formato xml al server e succesivamente
 * mostra la tabella con tutte le parole presenti nel dizionario
 */
window.onload = function(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "get-dictionary"); //Richiesta del dizionario
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                dictionary = this.responseXML.querySelectorAll('LENGTH2,LENGTH3,LENGTH4,LENGTH5,LENGTH6,LENGTH7,LENGTH8,LENGTH9,LENGTH10,LENGTH11,LENGTH12,LENGTH13,LENGTH14,LENGTH15');
                loadTable(100); //Carica le prime 100 righe della tabella
                displayTable(); //Mostra la tabella
            }else{
                //Errore nel caso la richiesta del dizionario fallisca
                alert("Errore nel caricamento del dizionario, status code: " + this.status);
            }
       }
    };
}
//Variabile per stabilire se bisogna aggiungere un nuovo listener all'elemento per caricare più parole nella tabella
let newListenerToSet = true;
let currentLoadedRow = 0;
//Array che contiene tutta la tabella in html
let arrayTable = [`<table class="dictionary-table">`, `<tr><td>...</td><td class="word-td" id="tdShowMore">Carica di più</td></tr>`, `</table>`];
/**
 * Funzione per caricare nuove righe della tabella.
 * Le righe verranno messe nell'array "arrayTable"
 * @param rowsToLoad numero di righe da caricare
 */
function loadTable(rowsToLoad){
    arrayTable.pop(); //Rimuovere chiusura tabella
    arrayTable.pop(); //Rimuovere bottone "Carica di più"
    for(let i = currentLoadedRow; i < (currentLoadedRow + rowsToLoad) && i < dictionary.length; i++){
       arrayTable.push(`<tr><td>${i+1}</td><td class="word-td">${dictionary[i].childNodes[0].nodeValue}<i class="fa-solid fa-x fa-lg tb-icon x-icon"></i><i class="fa-solid fa-pen-to-square fa-lg tb-icon m-icon"></i></td></tr>`);
    }
    currentLoadedRow += rowsToLoad;
    if(currentLoadedRow < dictionary.length){ //Controllo per la fine del dizionario
        arrayTable.push(`<tr><td>...</td><td class="word-td" id="tdShowMore">Carica di più</td></tr>`);
        newListenerToSet = true;
    }else{
        newListenerToSet = false;
    }
    arrayTable.push(`</table>`);
}
/**
 * Funzione per mostrare la tabella caricata in arrayTable
 * sulla pagina
 */
function displayTable(){
    document.getElementById("tableCenter").innerHTML = arrayTable.toString().replaceAll(",","");
    if(newListenerToSet){ //Aggiungere un nuovo listener su "Carica di più"
        document.getElementById("tdShowMore").addEventListener("click", () => {
            //Qaundo "Carica di più" viene premuto, vengono caricate 100 righe aggiuntive alla tabella
            //e viene nuovamente mostrata
            loadTable(100);
            displayTable();
        });
    }
}