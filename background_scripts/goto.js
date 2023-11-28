export const goto = (_tab, gotoURL) => {
    console.log("goto");
    const GOTO_URL = gotoURL || "https://www.google.com"
    chrome.tabs.query({}, async function(tabs) {
        const currentTab = tabs.filter((tab) => tab.active)[0]

        if(currentTab.url.includes(GOTO_URL)) {
            const result = await chrome.storage.local.get("backTab")
            chrome.tabs.update(
                result?.backTab?.id,
                {"active":true},
                () => {
                    chrome.storage.local.remove("backTab")
                });   
        }

        else {
            const gotoTab = tabs.filter((tab) => tab.url.includes(GOTO_URL))
            const backTab = {"id" : currentTab.id}
                if(gotoTab.length > 0){
                    chrome.tabs.update(
                        gotoTab[0]?.id,
                        {active: true},
                        () => chrome.storage.local.set({ backTab: backTab }))
                }

                else{
                    chrome.tabs.create({url: GOTO_URL, active:false})
                }
        }
        
    })
}