import React from "react";
import { Row, Spin, Icon } from "antd";
import formatter from "../../lib/priceFormatter";
import "./styles.less";

interface Props {
	loading: boolean;
	type: string;
	price: any;
	bgColor?: string;
	onClick?: Function;
	styles?: any;
}

const titles = {
	economy: "ECONOMICA",
	executive: "EJECUTIVA"
};

const antIcon = <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />;

const Cabin: React.FC<Props> = ({ loading, type, price, bgColor, onClick, styles }) => {
	const title = titles[`${type}`] || titles["economy"];
	return (
		<Row
			className="cbn hvr-shrink"
			style={
				bgColor
					? { backgroundColor: `${bgColor}`, ...styles }
					: { ...styles }
			}
			onClick={() => onClick()}
		>
			{!loading ? (
				<>
				<p className="cbn-text">{title}</p>
				<p className="lh1">DESDE</p>
				<p className="lh1">
					{formatter.format(parseInt(price))}
					<span className="currency"> COP</span>{" "}
				</p>
				</>
			) : (
				<div className="cabin-spin-wrap" >
					<Spin className="cabin-spin" indicator={antIcon} />
				</div>
			)}
		</Row>
	);
};

export default Cabin;
