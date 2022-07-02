/** @format */

import classes from "./Crypto.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import cryptoContext from "../../store/cryptoContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";

const Crypto = ({ crypto, page }) => {
	let isGold = crypto.market_cap_rank === 1 ? true : false;
	let isSilver = crypto.market_cap_rank === 2 ? true : false;
	let isBronze = crypto.market_cap_rank === 3 ? true : false;
	const ctx = useContext(cryptoContext);

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
		<motion.li whileHover={{ scale: 1.1 }} className={classes.li}>
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
			{page === "Cryptos" ? (
				<div onClick={watchListHandler}>
					{crypto.isAddedToWatchList ? <AiFillStar /> : <AiOutlineStar />}
				</div>
			) : (
				<div onClick={watchListHandler}>
					{<button className={classes.delete}>Delete</button>}
				</div>
			)}

			<Link to={`/${crypto.id}`}>
				<button className={classes.button}>View Graph</button>
			</Link>
		</motion.li>
	);
};

export default Crypto;
