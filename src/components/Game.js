import { useState } from 'react'

function TileRow({
	active,
	answer = '',
	activeTileIndex,
	rowIndex,
	letters = [],
}) {
	let dynamicAnswer = answer.split('')

	return (
		<div className={`tile-row ${active ? 'active' : 'inactive'}`}>
			{letters.map((letter, i) => {
				const isPresent = dynamicAnswer.includes(letter)
				const isCorrectlyPlaced = dynamicAnswer[i] === letter

				// setDynamicAnswer(dynamicAnswer.splice(i, 1, '-'))

				return (
					<Tile
						key={`${rowIndex}-${i}`}
						letter={letter}
						active={active && activeTileIndex === i}
						isCorrectlyPlaced={isCorrectlyPlaced}
						isPresent={isPresent}
					/>
				)
			})}
		</div>
	)
}

function Tile({ active, letter = '', isPresent, isCorrectlyPlaced }) {
	return (
		<div
			className={`tile${active ? ' active' : ''}${isPresent ? ' present' : ''}${
				isCorrectlyPlaced ? ' correct' : ''
			}`}
		>
			{letter}
		</div>
	)
}

function Game({ activeIndex, answer, guesses }) {
	return (
		<div className="game-section">
			<div className="tile-container">
				{guesses.map((guessRow, i) => (
					<TileRow
						active={activeIndex.row === i}
						activeTileIndex={activeIndex.col}
						answer={answer}
						key={i}
						rowIndex={i}
						letters={guessRow}
					/>
				))}
			</div>
		</div>
	)
}
export default Game
