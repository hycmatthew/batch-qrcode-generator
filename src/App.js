import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";

import { Provider } from "./CodeContext.js";
import { DownloadPage } from "./pages/DownloadPage.js";
import { Contact } from "./pages/Contact.js";

const App = () => {
    ReactGA.initialize("G-53MJ95EYEG");

	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	});

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
