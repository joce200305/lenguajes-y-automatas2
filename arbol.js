const esExpresionValida = (expresion) => {
    return /^[0-9+\-*/()\s]+$/.test(expresion) && !/^[-]/.test(expresion);
};

const generarArbol = () => {
    const expresion = document.getElementById('expresion').value.trim();
    const contenedor = document.getElementById('arbol');

    if (!esExpresionValida(expresion)) {
        contenedor.innerHTML = '<p class="error">La expresión no es válida. Solo se permiten números, operadores y paréntesis.</p>';
        return;
    }

    try {
        contenedor.innerHTML = construirArbolDeExpresion(expresion);
    } catch (error) {
        contenedor.innerHTML = '<p class="error">Error al generar el árbol.</p>';
        console.error(error);
    }
};

const construirArbolDeExpresion = (expresion) => {
    const expresionSanitizada = expresion.replace(/[^0-9+\-*/()]/g, '').replace(/\s+/g, '');
    return crearNodo(expresionSanitizada);
};

const crearNodo = (expresion) => {
    if (!/[+\-*/]/.test(expresion)) {
        return `<div class="nodo-arbol"><div class="contenido-nodo">${expresion}</div></div>`;
    }

    const indiceOperador = encontrarIndiceOperador(expresion);
    if (indiceOperador === -1) {
        return crearNodo(expresion.slice(1, -1));
    }

    const operador = expresion[indiceOperador];
    const izquierda = expresion.slice(0, indiceOperador);
    const derecha = expresion.slice(indiceOperador + 1);

    return `
        <div class="nodo-arbol">
            <div class="contenido-nodo">${operador}</div>
            <div class="hijos">
                ${crearNodo(izquierda)}
                ${crearNodo(derecha)}
            </div>
        </div>
    `;
};

const encontrarIndiceOperador = (expresion) => {
    let nivelParentesis = 0;

    for (let i = expresion.length - 1; i >= 0; i--) {
        const char = expresion[i];
        if (char === ')') nivelParentesis++;
        if (char === '(') nivelParentesis--;

        if (nivelParentesis === 0 && /[+\-*/]/.test(char)) {
            return i;
        }
    }

    return -1;
};
