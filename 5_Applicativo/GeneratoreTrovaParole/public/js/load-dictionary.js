let dictionary;
window.onload = function(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "get-dictionary");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                dictionary = this.responseXML.getElementsByTagName("DICTIONARY")[0];
                //loadTable(50);
                for(let node of dictionary.childNodes){
                    if(node.nodeName != "#text"){
                        console.log(node)
                    }
                }
            }else{
                alert("Errore nel caricamento del dizionario, status code: " + this.status);
            }
       }
    };
}
let currentLoadedRow = 0;
let arrayTable = [`<table class="dictionary-table">`];
function loadTable(rowsToLoad){
    for(let i = currentLoadedRow; i < (currentLoadedRow + rowsToLoad); i++){
       
    }
}