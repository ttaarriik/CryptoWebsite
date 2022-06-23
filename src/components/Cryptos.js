/** @format */
import React, { useEffect, useState, useContext } from "react";
import "./Cryptos.css";
import Card from "../UI/Card";
import Crypto from "./Crypto";
import ReactPaginate from "react-paginate";
import cryptoContext from "../store/cryptoContext";
import { Link } from "react-router-dom";

const Cryptos = () => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [data, setData] = useState([]);
	const [dataForSearch, setDataForSearch] = useState([]);
	const ctx = useContext(cryptoContext);

	const itemsPerPage = 6;

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	const sendRequest = async () => {
		fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				response = response.map((crypto) => {
					return { ...crypto, isAddedToWatchList: false };
				});
				console.log("response", response);
				let updatedData = checkForWatchList(response);
				console.log("updatedData", updatedData);
				setData(updatedData);
				setDataForSearch(updatedData);
			})
			.catch((err) => console.log(err));
	};

	const checkForWatchList = (data) => {
		for (let i = 0; i < ctx.watchList.length; i++) {
			data = data.map((item) => {
				if (item.id === ctx.watchList[i].id) {
					return { ...item, isAddedToWatchList: true };
				} else {
					return { ...item };
				}
			});
		}

		return data;
	};

	useEffect(() => {
		sendRequest();
	}, []);

	const searchCryptoHandler = (event) => {
		let searchedList = [];
		console.log("dataForSearch", dataForSearch);
		searchedList = dataForSearch.filter((crypto) => {
			return crypto.id.includes(event.target.value);
		});
		console.log("searched", searchedList);
		setData(searchedList);
	};

	console.log("data", data);

	return (
		<React.Fragment>
			<Link to="/WatchList">
				<button>WatchList</button>
			</Link>
			<input
				onChange={searchCryptoHandler}
				className="search"
				type="text"
				placeholder="Search"
			/>
			<Card className="cryptoList">
				<ul>
					{currentItems.map((crypto) => (
						<Crypto key={crypto.id} crypto={crypto} />
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
			</Card>
		</React.Fragment>
	);
};

export default Cryptos;
