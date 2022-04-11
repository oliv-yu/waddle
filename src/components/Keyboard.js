import backspaceIcon from '../icons/backspace.svg'

export const KEYBOARD_ROWS = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
]

function KeyboardButton({ letter, onClick, used }) {
	const _getFlexNumber = (letter) => {
		if (letter === 'Backspace' || letter === 'Enter') {
			return 1.5
		}

		return 1
	}

	return (
		<button
			className={`keyboard-button ${used ? 'used' : ''}`}
			style={{ flex: _getFlexNumber(letter) }}
			onClick={() => onClick(letter)}
		>
			{letter === 'Backspace' ? (
				<img src={backspaceIcon} alt="backspace-icon" />
			) : (
				letter
			)}
		</button>
	)
}

function KeyboardRow({ keysInRow, addMargin, onClick, usedLetters }) {
	return (
		<div className={`keyboard-row ${addMargin ? 'extra-margin' : ''}`}>
			{keysInRow.map((letter, index) => (
				<KeyboardButton
					key={index}
					letter={letter}
					onClick={onClick}
					used={usedLetters.includes(letter)}
				/>
			))}
		</div>
	)
}

function Keyboard({ onClick, usedLetters }) {
	return (
		<div className="keyboard-section">
			{KEYBOARD_ROWS.map((row, index) => (
				<KeyboardRow
					key={index}
					addMargin={index === 1}
					keysInRow={row}
					onClick={onClick}
					usedLetters={usedLetters}
				/>
			))}
		</div>
	)
}

export default Keyboard
