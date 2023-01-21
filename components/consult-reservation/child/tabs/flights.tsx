import { format } from "date-fns";
import { Divider, Icon } from "antd";
import Ancilaries from "../../ancilaries";
import ReserveInformation from "../../reserve-information";
import CustomSection from "../custom-section";
import PaxInformation from "../pax-information";
import { es } from "date-fns/locale";

export const formatDates = (date: string) => {
	let day = date.substring(0, 2);
	let month = parseInt(date.substring(2, 4)) - 1;
	let year = "20" + date.substring(4, 6);
	let d = new Date(Number(year), Number(month), Number(day));

	if (date.split("-").length > 1) {
		const only_date = date.split(" ")[0];
		d = new Date(only_date);
	}

	const formatedDate = format(d, "d/MMMM/yyyy", { locale: es });

	return `${formatedDate.split("/")[0]} de ${formatedDate.split("/")[1]} de ${
		formatedDate.split("/")[2]
	}`;
};

const FlightTab = ({ data }) => {
	const firstSegmentIcon = "/static/img/avion_ida_oscuro.svg";
	const elseSegmentIcon = "/static/img/avion_regreso_oscuro.svg";
	const hasServiceList = false;

	return (
		<>
			<div id="resume">
				<div className="info-item">
					<h3>Fecha de reserva</h3>
					<span>{formatDates(data.flightInfo.reserveDate)}</span>
				</div>
				<div className="info-item">
					<h3>Fecha de salida del vuelo</h3>
					<span>{formatDates(data.flightInfo.departureDate)}</span>
				</div>
				<div className="info-item">
					<h3>Código de Reserva</h3>
					<span style={{ color: "#DF395D" }}>
						{data.flightInfo.reserveCode}
					</span>
				</div>
				<div className="info-item">
					<h3>Estado de la Reserva</h3>
					<span>{data.flightInfo.reserveState}</span>
				</div>
			</div>

			<CustomSection _Icon={<Icon type="user" />} headText="PASAJEROS">
				{Array.isArray(data.passengers) ? (
					data.passengers.map((passenger, idx) => (
						<PaxInformation key={idx} pax={passenger} idx={idx} />
					))
				) : (
					<PaxInformation key={0} pax={data.passengers} idx={0} />
				)}
			</CustomSection>
			{data.segments.map((seg, idx) => {
				return (
					<CustomSection
						key={idx}
						_Icon={
							<img
								src={
									idx % 2 == 0
										? firstSegmentIcon
										: elseSegmentIcon
								}
							/>
						}
						headText={idx == 0 ? "VUELOS" : ""}
					>
						<ReserveInformation segment={seg} />
						{hasServiceList && (
							<>
								<Divider />
								<Ancilaries pax={data.passengers} />
							</>
						)}
					</CustomSection>
				);
			})}
		</>
	);
};

export default FlightTab;
