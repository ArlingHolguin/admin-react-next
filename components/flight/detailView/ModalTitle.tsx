import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useFlightDetail } from "../../../context/flightItem.context";

const ModalTitle = ({ segments }) => {
	const [data, setData] = useState(null);
	const [origin, setOrigin] = useState("");
	const [destine, setDestine] = useState("");
	const { saveInfo } = useFlightDetail();

	useEffect(() => {
		fetch("/static/data/codigos.json")
			.then((res) => res.json())
			.then((d) => setData(d.iata));
	}, []);

	useEffect(() => {
		if (data) {
			const segmentsExtraInfo = getCityCodeInfo(segments, data);
			const totalSegments = segmentsExtraInfo.length;
			setOrigin(
				segmentsExtraInfo[0].ciudad + ", " + segmentsExtraInfo[0].pais
			);
			setDestine(
				segmentsExtraInfo[totalSegments - 1].ciudad +
					", " +
					segmentsExtraInfo[totalSegments - 1].pais
			);

			saveInfo({ segments, segmentsExtraInfo });
		}
	}, [data]);

	return (
		<Row>
			<Col>
				<h3 style={{ color: "#DF395D" }}>Información de vuelo</h3>
			</Col>
			<Col>
				<h4>
					Origen: <span style={{ fontWeight: 300 }}>{origin}</span>
				</h4>
				<h4>
					Destino: <span style={{ fontWeight: 300 }}>{destine}</span>
				</h4>
			</Col>
		</Row>
	);
};

export default ModalTitle;

const getCityCodeInfo = (segments: any, data: any) => {
	const mappedCityCodes = {};
	segments.map((seg) => {
		if (!mappedCityCodes[seg.departure]) {
			Object.assign(mappedCityCodes, {
				...mappedCityCodes,
				[seg.departure]: seg.departure
			});
		}

		if (!mappedCityCodes[seg.arrCode]) {
			Object.assign(mappedCityCodes, {
				...mappedCityCodes,
				[seg.arrCode]: seg.arrCode
			});
		}
	});

	const codes = Object.keys(mappedCityCodes);
	const segmentsExtraInfo = codes.map((code) => {
		return data.filter((obj) => obj.codigo == code)[0];
	});

	return segmentsExtraInfo;
};
