let partecipanti = ["Mario Rossi", "Luigi Bianchi", "Giovanni Verdi", "Paolo Neri", "Luca Russo"];
let voti = new Array(partecipanti.length).fill(0);

function visualizzaPartecipanti() {
  console.log("Elenco partecipanti:");
  partecipanti.forEach((partecipante, index) => {
    console.log(`${index + 1}. ${partecipante}`);
  });
}

function vota(indicePartecipante) {
  if (indicePartecipante >= 0 && indicePartecipante < partecipanti.length) {
    voti[indicePartecipante]++;
    console.log(`Hai votato per ${partecipanti[indicePartecipante]}`);
  } else {
    console.log("Indice partecipante non valido.");
  }
}

function visualizzaRisultati() {
  console.log("Risultati votazione:");
  partecipanti.forEach((partecipante, index) => {
    console.log(`${partecipante}: ${voti[index]} voti`);
  });
}

// Simulazione del flusso di esecuzione
visualizzaPartecipanti();
vota(2); // Simula un voto per il partecipante all'indice 2
vota(4); // Simula un voto per il partecipante all'indice 4
visualizzaRisultati();