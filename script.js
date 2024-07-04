let partecipanti = ["Mario Rossi", "Luigi Bianchi", "Giovanni Verdi", "Paolo Neri", "Luca Russo"];//array partecipanti
let voti = [0, 0, 0, 0, 0];//array voti
let div = document.getElementById("choice-div");//variabile per gestire più comodamente la finta schermata java
function choice() {
    let screen = document.getElementById("screen")
    let choice = parseInt(document.getElementById("choice").value);
    document.getElementById("choice").value = "";
    switch (choice) {
        case 1:
        //gestione dei due casi: la prima se l'utente deve ancora votare, la seconda se ha già votato
            if (voti.reduce(function (total, amount) { return total + amount; }, 0) == 0) {
                document.getElementById("tutorial").textContent = `L'utente potrà qui vedere i partecipanti. Sceglierà il candidato che vorrà votare, e poi inserirà nel terminale il numero 2 per andare nella sezione "vota"`
            } else {
                document.getElementById("tutorial").textContent = `Il voto è stato registrato correttamente: sarà però visibile soltanto al gestore.`
            }
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            for (let i = 0; i < partecipanti.length; i++) {
                let partecipante = document.createElement("p");
                partecipante.innerHTML += (i + 1) + ".  " + partecipanti[i];
                div.appendChild(partecipante);
            }
            screen.appendChild(div);
            break;
        case 2:
            document.getElementById("tutorial").textContent = `L'utente inserirà il numero associato al partecipante che intende votare`
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            div.innerHTML = `<label for="votazione">Inserisci il numero del partecipante per votare:</label><br /> <input type = "number" id = "votazione" class="java" /><button class="java" onclick="vota()">Vota</button>`
            screen.appendChild(div);
            break;
        case 3:
            document.getElementById("tutorial").textContent = "";
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            let paragrafo = document.createElement("p");
            paragrafo.innerText = `Sezione per il gestore dell'applicativo: qui si potranno inserire nuovi partecipanti, vedere i risultati e le statistiche. Andare nella pagina "Risultati" per vederne il funzionamento`;
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
