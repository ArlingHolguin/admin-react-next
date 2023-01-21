import React, { Component } from "react";
import Head from "next/head";

export default class Layout extends Component {
	render() {
		const { children } = this.props;

		return (
			<div>
				<Head>
					{process.env.NODE_ENV !== "production" && (
						<link
							rel="stylesheet"
							type="text/css"
							href={
								"/_next/static/css/styles.chunk.css?v=" +
								Date.now()
							}
						/>
					)}
				</Head>
				<div>{children}</div>
			</div>
		);
	}
}
