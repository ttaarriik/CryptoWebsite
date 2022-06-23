/** @format */

import classes from "./Crypto.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import cryptoContext from "../store/cryptoContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Crypto = ({ crypto }) => {
	let isGold = crypto.market_cap_rank === 1 ? true : false;
	let isSilver = crypto.market_cap_rank === 2 ? true : false;
	let isBronze = crypto.market_cap_rank === 3 ? true : false;
	const ctx = useContext(cryptoContext);

	console.log("Watch 2", ctx.watchList);

	const watchListHandler = () => {
		if (crypto.isAddedToWatchList) {
			crypto.isAddedToWatchList = false;
			ctx.removeFromWatchList(crypto.id);
		} else {
			crypto.isAddedToWatchList = true;
			ctx.addToWatchList(crypto);
		}
	};

	return (
		<li className={classes.li}>
			<div className={classes.leftDescription}>
				<div
					className={`${classes.rank} ${isGold ? classes.gold : ""} ${
						isBronze ? classes.bronze : ""
					} ${isSilver ? classes.silver : ""}`}
				>
					{crypto.market_cap_rank}
				</div>
				<img className={classes.img} src={crypto.image} alt="crypto item" />
				<div>
					<div className={classes.name}>{crypto.name}</div>
					<div className={classes.symbol}>{crypto.symbol}</div>
				</div>
			</div>
			<div className={classes.rightDescription}>
				<div>
					$
					{crypto.current_price.toLocaleString("en", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 4,
					})}
				</div>
				<div
					className={`${
						crypto.price_change_percentage_24h < 0 ? classes.red : classes.green
					}`}
				>
					{crypto.price_change_percentage_24h}%
				</div>
			</div>
			<div onClick={watchListHandler}>
				{crypto.isAddedToWatchList ? <AiFillStar /> : <AiOutlineStar />}
			</div>
			<Link to={`/Cryptos/${crypto.id}`}>
				<button className={classes.button}>View Graph</button>
			</Link>
		</li>
	);
};

export default Crypto;
