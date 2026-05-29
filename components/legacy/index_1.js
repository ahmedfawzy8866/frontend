const bodyContentContainer = document.getElementById('body-content')
const baseAppUrl = 'https://app.sheetgo.com/'
const stmParams = 'stm_source=chrome-extension&stm_medium=browser-action&stm_campaign=version-3.9'

const IMPORT = 'import'
const EXPORT = 'export'

const actionDirections = {
    [IMPORT]: 1,
    [EXPORT]: 2
}

const actions = [{
    id: IMPORT,
    title: 'Import data from file',
    description: 'Pull data from other file(s) into this spreadsheet.',
    imgUrl: 'https://cdn.sheetgo.com/chrome/assets/import.svg'
}, {
    id: EXPORT,
    title: 'Export data to another file',
    description: 'Push data from this spreadsheet to another file(s).',
    imgUrl: 'https://cdn.sheetgo.com/chrome/assets/export.svg'
}]

const handleSelectData = (actionId) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            var currentPageUrl = tabs[0].url
            const array_url = currentPageUrl.split('/')
            if (
                array_url[2] == "docs.google.com" &&
                array_url[3] == "spreadsheets" &&
                array_url[4] == "d"
            ) {
                console.log("File id", array_url[5])
                var newURL = array_url[5]
                    ? (
                        `${baseAppUrl}connections/create?fileId=${array_url[5]}&${stmParams}&direction=${actionDirections[actionId]}`
                    )
                    : `${baseAppUrl}?${stmParams}`
                chrome.tabs.create({ url: newURL })
                window.close()
            }
        }
    })
}

const handleKeyDown = (e, actionId) => {
    const { code } = e || {}
    if (['NumpadEnter', 'Space', 'Enter'].includes(code)) {
        handleSelectData(actionId)
        return
    }
    return
}

actions.forEach(action => {
    const cardTitle = document.createElement('p')
    cardTitle.classList.add('cardTitle')
    cardTitle.innerText = action.title

    const cardDescriptionText = document.createElement('p')
    cardDescriptionText.classList.add('cardText')
    cardDescriptionText.innerText = action.description

    const cardDescriptionContainer = document.createElement('div')
    cardDescriptionContainer.classList.add('cardDescription')
    cardDescriptionContainer.appendChild(cardTitle)
    cardDescriptionContainer.appendChild(cardDescriptionText)

    const cardIllustration = document.createElement('img')
    cardIllustration.setAttribute('src', action.imgUrl)
    cardIllustration.setAttribute('alt', action.id)
    cardIllustration.setAttribute('loading', 'lazy')
    cardIllustration.setAttribute('width', 33)
    cardIllustration.setAttribute('height', 58)

    const cardContent = document.createElement('div')
    cardContent.classList.add('cardContent')
    cardContent.appendChild(cardIllustration)
    cardContent.appendChild(cardDescriptionContainer)

    const actionButton = document.createElement('p')
    actionButton.classList.add('actionText')
    actionButton.innerText = 'Select data'

    const cardFooter = document.createElement('div')
    cardFooter.classList.add('cardFooter')
    cardFooter.appendChild(actionButton)

    const card = document.createElement('div')
    card.setAttribute('tabIndex', '0')
    card.setAttribute('role', 'button')
    card.setAttribute('aria-label', action.title)
    card.classList.add('card')
    card.appendChild(cardContent)
    card.appendChild(cardFooter)

    card.addEventListener('click', () => handleSelectData(action.id))
    card.addEventListener('keydown', (e) => handleKeyDown(e, action.id))

    bodyContentContainer.appendChild(card)
})
