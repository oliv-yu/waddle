export const updateAtIndex = (matrix, index, letter) => {
	let newMatrix = matrix.map((row) => row.map((col) => col))

	newMatrix[index.row][index.col] = letter

	return newMatrix
}

export const getHints = (guess, answer) => {
	let hints = Array(guess.length).fill('')

	let correct = []
	let present = []

	guess.forEach((letter, i) => {
		if (answer[i] === letter) {
			hints[i] = 'correct'
			answer[i] = '-'
			correct.push(letter)
		}
	})

	guess.forEach((letter, i) => {
		if (answer.includes(letter) && !hints[i]) {
			hints[i] = 'present'
			answer[answer.indexOf(letter)] = '-'
			present.push(letter)
		}
	})

	return { hints, correct, present }
}

export const getKeyboardHints = (guesses, answer) => {
	let correct = []
	let present = []
	let used = []

	guesses.forEach((guess) => {
		const { correct: rowCorrect, present: rowPresent } = getHints(
			guess,
			answer.split('')
		)

		correct = correct.concat(rowCorrect)
		present = present.concat(rowPresent)
		used = used.concat(guess)
	})

	return {
		correct,
		present,
		used,
	}
}
