const pantalla = document.getElementById('pantalla');
let operacionActual = ''; 
let reiniciarPantalla = false; 
function calcularSeno(grados) {
    const radianes = grados * (Math.PI / 180);
    return Math.sin(radianes);
}
function calcularCoseno(grados) {
    const radianes = grados * (Math.PI / 180);
    return Math.cos(radianes);
}
function calcularTangente(grados) {
    if ((grados - 90) % 180 === 0) {
        return "Error";
    }
    const radianes = grados * (Math.PI / 180);
    return Math.tan(radianes);
}
function calcularPotencia(base, exponente) {
    return Math.pow(base, exponente);
}
function calcularRaiz(numero) {
    if (numero < 0) {
        return "Error";
    }
    return Math.sqrt(numero);
}
function calcularLogaritmo(numero) {
    if (numero <= 0) {
        return "Error";
    }
    return Math.log(numero);
}
function calcularFactorial(numero) {
    if (numero < 0 || !Number.isInteger(numero)) return "Error";
    if (numero === 0 || numero === 1) return 1;
    let resultado = 1;
    for (let i = 1; i <= numero; i++) {
        resultado = resultado * i; 
    }
    return resultado;
}
function calcularValorAbsoluto(numero) {
    return Math.abs(numero);
}
document.querySelector('.botones').addEventListener('click', (evento) => {
    if (evento.target.tagName !== 'BUTTON') return;
    const botonTocado = evento.target;
    const textoBoton = botonTocado.innerText;
    if (botonTocado.classList.contains('btn-clear')) {
        operacionActual = '';
        pantalla.innerText = '0';
        return;
    }
    if (botonTocado.classList.contains('btn-delete')) {
        operacionActual = operacionActual.slice(0, -1); 
        pantalla.innerText = operacionActual || '0'; 
        return;
    }
    if (botonTocado.classList.contains('btn-igual')) {
        try {
            let expresion = operacionActual.replace('^', '**');
            let resultado = eval(expresion);
            if (resultado === Infinity || resultado === -Infinity) {
                pantalla.innerText = 'Error';
            } else {
                pantalla.innerText = Number.isInteger(resultado) ? resultado : resultado.toFixed(4);
            }
            operacionActual = pantalla.innerText;
            reiniciarPantalla = true;
        } catch {
            pantalla.innerText = 'Error';
            operacionActual = '';
        }
        return;
    }
    if (botonTocado.classList.contains('btn-cientifica') || textoBoton === '√') {
        const valorActual = parseFloat(pantalla.innerText);
        if (isNaN(valorActual)) return; 
        let resultadoCientifico;
        switch (textoBoton) {
            case 'sin': resultadoCientifico = calcularSeno(valorActual); break;
            case 'cos': resultadoCientifico = calcularCoseno(valorActual); break;
            case 'tan': resultadoCientifico = calcularTangente(valorActual); break;
            case '√':   resultadoCientifico = calcularRaiz(valorActual); break;
            case 'log': resultadoCientifico = calcularLogaritmo(valorActual); break;
            case 'x!':  resultadoCientifico = calcularFactorial(valorActual); break;
            case 'abs': resultadoCientifico = calcularValorAbsoluto(valorActual); break;
        }
        if (resultadoCientifico === "Error") {
            pantalla.innerText = "Error";
            operacionActual = "";
        } else {
            pantalla.innerText = Number.isInteger(resultadoCientifico) ? resultadoCientifico : resultadoCientifico.toFixed(4);
            operacionActual = pantalla.innerText;
        }
        reiniciarPantalla = true;
        return;
    }
    if (pantalla.innerText === '0' || reiniciarPantalla) {
        operacionActual = textoBoton;
        reiniciarPantalla = false;
    } else {
        operacionActual += textoBoton; 
    }
    pantalla.innerText = operacionActual;
});