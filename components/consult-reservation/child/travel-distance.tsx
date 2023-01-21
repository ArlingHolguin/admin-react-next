import { Col, Row } from "antd";
import "../../../assets/components/consult-reservation/reserve.less";

const TravelDistance = ({ segment }) => {
	return (
		<Col className="p10" id="flight-info">
			<Row className="sm-hide" type="flex" justify="space-between">
				<h4 className="bold">{segment.depCode}</h4>
				<div className="line" id="line-ball-ida" />
				<h4 className="bold">{segment.arrCode}</h4>
			</Row>
			<Row type="flex" justify="space-between" align="top">
				<div>
					{/*change*/}
					<h4 className="no-margin bold">
						{segment.depTime.substring(0, 2)}:
						{segment.depTime.substring(2, 4)}
					</h4>
					{/*<h4 className="no-margin bold">{segment.departure}</h4>*/}
				</div>
				<div id="travel-distance">
					<div>
						<div className="line" />
						<img
							style={{ maxWidth: "20px" }}
							src="/static/img/avion_ida_oscuro.svg"
						/>
						<div className="line" />
					</div>
					{/*<p className="no-margin">{segment.flightTime}</p>*/}
				</div>
				<div>
					{/*change*/}
					<h4 className="no-margin bold">
						{segment.arrTime.substring(0, 2)}:
						{segment.arrTime.substring(2, 4)}
					</h4>
					{/*<h4 className="no-margin bold">{segment.arrival}</h4>*/}
				</div>
			</Row>
		</Col>
	);
};

export default TravelDistance;
