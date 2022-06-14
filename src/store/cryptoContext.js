/** @format */

import React from "react";

const cryptoContext = React.createContext({
	cryptoInfo: {},
	cryptoGraphInfo: {},
	getCryptoInfo: (id) => {},
});

export default cryptoContext;
