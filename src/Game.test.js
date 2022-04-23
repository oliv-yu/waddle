import { render, screen } from '@testing-library/react'
import Game from './components/Game'

test('renders learn react link', () => {
	render(<Game />)
	const linkElement = screen.getByText(/Waddle/i)
	expect(linkElement).toBeInTheDocument()
})
