let mIcons = document.getElementsByClassName("m-icon");
let xIcons = document.getElementsByClassName("x-icon");
let vIcons = document.getElementsByClassName("v-icon");
let addBtn = document.getElementsByClassName("addWordBtn")[0];
let wordInput = document.getElementById("addWord");
let dictionaryChanges = [];
let currentlyUnderChange = [];

function setIconsListeners(){
    for(let icon of mIcons){
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
    }
    for(let icon of vIcons){
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
    }
    for(let icon of xIcons){
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
    }
}

function addUpdateAction(id, value){
    dictionaryChanges.push(["update", id, value]);
}

function addDeleteAction(id, value){
    dictionaryChanges.push(["delete", id, value]);
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
        newTdId.textContent = parseInt(lastTableRow.previousSibling.childNodes[0].textContent) + 1;
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
        setIconsListeners();
    }
});