import { getHints } from './utils'

function TileRow({ active, hints, activeTileIndex, rowIndex, letters }) {
	return (
		<div className={`tile-row ${active ? 'active' : ''}`}>
			{letters.map((letter, i) => (
				<Tile
					key={`${rowIndex}-${i}`}
					letter={letter}
					active={active && activeTileIndex === i}
					hint={hints[i]}
				/>
			))}
		</div>
	)
}

function Tile({ active, letter, hint = '' }) {
	return (
		<div className={`tile ${hint} ${active ? 'active' : ''}`}>{letter}</div>
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
						hints={
							i < activeIndex.row
								? getHints(guessRow, answer.split('')).hints
								: []
						}
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
