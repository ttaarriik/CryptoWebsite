/** @format */

import LandingPage from "./components/LandingPage";
import Cryptos from "./components/Cryptos";
import CryptoInfo from "./components/CryptoInfo";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";

const App = () => {
	return (
		<main className={classes.main}>
			<img
				className={classes.img}
				src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1797&q=80"
				alt="Crypto Sign"
			/>
			<Routes>
				<Route path="/" element={<Navigate to="/LandingPage" />} />
				<Route path="/LandingPage" element={<LandingPage />} />
				<Route path="/Cryptos/" element={<Cryptos />} />
				<Route path="/Cryptos/:crypto" element={<CryptoInfo />} />
			</Routes>
		</main>
	);
};

export default App;
