const TabSearch = (props) => {
	return (
		<div className="tabSearch">
			<div className="center">
				<img src={props.image} style={{ height: 28 }} />
				<span
					style={{
						color: "white",
						fontWeight: "bold",
						marginLeft: 12,
						fontSize: 17,
						display: props.active == props.keyPanel ? null : "none"
					}}
				>
					{props.text}
				</span>
			</div>
		</div>
	);
};

export default TabSearch;
