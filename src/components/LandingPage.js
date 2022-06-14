/** @format */
import React from "react";
import classes from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import TypingEffect from "../UI/TypingEffect";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<React.Fragment>
			<main className={classes.main}>
				<TypingEffect />
				<Link to="/Cryptos">
					<Button variant="secondary">View Crypto List</Button>{" "}
				</Link>
			</main>
		</React.Fragment>
	);
};

export default LandingPage;
