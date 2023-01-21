import { Col, Tooltip } from "antd";
import "../../assets/components/flight/item-airline.less";
import formatter from "../../lib/priceFormatter";
import { useSelection } from "../../context/brandSelection.context";
import { NDCServicesPerBrand } from "../../lib/services-constants";

const ItemAirline = ({
	select = false,
	branded,
	flightServices = null,
	mobile = false
}) => {
	const { saveSelectedBrand } = useSelection();

	const BrandServices = ({ excluded = false }) => {
		const iconsURI = "/static/img/services-icons";
		let chd = [];
		if (flightServices == null) {
			const brandServices = NDCServicesPerBrand[branded.text];
			const services = brandServices[excluded ? "extraCost" : "included"];
			const serviceKey = Object.keys(services);
			chd = serviceKey.map((s, idx) => {
				const serviceOptions = services[s];
				return (
					<div key={idx} className="item">
						<img src={serviceOptions.icon} />
						<div className="item-text">
							{serviceOptions["description"] ? (
								<Tooltip title={serviceOptions["description"]}>
									<p>{s}</p>
								</Tooltip>
							) : (
								<p>{s}</p>
							)}
						</div>
					</div>
				);
			});
		} else {
			const services = flightServices.filter((s) =>
				excluded ? s.include == "CHA" : s.include == "INC"
			);
			chd = services.map((service, idx) => {
				return (
					<div key={idx} className="item">
						<img src={iconsURI + "/" + service?.icon} />
						<div className="item-text">
							<p>{service.traslate}</p>
						</div>
					</div>
				);
			});
		}

		if (chd.length == 0 || !chd[0]) return null;

		return (
			<>
				{excluded ? (
					<p className="cost">Con costo extra</p>
				) : (
					<p className="rate">Esta tarifa incluye</p>
				)}
				{chd}
			</>
		);
	};
	if (mobile) {
		return (
			<div className="airlineDescription scroll-bar">
				<BrandServices />
				<BrandServices excluded />
			</div>
		);
	}

	return (
		<Col
			span={8}
			style={mobile && { width: "100%" }}
			className={select ? "item-airline selected" : "item-airline"}
			onClick={() => saveSelectedBrand(branded.text)}
		>
			<div className="topAirlinePrice">
				<div className="circle"></div>
				<p>{formatter.format(branded.price)} COP</p>
				<p>{branded.text}</p>
			</div>
			<div className="airlineDescription scroll-bar">
				<BrandServices />
				<BrandServices excluded />
			</div>
		</Col>
	);
};

export default ItemAirline;
