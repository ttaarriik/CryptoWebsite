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

	console.log("y", y);

	return (
		<React.Fragment>
			{!isEmpty(ctx.cryptoInfo) && (
				<Card className={classes.cryptoInfo}>
					<h2>Market Cap: {ctx.cryptoInfo.market_data.market_cap.usd}</h2>
					<h2>
						Change price for the last 30 days:{" "}
						{ctx.cryptoInfo.market_data.price_change_percentage_30d}%
					</h2>
					<h2>Rank: {ctx.cryptoInfo.market_cap_rank}</h2>
					<Plot
						data={[
							{
								x: [...x],
								y: [...y],
								type: "scatter",
								mode: "lines",
								marker: { color: "green" },
							},
						]}
						layout={{
							title: ctx.cryptoInfo.name,
							xaxis: {
								autorange: true,
								range: ["2022-05-01", "2022-05-20"],
								rangeselector: {
									buttons: [
										{
											count: 7,
											label: "week",
											step: "day",
											stepmode: "backward",
										},
										{
											count: 1,
											label: "month",
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
								range: [86.8700008333, 138.870004167],
								type: "linear",
							},
						}}
					/>
				</Card>
			)}
		</React.Fragment>
	);
};

export default CryptoInfo;
