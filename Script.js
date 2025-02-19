let matriz1 = [];
let matriz2 = [];
contador = 0;

function crearMatriz(numeroMatriz) {
    // Obtener filas y columnas
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);
    contador++;

    // Validar que los valores sean válidos
    if (isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1) {
        alert("Por favor, ingrese un tamaño válido para la matriz.");
        return;
    }

    // Obtener el contenedor de la matriz
    const contenedor = document.getElementById(`contenedor-matriz${numeroMatriz}`);
    if (contador === 1) {
        contenedor.innerHTML = "<h3>Matriz 1</h3>"; // Limpiar el contenedor
    } else {
        contenedor.innerHTML = "<h3>Matriz 2</h3>"; // Limpiar el contenedor
    }

    // Crear los inputs para la matriz
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = `matriz${numeroMatriz}-${i}-${j}`;
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

function sumarMatrices() {
    const filas1 = parseInt(document.getElementById("filas1").value);
    const columnas1 = parseInt(document.getElementById("columnas1").value);
    const filas2 = parseInt(document.getElementById("filas2").value);
    const columnas2 = parseInt(document.getElementById("columnas2").value);

    // Validar que las matrices tengan las mismas dimensiones
    if (filas1 !== filas2 || columnas1 !== columnas2) {
        alert("Las matrices deben tener las mismas dimensiones para sumarse.");
        return;
    }

    // Obtener las matrices
    matriz1 = obtenerMatriz(1, filas1, columnas1);
    matriz2 = obtenerMatriz(2, filas2, columnas2);

    // Sumar las matrices
    const resultado = [];
    for (let i = 0; i < filas1; i++) {
        resultado[i] = [];
        for (let j = 0; j < columnas1; j++) {
            resultado[i][j] = matriz1[i][j] + matriz2[i][j];
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}

function restarMatrices() {
    const filas1 = parseInt(document.getElementById("filas1").value);
    const columnas1 = parseInt(document.getElementById("columnas1").value);
    const filas2 = parseInt(document.getElementById("filas2").value);
    const columnas2 = parseInt(document.getElementById("columnas2").value);

    // Validar que las matrices tengan las mismas dimensiones
    if (filas1 !== filas2 || columnas1 !== columnas2) {
        alert("Las matrices deben tener las mismas dimensiones para restarse.");
        return;
    }

    // Obtener las matrices
    matriz1 = obtenerMatriz(1, filas1, columnas1);
    matriz2 = obtenerMatriz(2, filas2, columnas2);

    // Restar las matrices
    const resultado = [];
    for (let i = 0; i < filas1; i++) {
        resultado[i] = [];
        for (let j = 0; j < columnas1; j++) {
            resultado[i][j] = matriz1[i][j] - matriz2[i][j];
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}

function multiplicarMatrices() {
    const filas1 = parseInt(document.getElementById("filas1").value);
    const columnas1 = parseInt(document.getElementById("columnas1").value);
    const filas2 = parseInt(document.getElementById("filas2").value);
    const columnas2 = parseInt(document.getElementById("columnas2").value);

    // Validar que las matrices sean multiplicables
    if (columnas1 !== filas2) {
        alert("El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2 para multiplicarse.");
        return;
    }

    // Obtener las matrices
    matriz1 = obtenerMatriz(1, filas1, columnas1);
    matriz2 = obtenerMatriz(2, filas2, columnas2);

    // Multiplicar las matrices
    const resultado = [];
    for (let i = 0; i < filas1; i++) {
        resultado[i] = [];
        for (let j = 0; j < columnas2; j++) {
            resultado[i][j] = 0;
            for (let k = 0; k < columnas1; k++) {
                resultado[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}

function multiplicarPorEscalar(numeroMatriz) {
    // Obtener el escalar
    const escalar = parseFloat(document.getElementById("escalar").value);
    if (isNaN(escalar)) {
        alert("Por favor, ingrese un escalar válido.");
        return;
    }

    // Obtener filas y columnas de la matriz seleccionada
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Obtener la matriz
    const matriz = obtenerMatriz(numeroMatriz, filas, columnas);

    // Multiplicar la matriz por el escalar
    const resultado = [];
    for (let i = 0; i < filas; i++) {
        resultado[i] = [];
        for (let j = 0; j < columnas; j++) {
            resultado[i][j] = matriz[i][j] * escalar;
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}

function calcularTranspuesta(numeroMatriz) {
    // Obtener filas y columnas de la matriz seleccionada
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Obtener la matriz
    const matriz = obtenerMatriz(numeroMatriz, filas, columnas);

    // Calcular la transpuesta
    const resultado = [];
    for (let j = 0; j < columnas; j++) {
        resultado[j] = [];
        for (let i = 0; i < filas; i++) {
            resultado[j][i] = matriz[i][j]; // Intercambiar filas por columnas
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}

function calcularDeterminante(numeroMatriz) {
    // Obtener filas y columnas de la matriz seleccionada
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Validar que la matriz sea cuadrada
    if (filas !== columnas) {
        alert("La matriz debe ser cuadrada (mismo número de filas y columnas) para calcular la determinante.");
        return;
    }

    // Obtener la matriz
    const matriz = obtenerMatriz(numeroMatriz, filas, columnas);

    // Calcular la determinante
    const determinante = calcularDeterminanteMatriz(matriz);

    // Mostrar el resultado
    mostrarResultado([[determinante]]);
}

function calcularDeterminanteMatriz(matriz) {
    const n = matriz.length;

    // Caso base: matriz 1x1
    if (n === 1) {
        return matriz[0][0];
    }

    // Caso base: matriz 2x2
    if (n === 2) {
        return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    }

    // Caso general: matriz nxn (n > 2)
    let determinante = 0;
    for (let j = 0; j < n; j++) {
        const cofactor = matriz[0][j] * calcularCofactor(matriz, 0, j);
        determinante += cofactor;
    }
    return determinante;
}

function calcularCofactor(matriz, fila, columna) {
    const submatriz = [];
    const n = matriz.length;
    for (let i = 0; i < n; i++) {
        if (i !== fila) {
            const filaSubmatriz = [];
            for (let j = 0; j < n; j++) {
                if (j !== columna) {
                    filaSubmatriz.push(matriz[i][j]);
                }
            }
            submatriz.push(filaSubmatriz);
        }
    }
    return Math.pow(-1, fila + columna) * calcularDeterminanteMatriz(submatriz);
}

function generarIdentidad(numeroMatriz) {
    // Obtener filas y columnas de la matriz
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Validar que la matriz sea cuadrada
    if (filas !== columnas) {
        alert("La matriz identidad debe ser cuadrada (mismo número de filas y columnas).");
        return;
    }

    // Crear la matriz identidad
    const matrizIdentidad = [];
    for (let i = 0; i < filas; i++) {
        matrizIdentidad[i] = []; // Crear una nueva fila
        for (let j = 0; j < columnas; j++) {
            matrizIdentidad[i][j] = i === j ? 1 : 0; // 1 en la diagonal, 0 en el resto
        }
    }

    // Mostrar el resultado paso a paso
    mostrarResultadoPasoAPaso(matrizIdentidad, `Generando matriz identidad para Matriz ${numeroMatriz}:`);
}

function mostrarResultadoPasoAPaso(matriz, mensaje) {
    const contenedorResultado = document.getElementById("contenedor-resultado");
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ""; // Limpiar el contenedor de resultados

    // Mostrar el mensaje inicial
    resultadoDiv.innerHTML += `<p><strong>${mensaje}</strong></p>`;

    // Mostrar la matriz paso a paso
    let paso = 1;
    const intervalo = setInterval(() => {
        if (paso > matriz.length) {
            clearInterval(intervalo); // Detener el intervalo cuando se hayan mostrado todos los pasos
            return;
        }

        // Mostrar la matriz hasta el paso actual
        let resultadoHTML = "<table border='1' style='border-collapse: collapse; text-align: center;'>";
        for (let i = 0; i < paso; i++) {
            resultadoHTML += "<tr>";
            for (let j = 0; j < matriz[i].length; j++) {
                resultadoHTML += `<td style='padding: 5px;'>${matriz[i][j]}</td>`;
            }
            resultadoHTML += "</tr>";
        }
        resultadoHTML += "</table>";

        // Actualizar el contenido del resultado
        resultadoDiv.innerHTML = `<p><strong>${mensaje}</strong></p>` + resultadoHTML;

        paso++;
    }, 1000); // Mostrar un paso cada segundo (1000 ms)

    // Mostrar el contenedor de resultados
    contenedorResultado.classList.remove("oculto");
}

function calcularInversa(numeroMatriz) {
    // Obtener filas y columnas de la matriz seleccionada
    const filas = parseInt(document.getElementById(`filas${numeroMatriz}`).value);
    const columnas = parseInt(document.getElementById(`columnas${numeroMatriz}`).value);

    // Validar que la matriz sea cuadrada
    if (filas !== columnas) {
        alert("La matriz debe ser cuadrada (mismo número de filas y columnas) para calcular la inversa.");
        return;
    }

    // Obtener la matriz
    const matriz = obtenerMatriz(numeroMatriz, filas, columnas);

    // Calcular el determinante
    const determinante = calcularDeterminanteMatriz(matriz);

    // Verificar si la matriz tiene inversa
    if (determinante === 0) {
        mostrarResultado("La matriz no tiene inversa porque su determinante es cero.");
        return;
    }

    // Calcular la inversa usando Gauss-Jordan
    const inversa = calcularInversaGaussJordan(matriz);

    // Mostrar el resultado en formato horizontal
    mostrarResultado(inversa);
}

function calcularInversaGaussJordan(matriz) {
    const n = matriz.length;
    const matrizAumentada = [];

    // Crear la matriz aumentada [A | I]
    for (let i = 0; i < n; i++) {
        matrizAumentada[i] = [...matriz[i], ...Array(n).fill(0)];
        matrizAumentada[i][n + i] = 1; // Diagonal de la matriz identidad
    }

    // Aplicar eliminación de Gauss-Jordan
    for (let i = 0; i < n; i++) {
        // Hacer el pivote 1
        let pivote = matrizAumentada[i][i];
        if (pivote === 0) {
            alert("No se puede calcular la inversa debido a un pivote cero.");
            return;
        }

        for (let j = 0; j < 2 * n; j++) {
            matrizAumentada[i][j] /= pivote;
        }

        // Hacer ceros en la columna del pivote
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = matrizAumentada[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    matrizAumentada[k][j] -= factor * matrizAumentada[i][j];
                }
            }
        }
    }

    // Extraer la inversa de la matriz aumentada
    const inversa = [];
    for (let i = 0; i < n; i++) {
        inversa[i] = matrizAumentada[i].slice(n);
    }

    return inversa;
}


function mostrarResultado(resultado) {
    const contenedorResultado = document.getElementById("contenedor-resultado");
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    if (typeof resultado === "string") {
        resultadoDiv.innerHTML = resultado; // Para mensajes como "La matriz no tiene inversa"
    } else {
        // Formatear la matriz como una tabla HTML en una sola línea
        let resultadoHTML = "<table border='1' style='border-collapse: collapse; text-align: center;'>";
        resultado.forEach(fila => {
            resultadoHTML += "<tr>";
            fila.forEach(valor => {
                resultadoHTML += `<td style='padding: 5px;'>${valor.toFixed(2)}</td>`; // Limita a 2 decimales
            });
            resultadoHTML += "</tr>";
        });
        resultadoHTML += "</table>";

        resultadoDiv.innerHTML = resultadoHTML;
    }

    // Mostrar el contenedor del resultado
    contenedorResultado.classList.remove("oculto");
}



function eliminarMatriz(numeroMatriz) {
    // Limpiar el contenedor de la matriz
    const contenedor = document.getElementById(`contenedor-matriz${numeroMatriz}`);
    contenedor.innerHTML = "";
    contenedor.classList.add("oculto"); // Ocultar el contenedor

    // Limpiar los valores de filas y columnas
    document.getElementById(`filas${numeroMatriz}`).value = "";
    document.getElementById(`columnas${numeroMatriz}`).value = "";

    // Ocultar las operaciones asociadas a la matriz eliminada
    document.querySelector(`.opmatriz${numeroMatriz}`).style.display = "none";

     // Limpiar el resultado
     document.getElementById("resultado").innerHTML = "";
     document.getElementById("contenedor-resultado").classList.add("oculto");
     contador = 0;  
}
