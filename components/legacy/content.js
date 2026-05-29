var body = document.body
var icon = document.createElement('span')
var box = document.createElement('div')
var content = document.createElement('div')
var checkbox = document.createElement("input")
var label = document.createElement("span")
var footer = document.createElement('div')
var close = document.createElement('button')
var header = document.createElement('div')
var title = document.createElement('p')
var img = document.createElement('img')

var css_box = [{ tag: "user-select", value: "none" }, { tag: "padding", value: "16px" }, { tag: "background", value: "#FFFFFF" }, { tag: "z-index", value: "999999" }, { tag: "position", value: "fixed" }, { tag: "right", value: "0" }, { tag: "top", value: "0" }, { tag: "opacity", value: "0" }, { tag: "transition", value: "opacity 0.3s linear" }, { tag: "max-width", value: "352px" }, { tag: "margin", value: "5px" }, { tag: "display", value: "block" }, { tag: "box-shadow", value: " 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)" }, { tag: "border-radius", value: "10px" }, { tag: "font-family", value: '"Roboto", "Helvetica", "Arial", sans-serif' }]
var css_content = [{ tag: "box-sizing", value: "border-box" }, { tag: "font-size", value: "16px" }, { tag: "color", value: "#222" }]
var css_footer = [{ tag: "padding", value: "4px" }, { tag: "font-family", value: '"Roboto", "Helvetica", "Arial", sans-serif' }]
var css_img = [{ tag: "margin", value: "0" }, { tag: "padding", value: "0" }, { tag: "width", value: "32px" }, { tag: "display", value: "inline-block" }, { tag: "margin-right", value: "16px" }, { tag: "vertical-align", value: "middle" }]
var css_close = [{ tag: "float", value: "right" }, { tag: "font-size", value: "0.875rem" }, { tag: "font-family", value: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif"' }, { tag: "font-weight", value: "500" }, { tag: "line-height", value: "1.75" }, { tag: "letter-spacing", value: "0.02857em" }, { tag: "background", value: "transparent" }, { tag: "border", value: "0" }, { tag: "color", value: "#237f49" }, { tag: "cursor", value: "pointer" }, { tag: "font-weight", value: "500" }]
var css_header = [{ tag: "box-sizing", value: "border-box" }, { tag: "padding", value: "8px 0" }]


function style(element, css_obj, callback) {
    new Promise((resolve) => {
        css_obj.forEach((element_css, index) => {
            element.style[element_css.tag] = element_css.value
            if ((index + 1) == css_obj.length) {
                resolve(element)
            }
        })
    }).then(callback)
}

window.onload = function () {
    setTimeout(function () {
        chrome.storage.sync.get("forever", function (storage_data) {
            if (!storage_data.forever) {
                style(box, css_box, function (data) {
                    box = data
                    box.id = "sheetgo-dialog-box"
                    style(header, css_header, function (data) {
                        header = data
                        style(img, css_img, function (data) {
                            img = data
                            img.src = "https://cdn.sheetgo.com/chrome/icon/logo.png"
                            header.appendChild(img)
                            title.style["display"] = 'inline-block'
                            title.style["line-height"] = "32px"
                            title.style["height"] = "32px"
                            title.style["vertical-align"] = "middle"
                            title.style["font-size"] = "18px"
                            title.style["margin"] = "0"
                            title.innerText = "Want to connect this spreadsheet?"
                            header.appendChild(title)
                            box.appendChild(header)
                            style(content, css_content, function (data) {
                                content = data
                                content.innerHTML = "<p style='display: inline-block; line-height: 1.6; margin-bottom: 20px;'>Click on the Sheetgo icon to import or export data, or add this file to a workflow.</p>"
                                checkbox.setAttribute("type", "checkbox")
                                checkbox.onclick = function () {
                                    storage_data.forever = true
                                    chrome.storage.sync.set(storage_data)
                                }
                                checkbox.style["cursor"] = "pointer"
                                checkbox.style["margin-right"] = "12px"
                                checkbox.style["width"] = "16px"
                                checkbox.style["height"] = "16px"
                                checkbox.style["position"] = "relative"
                                checkbox.style["top"] = "2px"
                                checkbox.style["background"] = "transparent"
                                content.appendChild(checkbox)
                                label.style['font-size'] = "0.9125rem"
                                label.style['color'] = "#454545"
                                label.innerHTML = "Don't show this again"
                                content.appendChild(label)
                                box.appendChild(content)
                                style(close, css_close, function (data) {
                                    close = data
                                    close.onclick = function () {
                                        document.getElementById("sheetgo-dialog-box").remove()
                                    }
                                    style(footer, css_footer, function (data) {
                                        footer = data
                                        close.innerHTML = '<span style=";font-size: 0.875rem;line-height: 1.75;letter-spacing: 0.02857em;">CLOSE</span>'
                                        footer.appendChild(close)
                                        box.appendChild(footer)
                                        body.appendChild(box)
                                    })
                                })
                            })
                        })
                    })
                })
                setTimeout(function () {
                    box.style.opacity = 1
                }, 1000)
            }
        })
    }, 14000)
}


