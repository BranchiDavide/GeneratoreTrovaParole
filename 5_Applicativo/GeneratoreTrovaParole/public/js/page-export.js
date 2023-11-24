document.getElementById("exportBtn").addEventListener("click", ()=>{
    Swal.fire({ //Alert per la selezione del formato
        icon: 'question',
        title: 'Esportazione della pagina',
        input: 'select',
        inputOptions: {
          jpeg: 'JPEG',
          png: 'PNG',
          pdf: 'PDF'
        },
        inputPlaceholder: 'Seleziona un formato',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise(async (resolve) => {
                if(value == "png" || value == "jpeg"){
                    exportAsImage(value);
                    resolve();
                }else if(value == "pdf"){
                    resolve();
                    await sleep(200);
                    exportAsPdf();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Non è stato selezionato nessun formato valido!'
                    });
                }
            });
        }
    });
});

/**
 * Funzione che esporta la pagina come immagine
 * @param type stringa contenente il formato dell'immagine (jpeg o png)
 */
function exportAsImage(type){
    let title = document.getElementById("titleInput");
    let newTitle = document.createElement('p');
    truncateTitle();
    newTitle.className = "p-title";
    newTitle.innerHTML = title.value.trim();
    let center = document.createElement('center');
    center.appendChild(newTitle);
    overrideElement(title, center);
    html2canvas(document.getElementsByClassName("page-box")[0]).then(canvas => {
        let date = new Date();
        const img = canvas.toDataURL(`image/${type}`);
        const link = document.createElement('a');
        link.href = img;
        link.download = `TrovaParole_${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.${type}`;
        link.click();
    });
    overrideElement(center, title);
}

/**
 * Funzione per esportare la pagina come pdf, la funzione apre
 * solamente la pagina di stampa del browser
 */
function exportAsPdf(){
    truncateTitle();
    window.print();
}