import "../../../assets/components/flight/service-list.less";

import { Button, Row, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { NDCServices } from "../../../lib/services-constants";

const { TabPane } = Tabs;

const ServiceListItem = ({ services, selectedAction }) => {
	const [servicesSelected, setServicesSelected] = useState([]);

	useEffect(() => {
		const servicesList = services.services.PAX1.map((item) => {
			return { code: item.name, selected: false, data: item };
		});
		setServicesSelected(servicesList);
	}, []);

	const ref: any = useRef(null);

	const scroll = (scrollOffset) => {
		ref.current.scrollLeft += scrollOffset;
	};

	const selectAction = (code) => {
		const index = servicesSelected.findIndex((item) => item.code === code);
		servicesSelected[index].selected = !servicesSelected[index].selected;
		setServicesSelected([...servicesSelected]);
	};

	return (
		<div className="service-list-options">
			<Button
				type="link"
				onClick={() => scroll(-40)}
				onMouseOver={() => scroll(-40)}
			>
				<img className="btn-options" src="/static/img/sl-left.svg" />
			</Button>

			<ul className="options" id="scroll-options" ref={ref}>
				{servicesSelected.map((item, i) => (
					<li
						key={`sl-${i}`}
						className={item.selected ? "service-selected" : null}
						onClick={() => {
							selectAction(item.code);
							selectedAction(item);
						}}
					>
						<img
							src={`/static/img/${NDCServices[item.code].icon}`}
						/>
						<p>{NDCServices[item.code].name}</p>
					</li>
				))}
			</ul>
			<Button
				type="link"
				onClick={() => scroll(40)}
				onMouseOver={() => scroll(40)}
			>
				<img className="btn-options" src="/static/img/sl-right.svg" />
			</Button>
		</div>
	);
};

export const ServiceList = ({ passengers = {}, services, addPrice }) => {
	const [addPriceBy, setAddPriceBy] = useState(0);
	const [servicesSelecteds, setServicesSelected] = useState([]);
	const [segmentData, setSegmentData] = useState([]);

	const selectedAction = (serviceItem) => {
		if (!serviceItem.selected) {
			const servicesSelectedTemp = servicesSelecteds;
			const index = servicesSelectedTemp.findIndex(
				(item) => item.code === serviceItem.code
			);
			if (index > -1) {
				servicesSelectedTemp.splice(index, 1);
			}
			setServicesSelected([...servicesSelectedTemp]);
		} else {
			const servicesOld = servicesSelecteds;
			servicesOld.push(serviceItem);
			setServicesSelected([...servicesOld]);
		}
		getPrice();
	};

	const getPrice = () => {
		console.log(servicesSelecteds);
		const price = servicesSelecteds.reduce(
			(accumulator, item) => parseInt(item.data.price) + accumulator,
			0
		);
		setAddPriceBy(price);
	};

	const parsePax = () => {
		const result = [];
		Object.values(passengers).map((val, idx) => {
			// idx == 0 adults || idx == 1 childs || idx == 2 babies
			if (idx == 0) {
				for (let i = 0; i < val; i++) {
					result.push("ADULTO " + i);
				}
			}
			if (idx == 1) {
				for (let i = 0; i < val; i++) {
					result.push("NIÑO " + i);
				}
			}
			if (idx == 2) {
				for (let i = 0; i < val; i++) {
					result.push("INFANTE " + i);
				}
			}
		});
		return result;
	};

	const getSegments = () => {
		Object.keys(services.segments_data).forEach((seg) => {
			const dep = services.segments_data[seg].Departure.AirportCode;
			const arr = services.segments_data[seg].Arrival.AirportCode;
			setSegmentData([...segmentData, { departure: dep, arrival: arr }]);
		});
	};

	useEffect(() => {
		getSegments();
	}, []);

	return (
		<Tabs type="card">
			{parsePax().map((pax, idx) => (
				<TabPane
					tab={
						<div className="tab-item">
							<p>{pax}</p>
						</div>
					}
					key={`${pax}-${idx}`}
				>
					<ServiceListItem
						services={services}
						selectedAction={(e) => {
							selectedAction(e);
						}}
					/>
					<Row
						type="flex"
						justify="space-between"
						className="content-journey"
					>
						<Button type="link">
							<img
								className="btn-options"
								src="/static/img/sl-left.svg"
							/>
						</Button>
						<Row className="journey" type="flex" justify="center">
							<p style={{ width: "100%" }}>
								Aplica para los siguientes trayectos
							</p>
							<Row
								type="flex"
								justify="space-around"
								className="journey-cities"
							>
								{segmentData.map((seg) => (
									<p>
										{seg.departure} - {seg.arrival}
									</p>
								))}
							</Row>
							<Row type="flex" justify="center">
								<Button
									type="primary"
									className="add-by-price"
									onClick={() => {
										//addPrice({ servicesSelecteds, addPriceBy });
									}}
								>
									<img src="/static/img/circle-add.svg" />
									Agregar por ${addPriceBy}
								</Button>
							</Row>
						</Row>
						<Button type="link">
							<img
								className="btn-options"
								src="/static/img/sl-right.svg"
							/>
						</Button>
					</Row>
				</TabPane>
			))}
		</Tabs>
	);
};
