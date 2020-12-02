// Variables Globales
let ordenamiento;
let cuerpo = document.getElementById("cuerpo");


// Detecta el Enter en el input para buscar un pais
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("boton").click();
    }
});


// Funciones
EmpezarPrograma();

function EmpezarPrograma() {
    fetch('https://api.covid19api.com/summary')
        .then(respuesta => respuesta.json())
        .then(arrayDeCovid => start(arrayDeCovid));
}

function start(array) {
    ordenamiento = ordenar(array.Countries);
    for (let i = 0; i < ordenamiento.length; i++) {
        mostrar(i, ordenamiento[i]);
    }
}

function ordenar(arrayDePaises) {
    var arrayOrdenado = _.sortBy(arrayDePaises, 'TotalConfirmed').reverse();
    return arrayOrdenado;
}

function mostrar(numeroID, ordenamiento) {
    let row = document.createElement("tr");
    row.setAttribute("id", `paisNumero${numeroID}`);
    row.innerHTML = `<td class="text-center">${ordenamiento.Country}</td>
                    <td class="text-center">${ordenamiento.TotalConfirmed}</td>
                    <td class="text-center">${ordenamiento.TotalDeaths}</td>
                    <td class="text-center">${ordenamiento.TotalRecovered}</td>
                    <td class="text-center text-danger"><strong>${(ordenamiento.TotalConfirmed) - (ordenamiento.TotalDeaths + ordenamiento.TotalRecovered)}</strong></td>
                    `;
    cuerpo.appendChild(row);
}

function ord() {

    cuerpo.innerHTML = "";
    let input = document.getElementById("input");
    let confirmacionPais, confirmacionEscritura;

    for (let i = 0; i < ordenamiento.length; i++) {
        if (input.value.toLowerCase() === ordenamiento[i].Country.toLowerCase()) {
            confirmacionPais = true;
            mostrar(i, ordenamiento[i]);
        }
        if (input.value == null || input.value == "") {
            confirmacionEscritura = false;
            mostrar(i, ordenamiento[i]);
        }
    }

    if (confirmacionPais != true && confirmacionEscritura != false) {
        let div = document.createElement("div");
        let body = document.getElementById("#body");
        div.classList.add("alert", "alert-danger", "text-center");
        div.innerHTML = "No se pudo encontrar ese país.";
        body.appendChild(div);

        setTimeout(() => {
            div.style.opacity = "0";
            div.style.transition = "all 2s";
        }, 2000);

        setTimeout(() => {
            body.removeChild(div);
        }, 3500);

        for (let i = 0; i < ordenamiento.length; i++) {
            mostrar(i, ordenamiento[i]);
        }
    }
}


// Dark mode
function darkMode() {
    const body = document.querySelector("#paginaPrincipal");
    const table = document.querySelector("#table");
    const button = document.querySelector("#darkmode");

    body.classList.toggle("darkmode");
    table.classList.toggle("darkmode");
    body.classList.contains("darkmode") ? button.innerHTML = "☀️ Light Mode" : button.innerHTML =  "🌑 Dark Mode";
}