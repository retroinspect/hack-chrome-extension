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
    highlightElementFromPoint(x, y);
}

function highlightElementFromPoint(x, y) {
    const elem = document.elementFromPoint(x, y);
    console.log(elem);
    if (elem) {
        elem.style.border = '3px solid';
    }
}

console.log('content-script registered');
init();