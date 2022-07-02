/** @format */

import Card from "../UI/Card";
import React, { useContext, useState, useEffect } from "react";
import cryptoContext from "../../store/cryptoContext";
import { motion } from "framer-motion";
import Crypto from "../helperComponents/Crypto";
import ReactPaginate from "react-paginate";
import classes from "./WatchList.module.css";

const WatchList = () => {
	const ctx = useContext(cryptoContext);
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 6;

	//Pagination Configuration
	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(ctx.watchList.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(ctx.watchList.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, ctx.watchList]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % ctx.watchList.length;
		setItemOffset(newOffset);
	};

	return (
		<React.Fragment>
			<motion.h2
				animate={{ translateX: 0 }}
				initial={{ translateX: "100vw" }}
				transition={{ duration: 0.1, type: "spring", stiffness: 50 }}
				exit={{
					opacity: 0,
				}}
				className={classes.h2}
			>
				Your Watchlist
			</motion.h2>
			<motion.div
				animate={{ translateX: 0 }}
				initial={{ translateX: "100vw" }}
				transition={{ duration: 0.1, type: "spring", stiffness: 50 }}
				exit={{
					opacity: 0,
				}}
			>
				<Card className="cryptoList">
					{ctx.watchList.length === 0 ? (
						<h2 className={classes.emptyMessage}>
							You do not have any cryprocurrencies added to your watchlist.
						</h2>
					) : (
						<ul>
							{currentItems.map((crypto) => (
								<Crypto page={"WatchList"} key={crypto.id} crypto={crypto} />
							))}
							<ReactPaginate
								breakLabel="..."
								nextLabel="Next >"
								onPageChange={handlePageClick}
								marginPagesDisplayed={1}
								pageRangeDisplayed={3}
								pageCount={pageCount}
								previousLabel="< Previous"
								renderOnZeroPageCount={null}
							/>
						</ul>
					)}
				</Card>
			</motion.div>
		</React.Fragment>
	);
};

export default WatchList;
