/** @format */
import React from "react";
import classes from "./LandingPage.module.css";

import { motion } from "framer-motion";
import TypingEffect from "../UI/TypingEffect";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<React.Fragment>
			<motion.main className={classes.main}>
				<motion.div
					className={classes.h1}
					animate={{ x: 0 }}
					initial={{ x: "100vw" }}
					transition={{
						duration: 0.1,
						type: "spring",
						stiffness: 50,
					}}
				>
					{" "}
					<TypingEffect />
				</motion.div>

				<Link to="/Cryptos">
					<motion.button
						animate={{ x: 0 }}
						initial={{ x: "100vw" }}
						transition={{
							duration: 0.1,
							type: "spring",
							stiffness: 50,
						}}
						whileHover={{ scale: 1.2 }}
						className={classes.viewCryptoBtn}
					>
						View Crypto List
					</motion.button>{" "}
				</Link>
			</motion.main>
		</React.Fragment>
	);
};

export default LandingPage;
