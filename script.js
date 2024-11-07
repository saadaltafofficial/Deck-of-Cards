let deckId
let computerScore = 0
let yourScore = 0

const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-card")
const cardDiv = document.getElementById("cards")
const remainingTxtEl = document.getElementById("remainingTxt")
const computerScoreEl = document.getElementById("computerScoreEl")
const yourScoreEl = document.getElementById("yourScoreEl")
const headerEl = document.getElementById("header")

async function fetchDeck() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    console.log(deckId)
}

newDeckBtn.addEventListener("click", (e) => {
    e.preventDefault
    drawCardBtn.disabled = false
    fetchDeck()
})

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    remainingTxtEl.textContent = `Remaining Cards: ${data.remaining}`
    cardDiv.children[0].innerHTML = `
        <img src="${data.cards[0].image}" alt=""/>
    `
    cardDiv.children[1].innerHTML = `
        <img src="${data.cards[1].image}" alt=""/>
    `

    const winner = determinWinner(data.cards[0], data.cards[1])
    headerEl.textContent = winner

    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        if(computerScore > yourScore) {
            headerEl.textContent = "Computer Won the Game"
        }else if ( yourScore > computerScore ) {
            headerEl.textContent = "You Won the Game"
        }else{
            headerEl.textContent = "It's a tie, Try Again"
        }
    }

})

function determinWinner (card1, card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    
    let carOfIndexOne = valueOptions.indexOf(card1.value)
    let carOfIndexTwo = valueOptions.indexOf(card2.value)

    if (carOfIndexOne > carOfIndexTwo) {
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return "Computer Won!"
    }else if (carOfIndexTwo > carOfIndexOne) {
        yourScore++
        yourScoreEl.textContent = `You Won: ${yourScore}`
        return "You Won!"
    }else {
        return "War"
    }
}




