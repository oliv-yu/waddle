import { getHints } from './utils'

function TileRow({
	active,
	hints,
	activeTileIndex,
	rowIndex,
	letters,
	onSelectTile,
}) {
	return (
		<div className={`tile-row ${active ? 'active' : ''}`}>
			{letters.map((letter, i) =>
				active ? (
					<Tile
						key={`${rowIndex}-${i}`}
						letter={letter}
						active={activeTileIndex === i}
						hint={hints[i]}
						onSelect={() => onSelectTile(i)}
					/>
				) : (
					<Tile key={`${rowIndex}-${i}`} letter={letter} hint={hints[i]} />
				)
			)}
		</div>
	)
}

function Tile({ active = false, letter, onSelect = () => {}, hint = '' }) {
	return (
		<div
			onClick={onSelect}
			className={`tile ${hint} ${active ? 'active' : ''}`}
		>
			{letter}
		</div>
	)
}

function Guesses({ activeIndex, answer, onSelectTile, guesses }) {
	return (
		<div className="guesses">
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
						onSelectTile={(col) => onSelectTile(i, col)}
					/>
				))}
			</div>
		</div>
	)
}
export default Guesses
