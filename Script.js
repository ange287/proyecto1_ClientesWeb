let matriz1 = [];
let matriz2 = [];
contador = 0;

function crearMatriz(numeroMatriz) {
    // Obtener filas y columnas
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Validar que los valores sean válidos
    if (isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1) {
        alert("Por favor, ingrese un tamaño válido para la matriz.");
        return;
    }

    // Obtener el contenedor de la matriz
    const contenedor = document.getElementById(`contenedor-matriz${numeroMatriz}`);
    contenedor.innerHTML = ""; // Limpiar el contenedor

    // Crear los inputs para la matriz
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = `matriz${numeroMatriz}-${i}-${j}`;
            input.placeholder = `M${numeroMatriz}[${i}][${j}]`; // Placeholder para indicar la posición
            contenedor.appendChild(input);
        }
        contenedor.appendChild(document.createElement("br")); // Salto de línea después de cada fila
    }

    // Mostrar el contenedor de la matriz
    contenedor.classList.remove("oculto");

    // Verificar si ambas matrices están creadas para mostrar las operaciones
    verificarMatricesCreadas();
}

function verificarMatricesCreadas() {
    const matriz1Creada = document.getElementById("contenedor-matriz1").children.length > 0;
    const matriz2Creada = document.getElementById("contenedor-matriz2").children.length > 0;

    // Mostrar u ocultar las operaciones específicas para cada matriz
    const opMatriz1 = document.querySelector(".opmatriz1");
    const opMatriz2 = document.querySelector(".opmatriz2");

    if (matriz1Creada) {
        opMatriz1.style.display = "inline-block";
    } else {
        opMatriz1.style.display = "none";
    }

    if (matriz2Creada) {
        opMatriz2.style.display = "inline-block";
    } else {
        opMatriz2.style.display = "none";
    }
}

function obtenerMatriz(numeroMatriz, filas, columnas) {
    const matriz = [];
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            const valor = parseFloat(document.getElementById(`matriz${numeroMatriz}-${i}-${j}`).value);
            matriz[i][j] = isNaN(valor) ? 0 : valor; // Si no hay valor, se asume 0
        }
    }
    return matriz;
}
