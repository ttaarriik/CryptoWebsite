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
			<div className={classes.img}>
				<Routes>
					<Route path="/" element={<Navigate to="/LandingPage" />} />
					<Route path="/LandingPage" element={<LandingPage />} />
					<Route path="/Cryptos/" element={<Cryptos />} />
					<Route path="/Cryptos/:crypto" element={<CryptoInfo />} />
				</Routes>
			</div>
		</main>
	);
};

export default App;
