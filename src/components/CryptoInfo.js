/** @format */

import Card from "../UI/Card";
import classes from "./CryptoInfo.module.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import cryptoContext from "../store/cryptoContext";
import React from "react";
import Plot from "react-plotly.js";

const CryptoInfo = () => {
	const ctx = useContext(cryptoContext);

	const param = useParams();

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	console.log("graph", ctx.cryptoGraph);
	useEffect(() => {
		ctx.getCryptoInfo(param.crypto);
	}, []);

	let x = isEmpty(ctx.cryptoGraph)
		? []
		: ctx.cryptoGraph.prices.map((item) => new Date(item[0]));
	let y = isEmpty(ctx.cryptoGraph)
		? []
		: ctx.cryptoGraph.prices.map((item) => item[1]);

	console.log("Crypto info:", ctx.cryptoInfo);

	return (
		<React.Fragment>
			{!isEmpty(ctx.cryptoInfo) && (
				<div className={classes.cryptoInfo}>
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
							width: 1390,
							height: 400,
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
			)}
			{!isEmpty(ctx.cryptoInfo) && (
				<div className={classes.cryptoDetails}>
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
				</div>
			)}
		</React.Fragment>
	);
};

export default CryptoInfo;
