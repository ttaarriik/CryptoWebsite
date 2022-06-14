/** @format */
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./Cryptos.module.css";
import Crypto from "./Crypto";

const Cryptos = () => {
	const [cryptoList, setCryptoList] = useState([]);
	let [page, setPage] = useState(1);

	const sendRequest = async () => {
		fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=${page}&sparkline=false				`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				setCryptoList(response);
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		sendRequest();
	}, [page, setPage]);

	const goToNextPage = () => {
		setPage((page) => page + 1);
	};

	const goToPreviousPage = () => {
		if (page <= 1) {
			return;
		}
		setPage((page) => page - 1);
	};

	return (
		<React.Fragment>
			<Card className={classes.cryptoList}>
				<ul>
					{cryptoList.map((crypto) => (
						<Crypto
							key={crypto.id}
							crypto={crypto}
							// image={crypto.image}
							// market_cap_rank={crypto.market_cap_rank}
							// name={crypto.name}
							// symbol={crypto.symbol}
							// current_price={crypto.current_price}
							// price_change_percentage_24h={crypto.price_change_percentage_24h}
						/>
					))}
					<div className={classes.buttons}>
						<button onClick={goToPreviousPage} className={classes.prev}>
							Prev
						</button>
						<button onClick={goToNextPage} className={classes.next}>
							Next
						</button>
					</div>
				</ul>
			</Card>
		</React.Fragment>
	);
};

export default Cryptos;
