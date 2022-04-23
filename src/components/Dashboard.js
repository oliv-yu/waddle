import Game from './Game.js'
import Keyboard, { KEYBOARD_ROWS } from './Keyboard.js'
import { useCallback, useEffect, useState } from 'react'
import { WORD_LIST } from '../data/wordlist.js'
import { getKeyboardHints, updateAtIndex } from './utils.js'
import ThemeToggle from './context/ThemeToggle.js'

const NUMBER_OF_GUESSES = 6
const NUMBER_OF_TILES = 5

const _getRandomWord = (list) => list[Math.floor(Math.random() * list.length)]

function Dashboard() {
	const [answer, setAnswer] = useState(_getRandomWord(WORD_LIST))
	const [status, setStatus] = useState({
		solved: false,
		message: '',
		finished: false,
	})
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
			if (!status.finished) {
				setStatus({ ...status, message: '' })

				if (letter === 'backspace') {
					if (guesses[activeIndex.row][activeIndex.col]) {
						setGuesses(updateAtIndex(guesses, activeIndex, ''))
					} else {
						_decrementActiveIndexCol()
					}
				} else if (letter === 'enter') {
					const guess = guesses[activeIndex.row].join('')

					if (guess.length === NUMBER_OF_TILES) {
						if (guess === answer) {
							setStatus({
								solved: true,
								message: 'You solved it!',
								finished: true,
							})
						} else {
							if (WORD_LIST.includes(guess)) {
								if (activeIndex.row === NUMBER_OF_GUESSES - 1) {
									setStatus({
										solved: false,
										message: 'Nice try! The answer was: ' + answer,
										finished: true,
									})
								} else {
									_incrementActiveIndexRow()
								}
							} else {
								setStatus({
									solved: false,
									message: 'Not a real word!',
									finished: false,
								})
							}
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
			status,
			setStatus,
			_decrementActiveIndexCol,
			_incrementActiveIndexCol,
			_incrementActiveIndexRow,
		]
	)

	const _handleReplay = useCallback(() => {
		setAnswer(_getRandomWord(WORD_LIST))
		setStatus({
			solved: false,
			message: '',
			finished: false,
		})
		setGuesses(Array(NUMBER_OF_GUESSES).fill(Array(NUMBER_OF_TILES).fill('')))
		setActiveIndex({ row: 0, col: 0 })
	}, [])

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

	return (
		<div className="dashboard">
			<header>Waddle</header>

			<ThemeToggle />

			<div className="content">
				<div className="help-text">
					{!!status.message && status.message.toLocaleUpperCase()}
					{status.finished && (
						<button
							type="button"
							className={`btn btn-sm btn-${
								status.solved ? 'success' : 'danger'
							} replay`}
							onClick={_handleReplay}
						>
							REPLAY
						</button>
					)}
				</div>

				<Game
					guesses={guesses}
					activeIndex={activeIndex}
					answer={answer}
					onSelectTile={(row, col) => setActiveIndex({ row, col })}
				/>

				<Keyboard
					onClick={_handleClick}
					hints={getKeyboardHints(guesses.slice(0, activeIndex.row), answer)}
				/>
			</div>
		</div>
	)
}

export default Dashboard
