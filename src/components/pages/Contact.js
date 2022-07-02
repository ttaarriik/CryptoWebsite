/** @format */

import React from "react";
import classes from "./Contact.module.css";
import Card from "../UI/Card";
import { motion } from "framer-motion";

const Contact = () => {
	const contactVariant = {
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
			<motion.main
				variants={contactVariant}
				animate="visible"
				initial="hidden"
				exit="exit"
				className={classes.main}
			>
				<Card className={classes.contactInfo}>
					<h2>Contact Us</h2>
					<form
						name="contact"
						method="POST"
						netlify-honeypot="bot-field"
						data-netlify="true"
						className={classes.form}
					>
						<label htmlFor="name">First Name</label>
						<input type="text" id="name" name="name"></input>
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" name="lastName"></input>
						<label htmlFor="phone">Phone</label>
						<input type="text" phone="phone"></input>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" name="email"></input>
						<label htmlFor="textarea">Message</label>
						<textarea id="textarea" name="message"></textarea>
						<button className={classes.submitBtn} type="submit">
							Submit
						</button>
					</form>
				</Card>
				<Card className={classes.about}>
					<h3>What is CryptoCurrency?</h3>
					<p>
						Cryptocurrency is a form of payment that can be exchanged online for
						goods and services. Many companies have issued their own currencies,
						often called tokens, and these can be traded specifically for the
						good or service that the company provides. Think of them as you
						would arcade tokens or casino chips. You’ll need to exchange real
						currency for the cryptocurrency to access the good or service.
						Cryptocurrencies work using a technology called blockchain.
						Blockchain is a decentralized technology spread across many
						computers that manages and records transactions. Part of the appeal
						of this technology is its security.{" "}
						<a
							target="_blank"
							className={classes.a}
							href="https://www.nerdwallet.com/article/investing/cryptocurrency"
						>
							(Source: NerdWallet){" "}
						</a>
					</p>
					<h3>Technology used</h3>
					<div className={classes.images}>
						<div>
							<h4>React</h4>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
								alt="React icon"
							></img>
						</div>
						<img
							src="https://www.freepnglogos.com/uploads/javascript-png/javascript-shield-logo-icon-2.png"
							alt="JS Icon"
						></img>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
							alt="CSS Icon"
						></img>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
							alt="HTML Icon"
						></img>
						<div>
							<h4>CoinGecko</h4>
							<img
								src="https://static.coingecko.com/s/api_landing_page_2x-c8a9b94a199c90fd02f99ccb3484b7911dbf18d1f083339577441d0c411d02d2.png"
								alt="ContGecko Icon"
							></img>
						</div>
						<img
							src="https://plotly-marketing-website.cdn.prismic.io/plotly-marketing-website/948b6663-9429-4bd6-a4cc-cb33231d4532_logo-plotly.svg"
							alt="PlotLy Icon"
						></img>
					</div>
				</Card>
			</motion.main>
		</React.Fragment>
	);
};

export default Contact;
