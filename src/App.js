import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";

import { Provider } from "./CodeContext.js";
import { DownloadPage } from "./pages/DownloadPage.js";
import { Contact } from "./pages/Contact.js";

import "./App.scss";

const App = () => {
    ReactGA.initialize("G-53MJ95EYEG");

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Provider />} />
				<Route path="/download" element={<DownloadPage />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
