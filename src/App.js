import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/about" element={<AboutPage />} />
					<Route path="/" element={<ToolsPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
