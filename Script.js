// ==========================================
// CALCULADORA DE FRACCIONES
// ==========================================

let historial = [];


// ==========================================
// MÁXIMO COMÚN DIVISOR
// ==========================================

function mcd(a, b) {

    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {

        let temporal = b;

        b = a % b;

        a = temporal;
    }

    return a;
}


// ==========================================
// SIMPLIFICAR FRACCIÓN
// ==========================================

function simplificar(num, den) {

    if (den === 0) {

        throw new Error(
            "El denominador no puede ser 0."
        );
    }


    // Si el denominador es negativo,
    // pasamos el signo al numerador.

    if (den < 0) {

        num *= -1;

        den *= -1;
    }


    const divisor = mcd(num, den);


    return {

        num: num / divisor,

        den: den / divisor

    };
}


// ==========================================
// CONVERTIR FRACCIÓN A HTML
// ==========================================

function mostrarFraccion(num, den) {

    // Si el denominador es 1,
    // mostramos solamente el número.

    if (den === 1) {

        return `
            <div class="resultado-fraccion">
                <span>${num}</span>
            </div>
        `;
    }


    return `
        <div class="resultado-fraccion">

            <span>${num}</span>

            <div class="resultado-linea"></div>

            <span>${den}</span>

        </div>
    `;
}


// ==========================================
// OBTENER LAS FRACCIONES
// ==========================================

function obtenerFracciones() {

    const num1 = parseInt(
        document.getElementById("num1").value
    );

    const den1 = parseInt(
        document.getElementById("den1").value
    );

    const num2 = parseInt(
        document.getElementById("num2").value
    );

    const den2 = parseInt(
        document.getElementById("den2").value
    );


    // Comprobar campos

    if (
        isNaN(num1) ||
        isNaN(den1) ||
        isNaN(num2) ||
        isNaN(den2)
    ) {

        alert(
            "Por favor, completa todos los campos."
        );

        return null;
    }


    // Comprobar denominadores

    if (den1 === 0 || den2 === 0) {

        alert(
            "El denominador no puede ser 0."
        );

        return null;
    }


    return {

        num1,
        den1,
        num2,
        den2

    };
}


// ==========================================
// FRACCIÓN A TEXTO
// ==========================================

function fraccionTexto(num, den) {

    if (den === 1) {

        return `${num}`;
    }


    return `${num}/${den}`;
}


// ==========================================
// REALIZAR OPERACIÓN
// ==========================================

