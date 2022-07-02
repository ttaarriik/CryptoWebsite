/** @format */

import { NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import cryptoContext from "../../store/cryptoContext";

let effect = "";

const NavBar = () => {
	const ctx = useContext(cryptoContext);
	const [isAdded, setIsAdded] = useState(false);

	useEffect(() => {
		if (ctx.watchList.length === 0) {
			return;
		}
		effect = "addedEffect";
		setIsAdded(true);
		const timer = setTimeout(() => {
			effect = "";
			setIsAdded(false);
		}, [300]);
		return () => {
			clearTimeout(timer);
		};
	}, [ctx.watchList.length]);

	return (
		<React.Fragment>
			<div className={"navBar"}>
				<NavLink
					className={(navData) => (navData.isActive ? "active" : "")}
					to="/LandingPage"
				>
					Landing Page
				</NavLink>
				<NavLink
					className={(navData) => (navData.isActive ? "active" : "")}
					to="/Cryptos"
				>
					Crypto List
				</NavLink>
				<NavLink
					className={(navData) =>
						`${effect} ${navData.isActive ? "active" : ""}`
					}
					to="/WatchList"
				>
					Watch List: {ctx.watchList.length}
				</NavLink>
				<NavLink
					className={(navData) => (navData.isActive ? "active" : "")}
					to="/Contact"
				>
					Contact
				</NavLink>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
