import { goto } from "./goto.js";


chrome.commands.onCommand.addListener(
    async (command, tab) => {
        console.log("command: ", command)
        goto(tab, (await chrome.storage.local.get("gotoURL"))?.gotoURL)
    }    
)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request.id === "get-current-tab-url") {
        console.log("request: ", request);
        (async () => {
            const currentTab = (await chrome.tabs.query({active: true, currentWindow: true}))[0]
            console.log("current tab from bg: ", currentTab)
            sendResponse({tab : currentTab})

        })()
    }
    
    return true
    
})

