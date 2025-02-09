import { AppBar } from "./components/AppBar"
import "./App.css"
import { App as AntdApp } from "antd"
import { MainContents } from "./components/MainContents"
import { StrictMode } from "react"
import { ConfigProvider, theme } from "antd"
import useDarkMode from "./hooks/useDarkMode"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./main"

/**
 * Главный компонент приложения.
 */
function App() {
	const isDarkMode = useDarkMode()

	const { darkAlgorithm, defaultAlgorithm } = theme

	return (
		<ApolloProvider client={apolloClient}>
			<ConfigProvider theme={{
				algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
			}}>
				<AntdApp>
					<StrictMode>
						<AppBar />

						<MainContents />
					</StrictMode>
				</AntdApp>
			</ConfigProvider>
		</ApolloProvider>
	)
}

export default App
