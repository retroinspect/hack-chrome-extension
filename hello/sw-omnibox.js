console.log("sw-omnibox.js");


chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log(reason);
    if (reason === "install") {
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    }
});

async function getApiSuggestions() {
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    console.log(apiSuggestions);
    if (apiSuggestions) {
        return apiSuggestions;
    }

    return [];
}

const URL_CHROME_EXTENSIONS_DOC =
    'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
        description: 'Enter a Chrome API or choose from past searches'
    });

    const apiSuggestions = await getApiSuggestions();
    const suggestions = apiSuggestions.map((api) => {
        return { content: api, description: `Open chrome.${api} API` };
    });

    suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener((input) => {
    chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
    updateHistory(input);
});

async function updateHistory(input) {
    const apiSuggestions = await getApiSuggestions();
    apiSuggestions.unshift(input);
    apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
    return chrome.storage.local.set({ apiSuggestions });
}