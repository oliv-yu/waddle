import { render, screen} from '@testing-library/react'
import Dashboard from './components/Dashboard'

test('renders learn react link', () => {
	render(<Dashboard />)
	const linkElement = screen.getByText(/Waddle/i)
	expect(linkElement).toBeInTheDocument()
})
