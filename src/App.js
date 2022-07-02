/** @format */

import LandingPage from "./components/pages/LandingPage";
import Cryptos from "./components/pages/Cryptos";
import CryptoInfo from "./components/pages/CryptoInfo";
import WatchList from "./components/pages/WatchList";
import Contact from "./components/pages/Contact";
import NavBar from "./components/helperComponents/NavBar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";
import { AnimatePresence } from "framer-motion";

const App = () => {
	const location = useLocation();
	return (
		<main className={classes.main}>
			<div className={classes.img}>
				<NavBar />
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.key}>
						<Route path="/" element={<Navigate to="/index" />} />
						<Route path="/index" element={<LandingPage />} />
						<Route path="/Cryptos/" element={<Cryptos />} />
						<Route path="/:crypto" element={<CryptoInfo />} />
						<Route path="/WatchList" element={<WatchList />} />
						<Route path="/Contact" element={<Contact />} />
					</Routes>
				</AnimatePresence>
			</div>
		</main>
	);
};

export default App;
