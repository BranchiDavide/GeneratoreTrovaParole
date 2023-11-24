let mIcons = document.getElementsByClassName("m-icon");
let xIcons = document.getElementsByClassName("x-icon");
let vIcons = document.getElementsByClassName("v-icon");
let addBtn = document.getElementsByClassName("addWordBtn")[0];
let wordInput = document.getElementById("addWord");
let dictionaryChanges = [];
let currentlyUnderChange = [];

function setIconsListeners(){
    for(let icon of mIcons){
        if(!icon.getAttribute("listener")){
            icon.addEventListener("click", () =>{
                icon.classList.add("hide-icon");
                icon.nextSibling.classList.remove("hide-icon");
                let newInput = document.createElement("input");
                newInput.classList.add("edit-input");
                let id = parseInt(icon.parentElement.previousSibling.childNodes[0].nodeValue);
                newInput.type = "text";
                newInput.value = icon.parentElement.childNodes[0].nodeValue;
                overrideElement(icon.parentElement.childNodes[0], newInput)
                currentlyUnderChange.push([id, newInput.value]);
            });
            icon.setAttribute("listener", "true");
        }
    }
    for(let icon of vIcons){
        if(!icon.getAttribute("listener")){
            icon.addEventListener("click", () =>{
                let input = icon.parentElement.childNodes[0];
                let inputValue = input.value.trim();
                if(inputValue.length < 2 || inputValue.length > 15){
                    Swal.fire({
                        icon: 'error',
                        title: 'Lunghezza non valida',
                        text: 'La parola deve essere lunga minimo 2 caratteri e massimo 15!',
                    });
                }else{
                    icon.classList.add("hide-icon");
                    icon.previousSibling.classList.remove("hide-icon");
                    let newText = document.createTextNode(inputValue);
                    overrideElement(input, newText);
                    let id = parseInt(icon.parentElement.previousSibling.childNodes[0].nodeValue);
                    let tmp = [];
                    for(let i = 0; i < currentlyUnderChange.length; i++){
                        let arr = currentlyUnderChange[i];
                        if(arr[0] == id){
                            if(arr[1] != inputValue){
                                addUpdateAction(id, inputValue);
                            }
                        }else{
                            tmp.push(arr);
                        }
                    }
                    currentlyUnderChange = tmp;
                }
            });
            icon.setAttribute("listener", "true");
        }
    }
    for(let icon of xIcons){
        if(!icon.getAttribute("listener")){
            icon.addEventListener("click", () =>{
                let inputValue = icon.parentElement.childNodes[0].nodeValue;
                let id = parseInt(icon.parentElement.previousSibling.childNodes[0].nodeValue);
                Swal.fire({
                    title: "Confermare eliminazione?",
                    text: `Sei sicuro di voler eliminare dal dizionario la parola ${inputValue} dal dizionario?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Annulla",
                    confirmButtonText: "Si"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        icon.parentElement.parentElement.remove();
                        addDeleteAction(id, inputValue);
                    }
                  });
            });
            icon.setAttribute("listener", "true");
        }
    }
}

function addUpdateAction(id, value){
    dictionaryChanges.push(["update", id, value]);
}

function addDeleteAction(id, value){
    dictionaryChanges.push(["delete", id, value]);
}

function addInsertAction(id, value){
    dictionaryChanges.push(["insert", id, value]);
}

addBtn.addEventListener("click", () =>{
    let inputValue = wordInput.value.trim();
    if(inputValue.length < 2 || inputValue.length > 15){
        Swal.fire({
            icon: 'error',
            title: 'Lunghezza non valida',
            text: 'La parola deve essere lunga minimo 2 caratteri e massimo 15!',
        });
    }else{
        let lastTableRow = document.getElementsByClassName("dictionary-table")[0].childNodes[0].lastChild;
        let newTr = document.createElement("tr");
        let newTdId = document.createElement("td");
        let newTdWord = document.createElement("td");
        let newId = parseInt(lastTableRow.previousSibling.childNodes[0].textContent) + 1;
        newTdId.textContent = newId;
        newTdWord.classList.add("word-td");
        newTdWord.textContent = inputValue;
        let icon1 = document.createElement("i");
        let icon2 = document.createElement("i");
        let icon3 = document.createElement("i");
        icon1.setAttribute("class", "fa-solid fa-x fa-lg tb-icon x-icon");
        icon2.setAttribute("class", "fa-solid fa-pen-to-square fa-lg tb-icon m-icon");
        icon3.setAttribute("class", "fa-solid fa-check hide-icon fa-lg tb-icon v-icon")
        newTdWord.append(icon1);
        newTdWord.append(icon2);
        newTdWord.append(icon3);
        newTr.appendChild(newTdId);
        newTr.appendChild(newTdWord);
        document.getElementsByClassName("dictionary-table")[0].childNodes[0].insertBefore(newTr, lastTableRow);
        addInsertAction(newId, inputValue);
        setIconsListeners();
        wordInput.value = "";
    }
});

function sendData(){
    if(dictionaryChanges.length != 0){
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/change-dictionary", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Modifiche applicate con successo!',
                    }).then((result) => {
                        window.location.reload();
                    });
                    dictionaryChanges = [];
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Impossibile modificare il dizionario!',
                        text: `Codice errore: ${this.status}`,
                    });
                }
           }
        }
        xhttp.send(JSON.stringify({ dictionaryChanges: dictionaryChanges }));
    }
}

document.getElementsByClassName("exit-div")[0].addEventListener("click", ()=>{
    if(dictionaryChanges.length > 0){
        Swal.fire({
            title: "Uscire senza salvare?",
            text: `Ci sono delle modifiche non salvate, se si esce senza salvare quest'ultime verranno perse`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annulla",
            confirmButtonText: "Si"
          }).then((result) => {
            if (result.isConfirmed) {
                window.close();
            }
          });
    }else{
        window.close();
    }
});

document.getElementsByClassName("saveBtn")[0].addEventListener("click", sendData);

document.getElementsByClassName("resetBtn")[0].addEventListener("click", () =>{
    Swal.fire({
        title: "Resettare il dizionario?",
        text: `Resettando il dizionario tutte le modifiche apportate fino ad ora verranno
         perse e si tornerà alla versione di default del dizionario`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Annulla",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/reset-dictionary", true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if(this.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Dizionario resettato con successo!',
                        }).then((result) => {
                            window.location.reload();
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Impossibile resettare il dizionario!',
                            text: `Codice errore: ${this.status}`,
                        });
                    }
               }
            }
            xhttp.send(JSON.stringify({confirm: true}));
        }
      });
});