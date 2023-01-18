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

export default function AmadeusReservation(result: any): IMyReserves {
	let response: any = {};
	const details = result["details"];
	const pnr = result["pnr"];

	const passengers: IPassenger[] = details.pax;

	// Filter when the last segment is null
	let validSegments = pnr.data.originDestinationDetails[0].itineraryInfo.filter((seg: any) => seg.travelProduct.product != null)

	validSegments = validSegments.filter((seg: any) => 
		seg.travelProduct.product.arrDate && seg.travelProduct.product.arrTime && 
		seg.travelProduct.product.depDate && seg.travelProduct.product.depTime)

	// Take the valid segmentes and find the necesary information
	const segments: ISegment[] = validSegments.map(
			(seg: any, idx: number) => {
				const { 
					productDetails, 
					product,
					boardpointDetail,
					offpointDetail,
					companyDetail
				} = seg.travelProduct;


				const resp = {
					flightNumber: productDetails ? productDetails.identification : "",
					departureDate: product ? product.depDate : "",
					departure: boardpointDetail ? boardpointDetail.cityName || "Null" : "Null",
					depCode: boardpointDetail ? boardpointDetail.cityCode : "",
					arrival: offpointDetail ? offpointDetail.cityName || "Null" : "Null",
					arrCode: offpointDetail ? offpointDetail.cityCode : "",
					depTime: product ? product.depTime : "",
					arrTime: product ? product.arrTime : "",
					flightTime: product ?
						parseInt(seg.travelProduct.product.arrTime) -
						parseInt(seg.travelProduct.product.depTime) -
						40 : "Null",
					price: pnr.data.tstData[0].fareData.monetaryInfo.filter(
						(i: any) => i.qualifier == "T"
					)[0].amount,
					flightClass: pnr.data.tstData 
						? pnr.data.tstData[0].fareBasisInfo.fareElement[idx] 
							? resolveBrands(pnr.data.tstData[0].fareBasisInfo.fareElement[idx].fareBasis.substring(0, 2)) 
							: ""
						: "",
					airline: companyDetail ? companyDetail.identification : ""
				};

				return resp
			}
		);

	const flightInfo = {
		reserveDate:
			pnr.data.tstData[0].tstGeneralInformation.generalInformation
				.tstCreationDate,
		departureDate:
			pnr.data.originDestinationDetails[0].itineraryInfo[0].travelProduct
				.product.depDate,
		reserveCode:
			pnr.data.pnrHeader[0].reservationInfo.reservation[0].controlNumber,
		reserveState: details.reservation_status || "Null"
	};

	response = { ...response, segments, passengers, flightInfo, details };
	return response;
}
