let partecipanti = ["Mario Rossi", "Luigi Bianchi", "Giovanni Verdi", "Paolo Neri", "Luca Russo"];
let voti = [0, 0, 0, 0, 0];
let div = document.getElementById("choice-div");
function choice() {
    let screen = document.getElementById("screen")
    let choice = parseInt(document.getElementById("choice").value);
    document.getElementById("choice").value = "";
    switch (choice) {
        case 1:
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            for (let i = 0; i < partecipanti.length; i++) {
                let partecipante = document.createElement("p");
                partecipante.innerHTML += "#" + (i + 1) + " Nome: " + partecipanti[i] + "<br>Voti: " + voti[i];
                div.appendChild(partecipante);
            }
            screen.appendChild(div);
            break;
        case 2:
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            div.innerHTML = `<label for="votazione">Inserisci il numero del partecipante per votare:</label><br /> <input type = "number" id = "votazione" class="java" /><button class="java" onclick="vota()">Vota</button>`
            screen.appendChild(div);
            break;
        case 3:
            if (document.getElementById("choice-div") != null) {
                document.getElementById("choice-div").remove;
            }
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            let paragrafo = document.createElement("p");
            paragrafo.innerText = "Sezione per il gestore dell'applicativo: qui si potranno inserire nuovi partecipanti, vedere i risultati e le statistiche.";
            div.appendChild(paragrafo);
            break;
        default:
            document.getElementById("message").textContent = "Per favore, inserisci un numero valido."
    }
}
function vota() {
    let voto = parseInt(document.getElementById("votazione").value) - 1;
    let votoRegistrato = document.createElement("p");
    document.getElementById("votazione").value = "";
    if ((voto < 0 || voto > voti.length)) {
        votoRegistrato.textContent = "Partecipante non valido."
    } else {
        voti[voto]++;
        votoRegistrato.textContent = "Il voto è stato registrato";
    }
    div.appendChild(votoRegistrato);

}
