// ===============================
// SOPA DE LETRAS - TECNOLOGÍA MUSICAL
// ===============================

const palabras = [
    "ABLETON",
    "TECNOLOGIAMUSICAL",
    "COURSERA",
    "FINALE",
    "GARAGEBAND",
    "LOGICPRO",
    "MUSICGARDEN",
    "SIMPLYPIANO",
    "TENUTO",
    "AURALIA",
    "EARMASTER",
    "FLSTUDIO",
    "GUITARTUNA",
    "MUSESCORE",
    "SIBELIUS",
    "SOLFA",
    "YOUSICIAN"
];

let tablero = [];

let tamaño = 20;

let seleccion = [];

let encontradas = [];

let puntaje = 0;

let segundos = 0;

let reloj;

let nombreEstudiante = "";

let seleccionando = false;

let celdaInicio = null;

let ultimaCelda = null;


// ===============================
// INICIAR JUEGO
// ===============================

function iniciarJuego() {

    nombreEstudiante =
        document.getElementById("nombre").value.trim();

    if (nombreEstudiante === "") {

        alert("Por favor escribe tu nombre");

        return;
    }

    // Reiniciar completamente
    clearInterval(reloj);

    encontradas = [];

    puntaje = 0;

    segundos = 0;

    seleccion = [];

    seleccionando = false;

    celdaInicio = null;

    ultimaCelda = null;

    document.getElementById("puntaje").innerHTML = "0";

    document.getElementById("tiempo").innerHTML = "00:00";

    document.getElementById("resultado").innerHTML = "";

    actualizarLista();

    crearTablero();

    iniciarTiempo();
}


// ===============================
// CREAR TABLERO
// ===============================

function crearTablero() {

    tablero = [];

    for (let i = 0; i < tamaño; i++) {

        let fila = [];

        for (let j = 0; j < tamaño; j++) {

            fila.push("");
        }

        tablero.push(fila);
    }


    // Colocar palabras

    palabras.forEach(palabra => {

        colocarPalabra(palabra);

    });


    // Completar espacios

    for (let i = 0; i < tamaño; i++) {

        for (let j = 0; j < tamaño; j++) {

            if (tablero[i][j] === "") {

                tablero[i][j] =
                    String.fromCharCode(
                        65 + Math.floor(Math.random() * 26)
                    );
            }
        }
    }


    mostrarTablero();
}


// ===============================
// COLOCAR PALABRA
// ===============================

function colocarPalabra(palabra) {

    const direcciones = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1]
    ];

    for (let intento = 0; intento < 500; intento++) {

        const direccion =
            direcciones[
                Math.floor(
                    Math.random() * direcciones.length
                )
            ];

        const fila =
            Math.floor(Math.random() * tamaño);

        const col =
            Math.floor(Math.random() * tamaño);

        let puede = true;


        for (let i = 0; i < palabra.length; i++) {

            const nuevaFila =
                fila + direccion[0] * i;

            const nuevaCol =
                col + direccion[1] * i;


            if (
                nuevaFila < 0 ||
                nuevaFila >= tamaño ||
                nuevaCol < 0 ||
                nuevaCol >= tamaño
            ) {

                puede = false;

                break;
            }


            if (
                tablero[nuevaFila][nuevaCol] !== "" &&
                tablero[nuevaFila][nuevaCol] !== palabra[i]
            ) {

                puede = false;

                break;
            }
        }


        if (puede) {

            for (let i = 0; i < palabra.length; i++) {

                const nuevaFila =
                    fila + direccion[0] * i;

                const nuevaCol =
                    col + direccion[1] * i;

                tablero[nuevaFila][nuevaCol] =
                    palabra[i];
            }

            return true;
        }
    }

    return false;
}


// ===============================
// MOSTRAR TABLERO
// ===============================

