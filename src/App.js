import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate  } from "react-router-dom";

import { Provider } from "./CodeContext.js";
import { DownloadPage } from "./pages/DownloadPage.js";
import { Contact } from "./pages/Contact.js";

const App = () => {
	let lang = 'en';
	if ("currentLang" in localStorage) {
		lang = localStorage.getItem('currentLang')
	} else {
		const userLang = navigator.language || navigator.userLanguage;
		switch(userLang.toLowerCase()){
			case 'zh-hk':
			case 'zh-tw':
				lang = 'tc';
				break;
			case 'zh-cn':
				lang = 'sc';
				break;
			default:
				lang = 'en';
				break;
		}
		localStorage.setItem('currentLang', lang)
	}

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