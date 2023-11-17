let mIcons = document.getElementsByClassName("m-icon");
let xIcons = document.getElementsByClassName("x-icon");

function setIconsListeners(){
    for(let icon of mIcons){
        icon.addEventListener("click", () =>{
            let newIcon = document.createElement("i");
            newIcon.setAttribute("class", "fa-solid fa-check fa-lg tb-icon v-icon");
            overrideElement(icon, newIcon);
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.value = newIcon.parentElement.childNodes[0].nodeValue;
            overrideElement(newIcon.parentElement.childNodes[0], newInput)
        });
    }
}