function mostrarTablero() {

    const div =
        document.getElementById("tablero");

    div.innerHTML = "";


    for (let i = 0; i < tamaño; i++) {

        for (let j = 0; j < tamaño; j++) {

            const letra =
                document.createElement("div");

            letra.className = "letra";

            letra.textContent =
                tablero[i][j];

            letra.dataset.fila = i;

            letra.dataset.col = j;


            // ===========================
            // POINTER DOWN
            // ===========================

            letra.addEventListener(
                "pointerdown",
                iniciarSeleccion
            );


            // ===========================
            // POINTER MOVE
            // ===========================

            letra.addEventListener(
                "pointerenter",
                moverSeleccion
            );


            div.appendChild(letra);
        }
    }


    // Capturar movimiento directamente
    div.addEventListener(
        "pointermove",
        detectarMovimiento
    );

    div.addEventListener(
        "pointerup",
        finalizarSeleccion
    );

    div.addEventListener(
        "pointercancel",
        cancelarSeleccion
    );

    div.addEventListener(
        "pointerleave",
        detectarMovimiento
    );
}


// ===============================
// INICIAR SELECCIÓN
// ===============================

function iniciarSeleccion(event) {

    if (event.pointerType === "mouse" && event.button !== 0) {
        return;
    }

    if (event.currentTarget.classList.contains("encontrada")) {
        return;
    }

    event.preventDefault();

    seleccionando = true;

    celdaInicio = event.currentTarget;

    ultimaCelda = celdaInicio;

    limpiarSeleccionTemporal();

    seleccionarLinea(
        celdaInicio,
        celdaInicio
    );
}


// ===============================
// MOVER SELECCIÓN
// ===============================

function moverSeleccion(event) {

    if (!seleccionando) {
        return;
    }

    event.preventDefault();

    actualizarSeleccion(event.currentTarget);
}


// ===============================
// DETECTAR MOVIMIENTO
// ===============================

function detectarMovimiento(event) {

    if (!seleccionando) {
        return;
    }

    event.preventDefault();

    const elemento =
        document.elementFromPoint(
            event.clientX,
            event.clientY
        );


    if (
        elemento &&
        elemento.classList.contains("letra")
    ) {

        actualizarSeleccion(elemento);
    }
}


// ===============================
// ACTUALIZAR SELECCIÓN
// ===============================

function actualizarSeleccion(celdaFinal) {

    if (!celdaInicio) {
        return;
    }

    if (celdaFinal.classList.contains("encontrada")) {
        return;
    }

    if (ultimaCelda === celdaFinal) {
        return;
    }

    ultimaCelda = celdaFinal;

    seleccionarLinea(
        celdaInicio,
        celdaFinal
    );
}


// ===============================
// SELECCIONAR LÍNEA
// ===============================

function seleccionarLinea(inicio, fin) {

    limpiarSeleccionTemporal();

    const filaInicio =
        parseInt(inicio.dataset.fila);

    const colInicio =
        parseInt(inicio.dataset.col);

    const filaFin =
        parseInt(fin.dataset.fila);

    const colFin =
        parseInt(fin.dataset.col);


    const diferenciaFila =
        filaFin - filaInicio;

    const diferenciaCol =
        colFin - colInicio;


    // Solo líneas rectas o diagonales

    const esHorizontal =
        diferenciaFila === 0;

    const esVertical =
        diferenciaCol === 0;

    const esDiagonal =
        Math.abs(diferenciaFila) ===
        Math.abs(diferenciaCol);


    if (
        !esHorizontal &&
        !esVertical &&
        !esDiagonal
    ) {

        return;
    }


    const pasoFila =
        Math.sign(diferenciaFila);

    const pasoCol =
        Math.sign(diferenciaCol);


    const cantidad =
        Math.max(
            Math.abs(diferenciaFila),
            Math.abs(diferenciaCol)
        );


    seleccion = [];


    for (let i = 0; i <= cantidad; i++) {

        const fila =
            filaInicio + pasoFila * i;

        const col =
            colInicio + pasoCol * i;


        const celda =
            document.querySelector(
                `.letra[data-fila="${fila}"][data-col="${col}"]`
            );


        if (celda) {

            if (!celda.classList.contains("encontrada")) {

                celda.classList.add("seleccionada");

                seleccion.push(celda);
            }
        }
    }
}


// ===============================
// FINALIZAR SELECCIÓN
// ===============================

