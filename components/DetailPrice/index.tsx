import { useState } from 'react'
import { Row, Col, Button, Collapse } from "antd";
import Router from "next/router";
import useWindowDimensions from '../../hooks/useWindowsDimension';
import DetailItems from "./DetailItems";
import SegmentDuration from "./SegmentDetail/SegmentInfo/SegmentDuration";
import SegmentHead from "./SegmentDetail/SegmentInfo/SegmentHead";
import SegmentInfo from "./SegmentDetail/SegmentInfo";
import SegmentDeepInfo from "./SegmentDetail/SegmentDeepInfo";

const { Panel } = Collapse;

const DetailPrice = ({ totalPrice, reservations }) => {
	const { width } = useWindowDimensions();

	return (
		<Col xs={22} md={8} lg={8} className="detail-price" style={{order: width < 770 ? -1 : 0}}>
		<Collapse
			defaultActiveKey={width > 770 ? ["detail_price"] : []}
			expandIconPosition="right"
			expandIcon={({ isActive }) =>
				isActive ? (
					<img src="/static/img/accordeon_top.png" />
				) : (
					<img src="/static/img/accordeon_down.png" />
				)
			}
		>
		<Panel
			header={
				<p className="collapse-header-text">
					DETALLES DE LA COMPRA
				</p>
			}
			key="detail_price"
		>
			<div className="p20">
				<Button
					style={{ marginBottom: "5%" }}
					block
					onClick={() => Router.back()}
				>
					Realizar otra busqueda
				</Button>
				<h3>DETALLES DE LA COMPRA</h3>
				<hr className="breakdown light"></hr>

				{reservations.map((reservation, idx) => {
					return (
						<div key={idx}>
							<SegmentHead reservation={reservation} />
							<Row
								type="flex"
								justify="space-around"
								className="detail-flight"
								align="middle"
							>
								<SegmentInfo reservation={reservation} />
								<SegmentDuration reservation={reservation} />
								<SegmentInfo
									reservation={reservation}
									isArrival={true}
								/>
							</Row>
							{reservation.segments.length > 1 && (
								<SegmentDeepInfo reservation={reservation} />
							)}
						</div>
					);
				})}

				<DetailItems totalPrice={totalPrice} />
			</div>
		</Panel>
		</Collapse>
		</Col>
	);
};

export default DetailPrice;
