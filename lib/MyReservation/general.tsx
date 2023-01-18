import AmadeusReserve from "./amadeusReservation";
import KiuReserve from "./kiuReservation";
import { IMyReserves } from "../../models/misReservas.model";
import NdcReservation from "./ndcReservation";

interface Data {
	results: Array<IMyReserves>;
}

export default function (data: Data): IMyReserves[] {
	let response = [];
	data.results.forEach((result) => {
		const source = result["details"].source;
		if (source.toLowerCase().includes("amadeus")){
			response.push(AmadeusReserve(result));
		} else if (source.toLowerCase().includes("kiu")) {
			response.push(KiuReserve(result));
		} else if (source.toLowerCase().includes("ndc")) {
			response.push(NdcReservation(result));
		}
	});

	return response;
}
