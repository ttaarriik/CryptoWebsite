/** @format */

import Card from "../UI/Card";
import { useContext } from "react";
import cryptoContext from "../store/cryptoContext";
import { Link } from "react-router-dom";

const WatchList = () => {
	const ctx = useContext(cryptoContext);
	console.log("watch", ctx.watchList);
	return (
		<Card>
			<Link to="/Cryptos">
				<button>Crypto list</button>
			</Link>
			<ul>
				{ctx.watchList.map((crypto) => (
					<li>{crypto.id}</li>
				))}
			</ul>
		</Card>
	);
};

export default WatchList;
