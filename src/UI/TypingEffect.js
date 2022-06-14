/** @format */

import React from "react";
import ReactTypingEffect from "react-typing-effect";

const ReactTypingEffectDemo = () => {
	return (
		<>
			<ReactTypingEffect
				text={[
					"Welcome To My Crypto Project!",
					"Created by: Abdul Tareq Khaliq",
				]}
				eraseDelay={1000}
				typingDelay={1000}
				eraseSpeed={30}
				speed={100}
				cursorRenderer={(cursor) => <h1>{cursor}</h1>}
				displayTextRenderer={(text, i) => {
					return (
						<h1>
							{text.split("").map((char, i) => {
								const key = `${i}`;
								return (
									<span
										key={key}
										style={
											i % 2 === 0 ? { color: "white" } : { color: "white" }
										}
									>
										{char}
									</span>
								);
							})}
						</h1>
					);
				}}
			/>
		</>
	);
};

export default ReactTypingEffectDemo;
