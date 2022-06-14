/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CryptoProvider from "./store/CryptoProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CryptoProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</CryptoProvider>
);
