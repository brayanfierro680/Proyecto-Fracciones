function calcular() {

    let n1 = Number(document.getElementById("num1").value);
    let d1 = Number(document.getElementById("den1").value);

    let n2 = Number(document.getElementById("num2").value);
    let d2 = Number(document.getElementById("den2").value);

    let operacion = document.getElementById("operacion").value;

    if (d1 === 0 || d2 === 0) {
        document.getElementById("resultado").innerHTML =
            "❌ El denominador no puede ser 0.";
        return;
    }

    let numerador;
    let denominador;

    if (operacion === "+") {
        numerador = n1 * d2 + n2 * d1;
        denominador = d1 * d2;
    }

    else if (operacion === "-") {
        numerador = n1 * d2 - n2 * d1;
        denominador = d1 * d2;
    }

    else if (operacion === "*") {
        numerador = n1 * n2;
        denominador = d1 * d2;
    }

    else if (operacion === "/") {

        if (n2 === 0) {
            document.getElementById("resultado").innerHTML =
                "❌ No se puede dividir entre cero.";
            return;
        }

        numerador = n1 * d2;
        denominador = d1 * n2;
    }

    let resultado = simplificarFraccion(numerador, denominador);

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado.numerador + "/" + resultado.denominador;
}


function simplificarFraccion(numerador, denominador) {

    let a = Math.abs(numerador);
    let b = Math.abs(denominador);

    while (b !== 0) {
        let temporal = b;
        b = a % b;
        a = temporal;
    }

    let mcd = a;

    numerador = numerador / mcd;
    denominador = denominador / mcd;

    if (denominador < 0) {
        numerador *= -1;
        denominador *= -1;
    }

    return {
        numerador: numerador,
        denominador: denominador
    };
}


function simplificar() {

    let numerador = Number(document.getElementById("num1").value);
    let denominador = Number(document.getElementById("den1").value);

    if (denominador === 0) {
        document.getElementById("resultado").innerHTML =
            "❌ El denominador no puede ser 0.";
        return;
    }

    let resultado = simplificarFraccion(numerador, denominador);

    document.getElementById("resultado").innerHTML =
        "Fracción simplificada: " +
        resultado.numerador + "/" +
        resultado.denominador;
}


function limpiar() {

    document.getElementById("num1").value = "";
    document.getElementById("den1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("den2").value = "";

    document.getElementById("resultado").innerHTML =
        "Resultado: —";
}
