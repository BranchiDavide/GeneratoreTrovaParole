let finalWordsTable = document.getElementById("finalWordsTable");
let dictionary;
function proposeFinalWords(){
    document.getElementsByClassName("final-words-div")[0].style.visibility = "visible";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "get-dictionary"); //Richiesta del dizionario
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                dictionary = this.responseXML.querySelectorAll('LENGTH2,LENGTH3,LENGTH4,LENGTH5,LENGTH6,LENGTH7,LENGTH8,LENGTH9,LENGTH10,LENGTH11,LENGTH12,LENGTH13,LENGTH14,LENGTH15');
                showFinalWords(searchWords());
                setTrListeners();
            }else{
                finalWordsTable.innerHTML = `<p>Impossibile caricare le parole finali dal dizionario</p><br><p>Errore nella richiesta, codice: ${this.status}</p>`;
            }
       }
    };
}

function searchWords(){
    let fWords = [];
    while(fWords.length != 10){
        let w = dictionary[rand(0,dictionary.length-1)].childNodes[0].nodeValue;
        if(w.length <= countEmptySpaces()){
            fWords.push(w);
        }
    }
    return fWords;
}

function showFinalWords(fWords){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i++){
        let columns = rows[i].getElementsByTagName("td");
        for(let j = 0; j < columns.length; j++){
            columns[j].textContent = fWords[i];
        }
    }
}

let lastRowClicked = null;
function setTrListeners(){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let row of rows){
        row.addEventListener("click", () =>{
            if(lastRowClicked != null){
                lastRowClicked.style.backgroundColor = "";
            }
            row.style.backgroundColor = "lightskyblue";
            lastRowClicked = row;
            insertOnFinalWordBox(row.getElementsByTagName("td")[0].childNodes[0].nodeValue);
        });
    }
}

function removeFinalWordSelection(){
    let rows = finalWordsTable.getElementsByTagName("tr");
    for(let row of rows){
        row.style.backgroundColor = "";
    }
}