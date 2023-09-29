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
for(let i = 0; i < wordsInput.length; i++){
    wordsInput[i].addEventListener("keyup", () =>{
        if(wordsInput[i].value.trim() != ""){
            if(i != wordsInput.length - 1){
                wordsInput[i + 1].style.visibility = "visible";
                lastAdded = i + 1;
                console.log(wordsInput[i+1].style.visibility);
            }else{
                lastAdded = i;
            }
        }else{
            //if(i != wordsInput.length - 1 && i!= 0){
                let lastOne;
                for(let j = i + 1; j <= lastAdded; j++){
                    if(wordsInput[j].value != ""){
                        wordsInput[j -1].value = wordsInput[j].value;
                        changeBorderInput(wordsInput[j-1]);
                    }else{
                        lastOne = j
                    }
                }
                wordsInput[lastOne].style.visibility = "hidden";
                wordsInput[lastOne - 1].value = "";
                changeBorderInput(wordsInput[lastOne - 1]);
                lastAdded = lastOne - 1;
            //}
        }
    });
}