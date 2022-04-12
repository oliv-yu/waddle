import React, { useState, useEffect } from 'react'
import { ThemeContext, themes } from './ThemeContext'

export default function ThemeContextWrapper(props) {
	const [theme, setTheme] = useState(themes.dark)

	function changeTheme(theme) {
		setTheme(theme)
	}

	useEffect(() => {
		if (theme === themes.light) {
			document.body.classList.add('light')
		} else {
			document.body.classList.remove('light')
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
			{props.children}
		</ThemeContext.Provider>
	)
}
