import Game from './Game.js'
import Keyboard, { KEYBOARD_ROWS } from './Keyboard.js'
import { useCallback, useEffect, useState } from 'react'
import { WORD_LIST } from '../data/wordlist.js'

const NUMBER_OF_GUESSES = 5
const NUMBER_OF_TILES = 5

const _changeMatrixAtIndex = (matrix, index, letter) => {
	let newMatrix = matrix.map((row) => row.map((col) => col))

	newMatrix[index.row][index.col] = letter

	return newMatrix
}

function Dashboard() {
	const [answer, setAnswer] = useState()
	const [solved, setSolved] = useState(false)

	const [guesses, setGuesses] = useState(
		Array(NUMBER_OF_GUESSES).fill(Array(NUMBER_OF_TILES).fill(''))
	)

	const [activeIndex, setActiveIndex] = useState({ row: 0, col: 0 })

	const _decrementActiveIndexCol = useCallback(() => {
		setActiveIndex({
			row: activeIndex.row,
			col: activeIndex.col > 0 ? activeIndex.col - 1 : 0,
		})
	}, [activeIndex])

	const _incrementActiveIndexCol = useCallback(() => {
		setActiveIndex({
			row: activeIndex.row,
			col:
				activeIndex.col < NUMBER_OF_TILES - 1
					? activeIndex.col + 1
					: activeIndex.col,
		})
	}, [activeIndex])

	const _handleClick = useCallback(
		(letter) => {
			if (!solved) {
				if (letter === 'Backspace') {
					setGuesses(_changeMatrixAtIndex(guesses, activeIndex, ''))

					_decrementActiveIndexCol()
				} else if (letter === 'Enter') {
					const guess = guesses[activeIndex.row].join('')

					if (guess.length === NUMBER_OF_TILES) {
						if (guess === answer) {
							setSolved(true)
						}
						if (WORD_LIST.includes(guess)) {
							setActiveIndex({
								row:
									activeIndex.row < NUMBER_OF_GUESSES
										? activeIndex.row + 1
										: activeIndex.row,
								col: 0,
							})
						}
					}
				} else {
					setGuesses(_changeMatrixAtIndex(guesses, activeIndex, letter))

					_incrementActiveIndexCol()
				}
			}
		},
		[
			answer,
			activeIndex,
			guesses,
			solved,
			_decrementActiveIndexCol,
			_incrementActiveIndexCol,
		]
	)

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (KEYBOARD_ROWS.flat().includes(e.key)) {
				_handleClick(e.key)
			}

			if (e.key === 'ArrowRight') {
				_incrementActiveIndexCol()
			}

			if (e.key === 'ArrowLeft') {
				_decrementActiveIndexCol()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [_handleClick, _incrementActiveIndexCol, _decrementActiveIndexCol])

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * WORD_LIST.length)

		setAnswer(WORD_LIST[randomIndex])
	}, [])

	return (
		<div className="dashboard">
			<header>Waddle</header>
			{solved && "You've solved it!"}
			{!solved && activeIndex.row === NUMBER_OF_GUESSES && "You've lost!"}
			<Game guesses={guesses} activeIndex={activeIndex} answer={answer} />

			<Keyboard
				onClick={_handleClick}
				usedLetters={guesses.slice(0, activeIndex.row).flat()}
			/>
		</div>
	)
}

export default Dashboard
