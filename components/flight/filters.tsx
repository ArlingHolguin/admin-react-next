import { Slider, Select, Card, Checkbox, Collapse } from "antd";
import useWindowDimensions from "../../hooks/useWindowsDimension";
import { useEffect, useState } from "react";
import { useFlightFilter } from "../../context/flightFilter.context";
import ScalesFilters from "./filtersChildren/scales";
import AirlineFilters from "./filtersChildren/airlines";
import Service from "../../services";
import { IFiltersRequestBody } from "../../models/filterFlight.model";
import "../../assets/components/flight/filters.less";
import FiltersPlaceHolder from "./filters-placeholder";
const { Panel } = Collapse;

const { Option } = Select;
const service = new Service();

let numberFormatter = new Intl.NumberFormat("es-CO", {
	style: "currency",
	currency: "COP",
	maximumFractionDigits: 0,
	minimumFractionDigits: 0
});

const hourFomatter = (value: number) => {
	let realValue: string = "0";
	let valueStr: string = value.toString();

	if (parseInt(valueStr.slice(valueStr.length - 2)) > 60) {
		value += 40;
		valueStr = value.toString();
	}

	// format the number like a 24 hour datetime
	if (valueStr.length == 1) {
		realValue = "000" + value;
	} else if (valueStr.length == 2) {
		realValue = "00" + value;
	} else if (valueStr.length == 3) {
		realValue = "0" + value;
	} else {
		realValue = valueStr;
	}

	return realValue.slice(0, 2) + ":" + realValue.slice(2, 4);
};

const Filters = ({ loadingRecomm }) => {
	const { 
		flights, 
		filterLoading, 
		saveFilterSettings, 
		filterSettings, 
		saveFlightSearch, 
		saveFilterLoading 
	} = useFlightFilter();
	const isFlightsUndefined = flights == undefined;

	const { height, width } = useWindowDimensions();

	const handlePriceChange = (value) => {
		saveFilterSettings({
			key: "price",
			filterValue: { min: value[0], max: value[1] }
		});
		saveFilterLoading(true);
		service
			.Filter(filterSettings)
			.then((res) => {
				saveFlightSearch({ ...res[0], summary: flights.summary })
				saveFilterLoading(false);
			});
	};

	const handleDatetimeChange = (value) => {
		const realTime = value.map((time: number) => {
			return hourFomatter(time).split(":").join("");
		});

		saveFilterSettings({
			key: "departure_time",
			filterValue: { start: realTime[0], end: realTime[1] }
		});
		saveFilterLoading(true);
		service
			.Filter(filterSettings)
			.then((res) => {
				saveFlightSearch({ ...res[0], summary: flights.summary })
				saveFilterLoading(false);
			});
	};

	const handleScalesChange = (value) => {
		saveFilterLoading(true);
		if (value.length > 1 && value.includes("ALL")) {
			value.shift();
		}

		saveFilterSettings({ key: "segments", filterValue: value });
		const s = filterSettings;
		s.params.segments = value;
		service
			.Filter(s)
			.then((res) => {
				saveFlightSearch({ ...res[0], summary: flights.summary })
				saveFilterLoading(false);
			});
	};

	const handleAirlineChange = (value) => {
		saveFilterLoading(true);
		if (
			value.length >= 1 &&
			value.filter((val) => val != "ALL").length >= 1
		) {
			value.shift();
		}

		saveFilterSettings({ key: "airlines", filterValue: value });
		const s = filterSettings;
		s.params.airlines = value;
		service
			.Filter(s)
			.then((res) => {
				saveFlightSearch({ ...res[0], summary: flights.summary });
				saveFilterLoading(false)
			});
	};

	useEffect(() => {
		const newSearch = filterSettings?.id_list ? filterSettings?.id_list[0] != flights?.searchIdList[0] : true 
		const defaultFilters: IFiltersRequestBody = {
			id_list: !newSearch ? filterSettings?.id_list : flights?.searchIdList,
			params: {
				price: {
					min:
						!newSearch ? filterSettings?.params.price["min"] :
						flights?.summary.min_price,
					max:
						!newSearch ? filterSettings?.params.price["max"] :
						flights?.summary.max_price
				},
				airlines: !newSearch ? filterSettings?.params.airlines : ["ALL"],
				segments: !newSearch ? filterSettings?.params.segments : ["ALL"],
				departure_time: !newSearch ? filterSettings?.params.departure_time : {
					start: "0000",
					end: "2359"
				}
			}
		};
		saveFilterSettings({ filterValue: defaultFilters });
	}, [flights]);

	if (loadingRecomm) {
		return (
			<div className="placeholder-wrapper">
				<FiltersPlaceHolder />
			</div>
		);
	}

	return (
		<div className="contentFilter">
			<Collapse
				style={{ marginTop: 16 }}
				expandIconPosition="right"
				defaultActiveKey={width < 770 ? [] : ["1"]}
				expandIcon={({ isActive }) =>
					isActive ? (
						<img src="/static/img/accordeon_top.png" />
					) : (
						<img src="/static/img/accordeon_down.png" />
					)
				}
			>
				<Panel header="FILTRAR RESULTADOS" key="1">
					<Card
						bodyStyle={{ backgroundColor: "#EEEFF1" }}
						style={{ width: "100%" }}
					>
						<div className="itemFilter">
							<p>Precios</p>
							<Slider
								range
								min={flights?.summary.min_price}
								max={flights?.summary.max_price}
								tipFormatter={(value) =>
									numberFormatter.format(Number(value))
								}
								onAfterChange={handlePriceChange}
							/>
						</div>
						<div className="itemFilter">
							<p>Hora de salida</p>
							<Slider
								range
								min={0}
								max={2359}
								tipFormatter={hourFomatter}
								onAfterChange={handleDatetimeChange}
							/>
						</div>
						<div className="itemFilter itemScale">
							<p>Escalas</p>
							<Checkbox.Group
								defaultValue={["ALL"]}
								onChange={handleScalesChange}
							>
								{!isFlightsUndefined && (
									<ScalesFilters />
								)}
							</Checkbox.Group>
						</div>
					</Card>
					<Card
						style={{ width: "100%" }}
						bodyStyle={{
							backgroundColor: "#D9DADE",
							paddingTop: 0
						}}
					>
						<div className="itemFilter itemScale">
							<p>Aerolínea</p>
							<Checkbox.Group
								defaultValue={["ALL"]}
								onChange={handleAirlineChange}
							>
								{!isFlightsUndefined && (
									<AirlineFilters />
								)}
							</Checkbox.Group>
						</div>
					</Card>
				</Panel>
			</Collapse>
		</div>
	);
};

export default Filters;
