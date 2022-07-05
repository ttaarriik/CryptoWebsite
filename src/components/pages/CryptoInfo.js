/** @format */

import { motion } from "framer-motion";
import classes from "./CryptoInfo.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cryptoContext from "../../store/cryptoContext";
import React from "react";
import Plot from "react-plotly.js";

const CryptoInfo = () => {
	const [graphWidth, setGraphWidth] = useState(0);
	const ctx = useContext(cryptoContext);

	const param = useParams();

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	const getGraphWidth = () => {
		let windowWidth = window.innerWidth;
		console.log("w", windowWidth);

		if (windowWidth < 500) {
			setGraphWidth(300);
		} else if (windowWidth < 900) {
			setGraphWidth(740);
		} else {
			setGraphWidth(1390);
		}
	};

	useEffect(() => {
		ctx.getCryptoInfo(param.crypto);
	}, []);

	useEffect(() => {
		getGraphWidth();
		window.addEventListener("resize", getGraphWidth);
	}, []);

	let x = isEmpty(ctx.cryptoGraph)
		? []
		: ctx.cryptoGraph.prices.map((item) => new Date(item[0]));
	let y = isEmpty(ctx.cryptoGraph)
		? []
		: ctx.cryptoGraph.prices.map((item) => item[1]);

	const cryptoInfoVariant = {
		visible: {
			translateX: 0,
			transition: {
				duration: 0.4,
				type: "spring",
				stiffness: 50,
			},
		},
		hidden: {
			translateX: "100vw",
		},
		exit: { opacity: 0 },
	};

	return (
		<React.Fragment>
			{!isEmpty(ctx.cryptoInfo) && (
				<motion.div
					variants={cryptoInfoVariant}
					animate="visible"
					initial="hidden"
					exit="exit"
					className={classes.cryptoInfo}
				>
					<div className={classes.graph}>
						<Plot
							data={[
								{
									x: [...x],
									y: [...y],
									type: "scatter",
									mode: "lines",

									marker: { color: "black" },
								},
							]}
							layout={{
								autosize: true,
								transition: "linear",
								width: graphWidth,
								height: 300,
								margin: { b: 25, i: 25, r: 50, t: 50 },
								title: {
									text: `${ctx.cryptoInfo.name} price`,
									pad: { b: 0, i: 0, r: 0, t: 0 },
								},
								xaxis: {
									autorange: true,
									range: ["2022-05-01", "2022-05-20"],
									style: { background: "red" },
									rangeselector: {
										buttons: [
											{
												count: 7,
												label: "7d",
												step: "day",
												stepmode: "backward",
											},
											{
												count: 1,
												label: "1m",
												step: "month",
												stepmode: "backward",
											},
											{
												count: 6,
												label: "6 month",
												step: "month",
												stepmode: "backward",
											},
											{ step: "all" },
										],
									},
									rangeslider: { range: ["2022-05-01", "2022-05-20"] },
									type: "date",
								},
								yaxis: {
									autorange: true,

									type: "linear",
								},
							}}
						/>
					</div>
				</motion.div>
			)}
			{!isEmpty(ctx.cryptoInfo) && (
				<motion.div
					variants={cryptoInfoVariant}
					animate="visible"
					initial="hidden"
					exit="exit"
					className={classes.cryptoDetails}
				>
					<div className={classes.cryptoSpec}>
						<img src={ctx.cryptoInfo.image.small} />
						<div>{ctx.cryptoInfo.name}</div>
						<div>Rank: {ctx.cryptoInfo.coingecko_rank}</div>
						<div>
							Current price: $
							{ctx.cryptoInfo.market_data.current_price.usd.toLocaleString(
								"en",
								{
									minimumFractionDigits: 2,
									maximumFractionDigits: 4,
								}
							)}
						</div>

						<div>
							All time high:{" $"}
							{ctx.cryptoInfo.market_data.ath.usd.toLocaleString("en", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 4,
							})}
						</div>
						<div>
							Total volume:{" $"}
							{ctx.cryptoInfo.market_data.total_volume.usd.toLocaleString(
								"en",
								{
									minimumFractionDigits: 2,
									maximumFractionDigits: 4,
								}
							)}
						</div>
						<div>Date of creation: {ctx.cryptoInfo.genesis_date}</div>
						<div>
							Homepage:{" "}
							<a href={ctx.cryptoInfo.links.homepage}>
								{ctx.cryptoInfo.links.homepage}
							</a>
						</div>
						<div>
							Max supply:{" "}
							{ctx.cryptoInfo.market_data.total_supply === null
								? "NA"
								: ctx.cryptoInfo.market_data.total_supply.toLocaleString("en", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 4,
								  })}
						</div>
					</div>
					<div className={classes.cryptoDescription}>
						{ctx.cryptoInfo.description.en}
					</div>
				</motion.div>
			)}
		</React.Fragment>
	);
};

export default CryptoInfo;
