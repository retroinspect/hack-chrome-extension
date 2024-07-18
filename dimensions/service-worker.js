console.log('hello world');

let tabs = {};

function toggle(tab) {
    if (!tabs[tab.id]) {
        addTab(tab);
    } else {
        deactivateTab(tab.id);
    }
}

function addTab(tab) {
    // TODO
}

function deactivateTab(tabId) {
    // TODO
}

function removeTab(id) {
    // TODO
}


chrome.action.onClicked.addListener((tab) => {
    toggle(tab);
});

chrome.runtime.onConnect.addListener((port) => {
    tabs[port.sender.tab.id].initialize(port);
});

chrome.runtime.onSuspend.addListener(() => {
    for (const tabId in tabs) {
        tabs[tabId].deactivate(true);
    }
});

const dimensions = {
    image: new Image(),

    // TODO: may need offscreen
    canvas: document.createElement('canvas'),
    alive: true,

    activate: (tab) => {

    },

    deactivate: (silent) => {

    },

    onBrowserDisconnect: () {
        this.deactivate(true);
    },

    initialize: (port) => { },

    receiveWorkerMessage: (event) => {

    },

    receiveBrowserMessage: (event) => {

    },

    takeScreenshot: () => { },

    parseScreenshot: (dataUrl) => { },

    loadImage: () => { }
}

