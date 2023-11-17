/**
 * Script da includere nel head della pagina html per richiedere il dizionario
 * al caricamento della pagina.
 * Il dizionario verrà salvato nella variabile dictionary, in caso di errori nella richiesta
 * quest'ultimi verranno memorizzati nella variabile dictionaryRequestError
 */

let dictionary = null;
let dictionaryRequestError = null;
window.onload = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "get-dictionary"); //Richiesta del dizionario
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                dictionary = this.responseXML.querySelectorAll('LENGTH2,LENGTH3,LENGTH4,LENGTH5,LENGTH6,LENGTH7,LENGTH8,LENGTH9,LENGTH10,LENGTH11,LENGTH12,LENGTH13,LENGTH14,LENGTH15');
            }else{
                dictionaryRequestError = this.status;
            }
       }
    };
}