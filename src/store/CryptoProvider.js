/** @format */
import { useState } from "react";
import cryptoContext from "./cryptoContext";

const CryptoProvider = (props) => {
	const [cryptoInfo, setCryptoInfo] = useState({});
	const [cryptoGraph, setCryptoGraph] = useState({});

	const getCryptoInfo = (id) => {
		id = id.toLowerCase();

		const dataForGraph = sendRequest(
			`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max&interval=daily`
		);

		const dataForCryptoInfo = sendRequest(
			`https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false`
		);

		dataForGraph.then((data) => setCryptoGraph(data));
		dataForCryptoInfo.then((data) => setCryptoInfo(data));
	};

	const sendRequest = async (url) => {
		try {
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = response.json();

			console.log("data", data);

			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const providerValue = {
		cryptoInfo: cryptoInfo,
		cryptoGraph: cryptoGraph,
		getCryptoInfo: getCryptoInfo,
	};

	return (
		<cryptoContext.Provider value={providerValue}>
			{props.children}
		</cryptoContext.Provider>
	);
};

export default CryptoProvider;
