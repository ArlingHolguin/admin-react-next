import {
	IMyReserves,
	IPassenger,
	ISegment
} from "../../models/misReservas.model";

export default function KiuReservation(result: any): IMyReserves {
	let response: any = {};
	const details = result["details"];
	const pnr = result["pnr"];

	const passengers: IPassenger[] = [];
	if (Array.isArray(pnr.CustomerInfos.CustomerInfo)) {
		pnr.CustomerInfos.CustomerInfo.map((pax: any) => {
			passengers.push({
				document: pax.Customer.Document["@DocID"],
				name:
					pax.Customer.PersonName.GivenName +
					" " +
					pax.Customer.PersonName.Surname,
				pdt: pax.Customer["@PassengerTypeCode"]
			});
		});
	} else {
		const customer = pnr.CustomerInfos.CustomerInfo.Customer;
		passengers.push({
			document: customer.Document["@DocID"],
			name:
				customer.PersonName.GivenName +
				" " +
				customer.PersonName.Surname,
			pdt: customer["@PassengerTypeCode"]
		});
	}

	const segments: ISegment[] = [];
	if (Array.isArray(pnr.ItineraryInfo.ReservationItems.Item)) {
		pnr.ItineraryInfo.ReservationItems.Item.map((seg: any) => {
			const reservation = seg.Air.Reservation;
			segments.push({
				flightNumber: reservation["@FlightNumber"],
				departureDate: reservation["@DepartureDateTime"].split("T")[0],
				departure: "Null",
				depCode: reservation.DepartureAirport["@LocationCode"],
				arrCode: reservation.ArrivalAirport["@LocationCode"],
				arrival: "Null",
				depTime: reservation["@DepartureDateTime"].split("T")[1],
				arrTime: reservation["@ArrivalDateTime"].split("T")[1],
				flightTime: "Null",
				price: pnr.ItineraryInfo.ItineraryPricing.Cost[
					"@AmountAfterTax"
				],
				flightClass: "Economica",
				airline: reservation.MarketingAirline
			});
		});
	} else {
		const reservation =
			pnr.ItineraryInfo.ReservationItems.Item.Air.Reservation;
		segments.push({
			flightNumber: reservation["@FlightNumber"],
			departureDate: reservation["@DepartureDateTime"].split("T")[0],
			departure: "Null",
			depCode: reservation.DepartureAirport["@LocationCode"],
			arrCode: reservation.ArrivalAirport["@LocationCode"],
			arrival: "Null",
			depTime: reservation["@DepartureDateTime"]
				.split("T")[1]
				.split(":")
				.join(""),
			arrTime: reservation["@ArrivalDateTime"]
				.split("T")[1]
				.split(":")
				.join(""),
			flightTime: "Null",
			price: pnr.ItineraryInfo.ItineraryPricing.Cost["@AmountAfterTax"],
			flightClass: "Economica",
			airline: reservation.MarketingAirline
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
