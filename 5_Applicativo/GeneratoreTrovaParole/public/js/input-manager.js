let titleInput = document.getElementById("titleInput");
let wordsInput = document.getElementsByClassName("word-input");
let allInputs = Array.from(wordsInput);
let insertedCharsCount = document.getElementById("insertedCharsCount");
allInputs.push(titleInput);

/**
 * Funzione per cambiare il bordo dell'input in base alla
 * presenza di un testo o meno
 * @param input input a cui cambiare il bordo
 */
function changeBorderInput(input){
    if(input.value.trim() != ""){
        if(input.value.trim().length > 15){
            if(input.id != "titleInput"){
                input.style.border = "1px solid red";
                input.setAttribute("title", "La parola non può superare 15 caratteri, verranno troncati i caratteri in eccedenza");
            }
        }else{
            input.style.border = "none";
            input.removeAttribute("title");
        }
    }else{
        input.style.border = "1px dashed black";
    }
}

let charCounter = 0;
/**
 * Funzione per aggiornare il conteggio dei caratteri inseriti
 */
function updateCharsCount(){
    charCounter = 0
    for(let input of wordsInput){
        if(input.value.trim().length <= 15){
            //Se la parola finale supera 15 carateri quelli in eccedenza non
            //vengono contati, in quanto verranno successivamente troncati
            charCounter += input.value.trim().length;
        }else{
            charCounter += 15;
        }
    }
    insertedCharsCount.innerText = charCounter;
    if(charCounter < 140 || charCounter > 147){
        insertedCharsCount.style.color = "red";
    }else{
        insertedCharsCount.style.color = "green";
    }
}

/*
Ciclo per eseguire ogni volta le funzioni changeBorderInput() e updateCharsCount()
quando viene premuto un tasto su un input
*/
for(let input of allInputs){
    input.addEventListener("keyup", () => {
        changeBorderInput(input);
        updateCharsCount();
    });
}

/*
Ciclo per assegnare ad ogni input delle parole l'evento keyup
*/
for(let i = 0; i < wordsInput.length; i++){
    //Evento per gestire l'aggiunta o la rimozione delle parole dagli input
    wordsInput[i].addEventListener("keyup", () =>{
        checkInputs(i);
    });
}

/**
 * Funzione per resettare tutti gli input delle parole che non possono
 * essere piazzate nella griglia
 */
function resetNotPlaceableWords(){
    for(let i = 0; i < wordsInput.length; i++){
        checkInputs(i);
    }
}

/**
 * Funzione che controlla tutti gli input e si occupa di aggiungerne
 * dei nuovi o di rimuoverne se sono vuoti e di spostare le parole
 * @param i indice dell'input nella lista wordsInput
 */
function checkInputs(i){
    if(wordsInput[i].value.trim() != ""){ //Aggiunta di un nuovo input
        if(i != wordsInput.length - 1){
            wordsInput[i + 1].style.visibility = "visible";
        }
    }else{ //Rimozione di un input e spostamento delle parole
        if(i != wordsInput.length - 1){
            if(wordsInput[i + 1].value.trim() == ""){
                wordsInput[i + 1].style.visibility = "hidden";
                changeBorderInput(wordsInput[i]);
            }else{
                let current = i;
                let j = current + 1;
                //Ciclo per spostare le parole quando ne viene rimossa una
                while(wordsInput[j].value.trim() != ""){
                    wordsInput[current].value = wordsInput[j].value;
                    if(j + 1 != wordsInput.length){
                        current++;
                        j++;
                    }else{
                         //Quando viene raggiunto l'ultimo input in ciclo viene interrotto
                        break;
                    }
                }
                if(wordsInput[j].value.trim() != ""){
                    wordsInput[j].value = "";
                    changeBorderInput(wordsInput[j]);
                }else{
                    wordsInput[j].value = "";
                    wordsInput[j].style.visibility = "hidden";
                    wordsInput[current].value = "";
                    changeBorderInput(wordsInput[current]);
                }
            }
        }
        changeBorderInput(wordsInput[i]);
    }
}

let finalWordInput = document.getElementById("finalWordInput");
finalWordInput.addEventListener("keyup", () => {
    checkFinalWordInput();
});

/**
 * Funzione per controllare l'input della parola finale e togliere/aggiungere il bordo
 * in base all'evenienza
 */
function checkFinalWordInput(){
    if(finalWordInput.value.trim().length > countEmptySpaces()){
        finalWordInput.style.border = "1px solid red";
        finalWordInput.setAttribute("title", `La parola finale non può superare ${countEmptySpaces()} caratteri, verranno troncati i caratteri in eccedenza`);
    }else{
        finalWordInput.style.border = "none";
    }
    if(finalWordInput.value.trim() == ""){
        finalWordInput.style.border = "1px dashed black";
        removeFinalWordSelection();
    }
}

/**
 * Funzione per inserire nell'input della parola finale una parola passata come parametro
 * @param word parola finale da inserire nell'input
 */
function insertOnFinalWordBox(word){
    finalWordInput.value = word;
    checkFinalWordInput();
}

/**
 * Funzione per disabilitare tutti gli input delle parole
 */
function disableAllWordInputs(){
    for(let input of wordsInput){
        input.setAttribute("disabled","");
        if(input.value.trim() == ""){
            input.style.visibility = "hidden";
        }
        input.style.border = "none";
    }
}

/**
 * Funzione per disabilitare l'input della parola finale
 */
function disableFinalWordInput(){
    finalWordInput.style.border = "none";
    finalWordInput.setAttribute("disabled","");
}