let gPreviousChatLength = 0
let gPreviousMatchId = ''
/**
 *
 * @param {string} elementID
 * @param {OnlineGame} onlineGame
 */
function addLogToElement(elementID, onlineGame) {
    let shouldUpdate = false
    shouldUpdate = onlineGame.match_id !== gPreviousMatchId
    shouldUpdate ||= gPreviousChatLength !== onlineGame.chat_messages.length
    if (!shouldUpdate) {
        return
    }
    gPreviousMatchId = onlineGame.match_id
    gPreviousChatLength = onlineGame.chat_messages.length
    const parentElement = document.getElementById(elementID)
    parentElement.textContent = ''
    for (/** @type ChatMessage */ const chat of onlineGame.chat_messages) {
        let div = document.createElement("div")
        div.innerHTML = `${chat.player_name}: ${chat.messageString}`
        parentElement.appendChild(div)
    }
    parentElement.scrollTop = parentElement.scrollHeight;
}