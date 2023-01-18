import {
	IMyReserves,
	IPassenger,
	ISegment
} from "../../models/misReservas.model";

function resolveBrands(fareBasis: string): string {
	switch (fareBasis) {
		case "B4" || "B5":
			return "Ejecutiva";
		case "RY" || "RL":
			return "Ejecutiva";
		default:
			return "Economica";
	}
}

export default function NdcReservation(result: any): IMyReserves {
	let response: any = {};
	const details = result["details"];
	const pnr = result["pnr"]["ns2:OrderViewRS"]["ns2:Response"];

	const passengers: IPassenger[] = [];

	details["pax"].forEach((item) => {
		passengers.push({
			pdt: item["pdt"],
			name: item["name"] + " " + item["last_name"],
			document: item["document"]
		});
	});

	const segments: ISegment[] = [];
	const segList =
		pnr["ns2:DataLists"]["ns2:PaxSegmentList"]["ns2:PaxSegment"];
	let fareDetail = pnr["ns2:Order"]["ns2:OrderItem"]["ns2:FareDetail"];
	let paxFare = Array.isArray(fareDetail) ? fareDetail[0] : fareDetail;

	if (Array.isArray(segList)) {
		segList.map((seg: any, idx: number) => {
			segments.push({
				departureDate:
					seg["ns2:Dep"]["ns2:AircraftScheduledDateTime"].split(
						"T"
					)[0],
				price: pnr["ns2:Order"]["ns2:TotalPrice"]["ns2:TotalAmount"][
					"#text"
				],
				airline:
					seg["ns2:MarketingCarrierInfo"]["ns2:CarrierDesigCode"],
				arrCode: seg["ns2:Arrival"]["ns2:IATA_LocationCode"],
				arrival: seg["ns2:Arrival"]["ns2:IATA_LocationCode"],
				arrTime: seg["ns2:Arrival"]["ns2:AircraftScheduledDateTime"]
					.split("T")[1]
					.split(":")
					.join(""),
				depCode: seg["ns2:Dep"]["ns2:IATA_LocationCode"],
				departure: seg["ns2:Dep"]["ns2:IATA_LocationCode"],
				depTime: seg["ns2:Dep"]["ns2:AircraftScheduledDateTime"]
					.split("T")[1]
					.split(":")
					.join(""),
				flightTime: "Null",
				flightClass: paxFare["ns2:FareComponent"][idx] 
					? resolveBrands(
							paxFare["ns2:FareComponent"][idx]["ns2:FareBasis"]["ns2:FareBasisCode"]["ns2:Code"].substring(3, 5)
						)
					: "",
				flightNumber:
					seg["ns2:MarketingCarrierInfo"][
						"ns2:MarketingCarrierFlightNumberText"
					]
			});
		});
	} else {
		segments.push({
			departureDate:
				segList["ns2:Dep"]["ns2:AircraftScheduledDateTime"].split(
					"T"
				)[0],
			price: pnr["ns2:Order"]["ns2:TotalPrice"]["ns2:TotalAmount"][
				"#text"
			],
			airline:
				segList["ns2:MarketingCarrierInfo"]["ns2:CarrierDesigCode"],
			arrCode: segList["ns2:Arrival"]["ns2:IATA_LocationCode"],
			arrival: segList["ns2:Arrival"]["ns2:IATA_LocationCode"],
			arrTime: segList["ns2:Arrival"]["ns2:AircraftScheduledDateTime"]
				.split("T")[1]
				.split(":")
				.join(""),
			depCode: segList["ns2:Dep"]["ns2:IATA_LocationCode"],
			departure: segList["ns2:Dep"]["ns2:IATA_LocationCode"],
			depTime: segList["ns2:Dep"]["ns2:AircraftScheduledDateTime"]
				.split("T")[1]
				.split(":")
				.join(""),
			flightTime: "Null",
			flightClass: paxFare["ns2:FareComponent"]["ns2:FareBasis"] 
				? resolveBrands(
				paxFare["ns2:FareComponent"]["ns2:FareBasis"][
					"ns2:FareBasisCode"
				]["ns2:Code"].substring(3, 5)
				)
				: "",
			flightNumber:
				segList["ns2:MarketingCarrierInfo"][
					"ns2:MarketingCarrierFlightNumberText"
				]
		});
	}

	const flightInfo = {
		reserveDate: details.reservation_date,
		departureDate: segments[0].departureDate,
		reserveCode: details.code_reserved,
		reserveState: details.reservation_status || "Null"
	};

	response = { ...response, segments, passengers, flightInfo, details };
	return response;
}
