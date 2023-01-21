import { Table, Row, Col, Collapse } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalstorage";
import parseDate from "../helpers/parseDate";
import "../../assets/page/gracias.less";

const MobileDetail = ({ segments }) => {
	return (
		<Collapse accordion expandIconPosition="right">
			{segments?.map((seg: any, idx: number) => {
				const header = (
					<Row type="flex" align="bottom">
						<Col span={8}>
							<h1>
								{seg.departure.split("-")[1] +
									" - " +
									seg.arrival.split("-")[1]}
							</h1>
							<h3>{seg.depDate}</h3>
						</Col>
						<Col span={8}>
							<h3>
								{seg.departure.split("-")[0] +
									" - " +
									seg.arrival.split("-")[0]}
							</h3>
						</Col>
					</Row>
				);
				return (
					<Collapse.Panel header={header} key={idx}>
						<Row gutter={[0, 10]} type="flex" align="bottom">
							<Col span={8}>
								<h1>Salida</h1>
								<h3>{seg.depDate}</h3>
							</Col>
							<Col span={8}>
								<h3>{seg.departure}</h3>
							</Col>
						</Row>

						<Row gutter={[0, 10]} type="flex" align="bottom">
							<Col span={8}>
								<h1>Llegada</h1>
								<h3>{seg.depDate}</h3>
							</Col>
							<Col span={8}>
								<h3>{seg.arrival}</h3>
							</Col>
						</Row>

						<Row gutter={[0, 10]} type="flex" align="bottom">
							<Col span={8}>
								<h1>Vuelo</h1>
								<h3>{seg.flight}</h3>
							</Col>
							<Col span={8}>
								<h1>Clase</h1>
								<h3>{seg.class}</h3>
							</Col>
						</Row>
					</Collapse.Panel>
				);
			})}
		</Collapse>
	);
};

const DesktopDetail = ({ datasource }) => {
	return (
		<Table
			pagination={false}
			columns={detailsCol}
			dataSource={datasource}
			rowKey={(record) => record["flight"]}
		/>
	);
};

const PaymentDetail = () => {
	const [flightInfo, setFlightInfo] = useLocalStorage("reservation", null);
	const [payInfo, setPayInfo] = useState<IPaymentDetails | null>(null);

	const parseTime = (time: string) => {
		let hours = time.substring(0, 2);
		let minutes = time.substring(2, 4);
		return hours + ":" + minutes;
	};

	useEffect(() => {
		const segments = [];
		flightInfo?.forEach((flight) => {
			flight.segments.forEach((seg) => {
				segments.push({
					depDate: parseDate(seg.departureDate),
					departure: parseTime(seg.depTime) + " - " + seg.depCode,
					arrival: parseTime(seg.arrTime) + " - " + seg.arrCode,
					flight: seg.airline + " " + seg.flightNumber,
					class: seg.flightClass,
					equipment: ""
				});
			});
		});

		setPayInfo({ segments });
	}, []);

	return (
		<div id="pay-detail">
			<div id="mobile">
				<MobileDetail segments={payInfo?.segments} />
			</div>
			<div id="desktop">
				<DesktopDetail datasource={payInfo?.segments} />
			</div>
		</div>
	);
};

export default PaymentDetail;

interface IPaymentDetails {
	segments: ISegment[];
}

interface ISegment {
	departure: string;
	depDate: string;
	arrival: string;
	flight: string;
	class: string;
	equipment: string;
}

const detailsCol: ColumnProps<any>[] = [
	{
		title: "Fecha",
		dataIndex: "depDate",
		align: "center"
	},
	{
		title: "Salida",
		dataIndex: "departure",
		align: "center"
	},
	{
		title: "Llegada",
		dataIndex: "arrival",
		align: "center"
	},
	{
		title: "Vuelo",
		dataIndex: "flight",
		align: "center"
	},
	{
		title: "Clase",
		dataIndex: "class",
		align: "center"
	},
	{
		title: "Equipaje",
		dataIndex: "equipment",
		align: "center"
	}
];
