import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './css/main.scss'
import Dashboard from './components/Dashboard'
import ThemeContextWrapper from './components/context/ThemeContextWrapper'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
	<ThemeContextWrapper>
		<React.StrictMode>
			<Dashboard />
		</React.StrictMode>
	</ThemeContextWrapper>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
