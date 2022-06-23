/** @format */

import React from "react";

const cryptoContext = React.createContext({
	cryptoInfo: {},
	cryptoGraphInfo: {},
	getCryptoInfo: (id) => {},
	addToWatchList: (crypto) => {},
	removeFromWatchList: (id) => {},
	watchList: [],
});

export default cryptoContext;
