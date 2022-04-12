import Game from './Game.js'
import Keyboard, { KEYBOARD_ROWS } from './Keyboard.js'
import { useCallback, useEffect, useState } from 'react'
import { WORD_LIST } from '../data/wordlist.js'
import { getKeyboardHints, updateAtIndex } from './utils.js'

const NUMBER_OF_GUESSES = 6
const NUMBER_OF_TILES = 5

function Dashboard() {
	const [answer, setAnswer] = useState('')
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

	const _incrementActiveIndexRow = useCallback(() => {
		setActiveIndex({
			row:
				activeIndex.row < NUMBER_OF_GUESSES
					? activeIndex.row + 1
					: activeIndex.row,
			col: 0,
		})
	}, [activeIndex])

	const _handleClick = useCallback(
		(letter) => {
			if (!solved) {
				if (letter === 'backspace') {
					setGuesses(updateAtIndex(guesses, activeIndex, ''))

					_decrementActiveIndexCol()
				} else if (letter === 'enter') {
					const guess = guesses[activeIndex.row].join('')

					if (guess.length === NUMBER_OF_TILES) {
						if (guess === answer) {
							setSolved(true)
						}
						if (WORD_LIST.includes(guess)) {
							_incrementActiveIndexRow()
						}
					}
				} else {
					setGuesses(updateAtIndex(guesses, activeIndex, letter))

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
			_incrementActiveIndexRow,
		]
	)

	useEffect(() => {
		const handleKeyDown = (e) => {
			const lowerKey = e.key.toLocaleLowerCase()

			if (KEYBOARD_ROWS.flat().includes(lowerKey)) {
				_handleClick(lowerKey)
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
			{!solved && activeIndex.row === NUMBER_OF_GUESSES && "Nice try! The answer was: " + answer.toLocaleUpperCase()}

			<Game guesses={guesses} activeIndex={activeIndex} answer={answer} />

			<Keyboard
				onClick={_handleClick}
				hints={getKeyboardHints(guesses.slice(0, activeIndex.row), answer)}
			/>
		</div>
	)
}

export default Dashboard
