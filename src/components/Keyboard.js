import backspaceIcon from '../icons/backspace.svg'

export const KEYBOARD_ROWS = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
]

function KeyboardButton({ letter, onClick, used, hints }) {
	const _getFlexNumber = (letter) => {
		if (letter === 'backspace' || letter === 'enter') {
			return 1.5
		}

		return 1
	}

	const _getAccurateHint = () => {
		if (hints.correct.includes(letter)) {
			return 'correct'
		}

		if (hints.present.includes(letter)) {
			return 'present'
		}

		if (used.includes(letter)) {
			return 'used'
		}

		return ''
	}

	return (
		<button
			className={`keyboard-button ${_getAccurateHint()}`}
			style={{ flex: _getFlexNumber(letter) }}
			onClick={() => onClick(letter)}
		>
			{letter === 'backspace' ? (
				<img src={backspaceIcon} alt="backspace-icon" />
			) : (
				letter
			)}
		</button>
	)
}

function KeyboardRow({ keysInRow, addMargin, onClick, used, hints }) {
	return (
		<div className={`keyboard-row ${addMargin ? 'extra-margin' : ''}`}>
			{keysInRow.map((letter, index) => (
				<KeyboardButton
					key={index}
					letter={letter}
					onClick={onClick}
					used={used}
					hints={hints}
				/>
			))}
		</div>
	)
}

function Keyboard({ used, onClick, hints }) {
	return (
		<div className="keyboard-section">
			{KEYBOARD_ROWS.map((row, index) => (
				<KeyboardRow
					key={index}
					addMargin={index === 1}
					keysInRow={row}
					onClick={onClick}
					used={used}
					hints={hints}
				/>
			))}
		</div>
	)
}

export default Keyboard
