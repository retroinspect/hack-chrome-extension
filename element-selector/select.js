let selectedElement = undefined;
let selectedElementBorder = '';

function init() {
    window.addEventListener('mousemove', onInputMove);
    window.addEventListener('touchmove', onInputMove);
}

function getPointFromEvent(event) {
    if (event.touches) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }

    return { x: event.clientX, y: event.clientY };
}

function onInputMove(event) {
    const { x, y } = getPointFromEvent(event);
    selectElementFromPoint(x, y);
}

function selectElementFromPoint(x, y) {
    const elem = document.elementFromPoint(x, y);
    if (elem && elem !== selectedElement) {
        unselectElement();
        selectedElement = elem;
        selectedElementBorder = elem.style.border;
        elem.style.border = '3px solid';
    }
}

function unselectElement() {
    if (selectedElement) {
        selectedElement.style.border = selectedElementBorder;
    }
}

console.log('content-script registered');
init();