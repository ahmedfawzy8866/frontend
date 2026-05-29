var id_sheets
var last_id = []
var is_sheetgo = false

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.storage.sync.set({forever: false})
// })

// Open Sheetgo with id of spreadsheet or only sheetgo app in a new tab
chrome.action.onClicked.addListener(function (activeTab) {
    if (id_sheets) {
        return
    }
    if (!is_sheetgo) {
        var newURL = "https://app.sheetgo.com/?stm_source=chrome-extension&stm_medium=browser-action&stm_campaign=version-3.9"
        chrome.tabs.create({ url: newURL })
    }
})

// Get URL when changing tab focus
chrome.tabs.onActivated.addListener(function (tab) {
    GetURL(tab.tabId)
})

// Get URL when tab is updated
chrome.tabs.onUpdated.addListener(function (tab_id, status, tab) {
    if (status.status == "complete" && tab.active) {
        GetURL(tab_id)
    }
})

// Verify the URL of tab and show a dialog
function GetURL(tab) {
    chrome.tabs.get(tab, function (current_tab) {
        if (!current_tab) return
        if (!current_tab.url) return
        var array_url = current_tab.url.split('/')
        if (array_url[2] == "docs.google.com" && array_url[3] == "spreadsheets" && array_url[4] == "d") {
            chrome.action.setPopup({popup: 'popup/index.html'})
            id_sheets = array_url[5]
            chrome.action.setBadgeText({ text: "!" })
            is_sheetgo = false
        } else if (array_url[2] == "app.sheetgo.com") {
            is_sheetgo = true
            chrome.action.setPopup({ popup: '' })
            chrome.action.setBadgeText({ text: "" })
            id_sheets = false
        } else {
            is_sheetgo = false
            chrome.action.setPopup({popup: ''})
            chrome.action.setBadgeText({ text: "" })
            id_sheets = false
        }
    })
}
