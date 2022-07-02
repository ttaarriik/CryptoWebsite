/** @format */
import React, { useEffect, useState, useContext } from "react";
import "./Cryptos.css";
import Card from "../UI/Card";
import Crypto from "../helperComponents/Crypto";
import ReactPaginate from "react-paginate";
import cryptoContext from "../../store/cryptoContext";
import { motion } from "framer-motion";

const Cryptos = () => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [data, setData] = useState([]);
	const [dataForSearch, setDataForSearch] = useState([]);
	const ctx = useContext(cryptoContext);

	const itemsPerPage = 6;

	//Pagination Configuration
	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
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

				let updatedData = checkForWatchList(response);

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

		searchedList = dataForSearch.filter((crypto) => {
			return crypto.id.includes(event.target.value);
		});

		setData(searchedList);
	};

	const animationVariant = {
		hidden: {
			translateX: "100vw",
		},
		visible: {
			translateX: 0,
			transition: {
				duration: 0.1,
				type: "spring",
				stiffness: 50,
			},
		},
		exit: { opacity: 0 },
	};

	return (
		<React.Fragment>
			<motion.input
				variants={animationVariant}
				animate="visible"
				initial="hidden"
				exit="exit"
				transition="transition"
				onChange={searchCryptoHandler}
				className="search"
				type="text"
				placeholder="Search"
			/>

			<motion.div
				variants={animationVariant}
				animate="visible"
				initial="hidden"
				transition="transition"
				exit="exit"
			>
				<Card className="cryptoList">
					<ul>
						{currentItems.map((crypto) => (
							<Crypto page={"Cryptos"} key={crypto.id} crypto={crypto} />
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
			</motion.div>
		</React.Fragment>
	);
};

export default Cryptos;