function operar(operacion) {

    const datos = obtenerFracciones();


    if (!datos) {
        return;
    }


    const {
        num1,
        den1,
        num2,
        den2
    } = datos;


    let resultadoNum;

    let resultadoDen;

    let procedimiento = "";

    let simbolo;


    // ======================================
    // SUMA
    // ======================================

    if (operacion === "+") {

        resultadoNum =
            num1 * den2 +
            num2 * den1;

        resultadoDen =
            den1 * den2;

        simbolo = "+";


        procedimiento = `
            Para sumar fracciones buscamos
            un denominador común:

            <br><br>

            (${num1} × ${den2}) +
            (${num2} × ${den1})

            <br>

            ─────────────────

            <br>

            ${den1} × ${den2}

            <br><br>

            = (${num1 * den2} +
            ${num2 * den1}) /
            ${resultadoDen}

            <br><br>

            = ${resultadoNum}/${resultadoDen}
        `;
    }


    // ======================================
    // RESTA
    // ======================================

    else if (operacion === "-") {

        resultadoNum =
            num1 * den2 -
            num2 * den1;

        resultadoDen =
            den1 * den2;

        simbolo = "−";


        procedimiento = `
            Para restar fracciones usamos
            un denominador común:

            <br><br>

            (${num1} × ${den2}) −
            (${num2} × ${den1})

            <br>

            ─────────────────

            <br>

            ${den1} × ${den2}

            <br><br>

            = (${num1 * den2} −
            ${num2 * den1}) /
            ${resultadoDen}

            <br><br>

            = ${resultadoNum}/${resultadoDen}
        `;
    }


    // ======================================
    // MULTIPLICACIÓN
    // ======================================

    else if (operacion === "*") {

        resultadoNum =
            num1 * num2;

        resultadoDen =
            den1 * den2;

        simbolo = "×";


        procedimiento = `
            Para multiplicar fracciones
            multiplicamos los numeradores
            entre sí y los denominadores
            entre sí.

            <br><br>

            (${num1} × ${num2})
            /
            (${den1} × ${den2})

            <br><br>

            = ${resultadoNum}/${resultadoDen}
        `;
    }


    // ======================================
    // DIVISIÓN
    // ======================================

    else if (operacion === "/") {

        // No se puede dividir entre cero.

        if (num2 === 0) {

            alert(
                "No se puede dividir entre una fracción igual a 0."
            );

            return;
        }


        resultadoNum =
            num1 * den2;

        resultadoDen =
            den1 * num2;

        simbolo = "÷";


        procedimiento = `
            Para dividir fracciones
            multiplicamos la primera fracción
            por el inverso de la segunda.

            <br><br>

            ${num1}/${den1}
            ÷
            ${num2}/${den2}

            <br><br>

            = ${num1}/${den1}
            ×
            ${den2}/${num2}

            <br><br>

            = ${resultadoNum}/${resultadoDen}
        `;
    }


    // ======================================
    // SIMPLIFICAR RESULTADO
    // ======================================

    const originalNum = resultadoNum;

    const originalDen = resultadoDen;


    const resultado = simplificar(
        resultadoNum,
        resultadoDen
    );


    if (
        resultado.num !== originalNum ||
        resultado.den !== originalDen
    ) {

        procedimiento += `

            <br><br>

            <strong>
                🔄 Simplificamos:
            </strong>

            <br><br>

            ${originalNum}/${originalDen}

            =

            ${resultado.num}/${resultado.den}
        `;
    }


    // ======================================
    // MOSTRAR RESULTADO
    // ======================================

    mostrarResultado(
        resultado.num,
        resultado.den,
        procedimiento
    );


    // Cambiar operador visual

    document.getElementById(
        "operador"
    ).textContent = simbolo;


    // Agregar al historial

    agregarHistorial(

        `${fraccionTexto(num1, den1)}
        ${simbolo}
        ${fraccionTexto(num2, den2)}`,

        fraccionTexto(
            resultado.num,
            resultado.den
        )
    );
}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado(
    num,
    den,
    procedimiento
) {

    const resultado =
        document.getElementById(
            "resultado"
        );


    // Mostrar contenedor

    resultado.style.display =
        "block";


    // Mostrar fracción

    document.getElementById(
        "resultadoFraccion"
    ).innerHTML =
        mostrarFraccion(num, den);


    // Mostrar procedimiento

    document.getElementById(
        "procedimientoTexto"
    ).innerHTML =
        procedimiento;
}


// ==========================================
// SIMPLIFICAR PRIMERA FRACCIÓN
// ==========================================

function simplificarFraccion() {

    const num1 = parseInt(
        document.getElementById("num1").value
    );

    const den1 = parseInt(
        document.getElementById("den1").value
    );


    if (
        isNaN(num1) ||
        isNaN(den1)
    ) {

        alert(
            "Ingresa el numerador y denominador."
        );

        return;
    }


    if (den1 === 0) {

        alert(
            "El denominador no puede ser 0."
        );

        return;
    }


    const resultado =
        simplificar(num1, den1);


    const divisor =
        mcd(num1, den1);


    const procedimiento = `

        Buscamos el máximo común divisor
        (MCD) de ${num1} y ${den1}.

        <br><br>

        <strong>
            MCD = ${divisor}
        </strong>

        <br><br>

        Dividimos numerador y denominador
        entre ${divisor}:

        <br><br>

        ${num1} ÷ ${divisor}
        =
        ${resultado.num}

        <br>

        ${den1} ÷ ${divisor}
        =
        ${resultado.den}

    `;


    mostrarResultado(
        resultado.num,
        resultado.den,
        procedimiento
    );
    