let grid = [];
let inputs = document.getElementsByClassName("word-input");
let words = [];
for(let i = 0; i < 10; i++){
    grid.push([]);
    for(let j = 0; j < 15; j++){
        grid[i].push("");
    }
}
document.getElementById("genBtn").addEventListener("click", () =>{
    charCounter = 142; //TMP!
    if(charCounter >= 140 && charCounter <= 147){
        for(let input of inputs){
            let value = input.value.trim();
            if(input.style.visibility = "visible" && value != ""){
                if(value.length > 15){ //Se la parola è più lunga di 15 caratteri
                    value = value.substring(0, 15); //Tronca la parola a 15 caratteri
                }
                words.push(value);
            }
        }
        console.log(words);
    }else{
        alert("Numero di caratteri massimi/minimi non rispettato, impossibile generare la griglia");
    }
});