import { ThemeContext, themes } from './ThemeContext'
import { useState } from 'react'

function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(true)

	return (
		<ThemeContext.Consumer>
			{({ changeTheme }) => (
				<div className="theme-toggle">
					<label className="switch">
						<input
							type="checkbox"
							checked={darkMode}
							onChange={() => {
								setDarkMode(!darkMode)
								changeTheme(darkMode ? themes.light : themes.dark)
							}}
						/>
						<span className="slider round"></span>
					</label>
				</div>
			)}
		</ThemeContext.Consumer>
	)
}

export default ThemeToggle
