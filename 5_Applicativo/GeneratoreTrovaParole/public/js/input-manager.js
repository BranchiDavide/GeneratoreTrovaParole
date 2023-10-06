let titleInput = document.getElementById("titleInput");
let wordsInput = document.getElementsByClassName("word-input");
let allInputs = Array.from(wordsInput);
allInputs.push(titleInput);
function changeBorderInput(input){
    if(input.value.trim() != ""){
        input.style.border = "none";
    }else{
        input.style.border = "1px dashed black";
    }
}
for(let input of allInputs){
    input.addEventListener("keyup", () => {
        changeBorderInput(input);
    });
}
let lastAdded = 0;
let allAdded = false;
for(let i = 0; i < wordsInput.length; i++){
    wordsInput[i].addEventListener("keyup", () =>{
        if(wordsInput[i].value.trim() != ""){
            if(i != wordsInput.length - 1){
                wordsInput[i + 1].style.visibility = "visible";
            }
        }else{
            if(i != wordsInput.length - 1){
                if(wordsInput[i + 1].value.trim() == ""){
                    wordsInput[i + 1].style.visibility = "hidden";
                    changeBorderInput(wordsInput[i]);
                }else{
                    let current = i;
                    let j = current + 1;
                    while(wordsInput[j].value.trim() != ""){
                        wordsInput[current].value = wordsInput[j].value;
                        if(j + 1 != wordsInput.length){
                            current++;
                            j++;
                        }else{
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
    });
}