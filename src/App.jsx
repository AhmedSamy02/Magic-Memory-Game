import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card/Card'
const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
]
function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)
	const shuffleCard = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card, index) => ({ ...card, id: index + 1 }))
		setChoiceOne(null)
    setChoiceTwo(null)
		setCards(shuffledCards)
		setTurns(0)
	}
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne !== choiceTwo && choiceOne.src == choiceTwo.src) {
				console.log('Cards Matched!!')
				resetTurn(true)
			} else {
				console.log("Cards don't match")
				setTimeout(() => resetTurn(false), 1000)
			}
		}
	}, [choiceOne, choiceTwo])
	useEffect(() => {
		shuffleCard()
	}, [])
	const resetTurn = (matched) => {
		setTurns((prevTurns) => prevTurns + 1)
		setChoiceOne(null)
		setChoiceTwo(null)
		if (matched) {
			let newCards = cards
			newCards[choiceOne.id - 1].matched = true
			newCards[choiceTwo.id - 1].matched = true
			console.log(newCards)
			setCards(newCards)
		}
		setDisabled(false)
	}
	return (
		<div className="App">
			<h1>Magic Memory</h1>
			<button onClick={shuffleCard}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => {
					return (
						<Card
							card={card}
							key={card.id}
							handleClick={handleChoice}
							flipped={
								card === choiceOne ||
								card === choiceTwo ||
								card.matched === true
							}
							disabled={disabled}
						></Card>
					)
				})}
			</div>
			{cards.length != 0 ? (
				<h3>
					Number of Turns <b>{turns}</b>
				</h3>
			) : null}
		</div>
	)
}

export default App
