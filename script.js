let partecipanti = JSON.parse(sessionStorage.getItem("partecipanti")) || [
    "Mario Rossi",
    "Luigi Bianchi",
    "Giovanni Verdi",
    "Paolo Neri",
    "Luca Russo",
]; //array partecipanti
let voti = JSON.parse(sessionStorage.getItem("voti")) || [0, 0, 0, 0, 0];
let div = document.getElementById("choice-div"); //variabile per gestire più comodamente la finta schermata java
function choice() {
    let screen = document.getElementById("screen");
    let choice = parseInt(document.getElementById("choice").value);
    document.getElementById("choice").value = "";
    document.getElementById("message").textContent = "";
    switch (choice) {
        case 1:
            //gestione dei due casi: la prima se l'utente deve ancora votare, la seconda se ha già votato
            if (
                voti.reduce(function (total, amount) {
                    return total + amount;
                }, 0) == 0
            ) {
                document.getElementById(
                    "tutorial"
                ).textContent = `L'utente potrà qui vedere i partecipanti. Sceglierà il candidato che vorrà votare, e poi inserirà nel terminale il numero 2 per andare nella sezione "vota"`;
            } else {
                document.getElementById(
                    "tutorial"
                ).textContent = `Il voto è stato registrato correttamente: sarà però visibile soltanto al gestore.`;
            }
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            for (let i = 0; i < partecipanti.length; i++) {
                let partecipante = document.createElement("p");
                partecipante.innerHTML += i + 1 + ".  " + partecipanti[i];
                div.appendChild(partecipante);
            }
            screen.appendChild(div);
            break;
        case 2:
            document.getElementById(
                "tutorial"
            ).textContent = `L'utente inserirà il numero associato al partecipante che intende votare`;
            div.innerHTML = "";
            div.classList.add("java");
            div.classList.add("screen");
            div.innerHTML = `<label for="votazione">Inserisci il numero del partecipante per votare:</label><br /> <input type = "number" id = "votazione" class="java" /><button class="java" onclick="vota()">Vota</button>`;
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
            div.innerHTML = "";
            document.getElementById("message").textContent =
                "Per favore, inserisci un numero valido.";
    }
}
function vota() {
    let voto = parseInt(document.getElementById("votazione").value) - 1;
    let votoRegistrato = document.createElement("p");
    document.getElementById("votazione").value = "";
    if (voto < 0 || voto > voti.length) {
        votoRegistrato.textContent = "Partecipante non valido.";
    } else {
        voti[voto]++;
        votoRegistrato.textContent = "Il voto è stato registrato";
        sessionStorage.setItem("voti", JSON.stringify(voti));
    }
    div.appendChild(votoRegistrato);

}

//risultati e statistiche

function gestore() {
    var scelta = document.getElementById("choice").value; // Raccoglie l'input dell'utente
    var divRisultati = document.getElementById("risultati");
    var divStatistiche = document.getElementById("statistiche");

    // Pulisce i div prima di visualizzare nuovi contenuti
    divRisultati.innerHTML = "";
    divStatistiche.innerHTML = "";

    switch (scelta) {
        case "1":
            // Aggiornamento del DOM con i risultati
            let risultatiDiv = document.getElementById("risultati");
            partecipanti.forEach((partecipante, index) => {
                let p = document.createElement("p");
                p.textContent = `${partecipante}: ${voti[index]} voti`;
                risultatiDiv.appendChild(p);
            });
            break;

        case "2":
            let maxVoti = Math.max(...voti);
            let vincitore = partecipanti[voti.indexOf(maxVoti)];
            let totaleVoti = voti.reduce((a, b) => a + b, 0);

            // Aggiornamento del DOM con le statistiche
            let statisticheDiv = document.getElementById("statistiche");
            let statisticheContent = `
                <p>Vincitore: ${vincitore} con ${maxVoti} voti</p>
                <p>Totale voti: ${totaleVoti}</p>
            `;
            statisticheDiv.innerHTML = statisticheContent;
            break;

        case "3":
            let container = document.getElementById("aggiungiPartecipanteContainer");
            if (!document.getElementById("nuovoPartecipante")) {
                // Crea il campo di input
                var inputPartecipante = document.createElement("input");
                inputPartecipante.setAttribute("id", "nuovoPartecipante");
                inputPartecipante.setAttribute("type", "text");
                inputPartecipante.setAttribute(
                    "placeholder",
                    "Nuovo partecipante"
                );
                inputPartecipante.style.margin = "10px";
                inputPartecipante.style.padding = "5px";
                inputPartecipante.style.border = "1px solid black";
                inputPartecipante.style.borderRadius = "5px";
                inputPartecipante.style.width = "200px";
                inputPartecipante.style.height = "30px";
                inputPartecipante.style.fontSize = "16px";
                inputPartecipante.style.fontFamily = "Fira Code, monospace";
                container.appendChild(inputPartecipante);

                // Crea il bottone di conferma
                var bottoneAggiungi = document.createElement("button");
                bottoneAggiungi.textContent = "Aggiungi Partecipante";
                bottoneAggiungi.style.margin = "10px";
                bottoneAggiungi.style.padding = "5px";
                bottoneAggiungi.style.border = "1px solid black";
                bottoneAggiungi.style.borderRadius = "5px";
                bottoneAggiungi.style.backgroundColor = "black";
                bottoneAggiungi.style.color = "white";
                bottoneAggiungi.style.fontFamily = "Fira Code, monospace";
                container.appendChild(bottoneAggiungi);


                // Event listener per il bottone
                bottoneAggiungi.addEventListener("click", function () {
                    var nomePartecipante = inputPartecipante.value;
                    if (nomePartecipante) {
                        partecipanti.push(nomePartecipante);
                        voti.push(0);
                        alert("Partecipante aggiunto con successo!");

                        // Aggiornamento del DOM con i risultati
                        let risultatiDiv = document.getElementById("risultati");
                        risultatiDiv.innerHTML = "";
                        partecipanti.forEach((partecipante, index) => {
                            let p = document.createElement("p");
                            p.textContent = `${partecipante}: ${voti[index]} voti`;
                            risultatiDiv.appendChild(p);
                            sessionStorage.setItem("partecipanti", JSON.stringify(partecipanti));
                        });
                    } else {
                        alert("Inserisci un nome valido per il partecipante.");
                    }
                });
            }
            break;
    }
}