function finalizarSeleccion(event) {

    if (!seleccionando) {
        return;
    }

    event.preventDefault();

    seleccionando = false;

    verificarSeleccion();

    celdaInicio = null;

    ultimaCelda = null;
}


// ===============================
// CANCELAR SELECCIÓN
// ===============================

function cancelarSeleccion() {

    if (!seleccionando) {
        return;
    }

    seleccionando = false;

    limpiarSeleccionTemporal();

    seleccion = [];

    celdaInicio = null;

    ultimaCelda = null;
}


// ===============================
// VERIFICAR PALABRA
// ===============================

function verificarSeleccion() {

    if (seleccion.length === 0) {
        return;
    }


    const texto =
        seleccion
            .map(celda => celda.textContent)
            .join("");


    const textoInverso =
        texto
            .split("")
            .reverse()
            .join("");


    let palabraEncontrada = null;


    palabras.forEach(palabra => {

        if (
            !encontradas.includes(palabra) &&
            (
                texto === palabra ||
                textoInverso === palabra
            )
        ) {

            palabraEncontrada = palabra;
        }
    });


    if (palabraEncontrada) {

        encontradas.push(
            palabraEncontrada
        );

        puntaje += 10;


        document.getElementById("puntaje")
            .innerHTML = puntaje;


        seleccion.forEach(celda => {

            celda.classList.remove(
                "seleccionada"
            );

            celda.classList.add(
                "encontrada"
            );
        });


        actualizarLista();

        verificarFinal();

    } else {

        // Selección incorrecta:
        // se elimina completamente

        limpiarSeleccionTemporal();
    }


    seleccion = [];
}


// ===============================
// LIMPIAR SELECCIÓN TEMPORAL
// ===============================

function limpiarSeleccionTemporal() {

    document
        .querySelectorAll(".letra.seleccionada")
        .forEach(celda => {

            celda.classList.remove(
                "seleccionada"
            );
        });
}


// ===============================
// ACTUALIZAR LISTA
// ===============================

function actualizarLista() {

    document
        .querySelectorAll("#listaPalabras li")
        .forEach(li => {

            if (
                encontradas.includes(
                    li.textContent.trim()
                )
            ) {

                li.classList.add("correcta");

            } else {

                li.classList.remove("correcta");
            }
        });
}


// ===============================
// CRONÓMETRO
// ===============================

function iniciarTiempo() {

    clearInterval(reloj);

    segundos = 0;

    reloj = setInterval(() => {

        segundos++;

        const min =
            Math.floor(segundos / 60);

        const seg =
            segundos % 60;


        document.getElementById("tiempo")
            .innerHTML =
                String(min).padStart(2, "0")
                + ":"
                +
                String(seg).padStart(2, "0");

    }, 1000);
}


// ===============================
// FINAL DEL JUEGO
// ===============================

function verificarFinal() {

    if (
        encontradas.length ===
        palabras.length
    ) {

        clearInterval(reloj);


        const minutos =
            Math.floor(segundos / 60);

        const seg =
            segundos % 60;


        document.getElementById(
            "resultado"
        ).innerHTML =

            `
            🎉 FELICIDADES ${nombreEstudiante}

            <br><br>

            🔎 Palabras encontradas:
            ${encontradas.length}/${palabras.length}

            <br><br>

            ⭐ Puntaje final:
            ${puntaje} puntos

            <br><br>

            ⏱ Tiempo:
            ${minutos} minutos ${seg} segundos
            `;
    }
}


// ===============================
// REINICIAR
// ===============================

function reiniciarJuego() {

    clearInterval(reloj);

    encontradas = [];

    puntaje = 0;

    segundos = 0;

    seleccion = [];

    seleccionando = false;

    celdaInicio = null;

    ultimaCelda = null;


    document.getElementById(
        "puntaje"
    ).innerHTML = "0";


    document.getElementById(
        "tiempo"
    ).innerHTML = "00:00";


    document.getElementById(
        "resultado"
    ).innerHTML = "";


    actualizarLista();

    crearTablero();

    iniciarTiempo();
}
