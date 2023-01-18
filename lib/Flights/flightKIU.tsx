import { IFlight, IFlightProps } from "../../models/flight.model";
import { IResultsKiu, IKiuRecommendation } from "../../models/kiu.model";
import { IResult } from "../../models/searchService.model";

const parseDuration = (duration) => {
	return duration.slice(0, duration.length - 3);
};

function organizeData(
	recommendation: IKiuRecommendation,
	id: string
): IFlightProps {
	let origin: any;
	let destine: any;
	let airline: string;
	const segments = [];

	recommendation.flight_segments.map((segment, idx) => {
		if (idx == 0) {
			// with no scales
			origin = {
				city: segment.DepartureAirport["@LocationCode"],
				hour: segment["@DepartureDateTime"]
					.split(" ")[1]
					.split(":")
					.slice(0, 2)
					.join(":")
			};
			destine = {
				city: segment.ArrivalAirport["@LocationCode"],
				hour: segment["@ArrivalDateTime"]
					.split(" ")[1]
					.split(":")
					.slice(0, 2)
					.join(":")
			};
		} else {
			// with scales
			destine = {
				city: segment.ArrivalAirport["@LocationCode"],
				hour: segment["@ArrivalDateTime"]
					.split(" ")[1]
					.split(":")
					.slice(0, 2)
					.join(":")
			};
		}
		airline = segment.MarketingAirline["@CompanyShortName"];

		const depHour =
			parseInt(
				segment["@DepartureDateTime"].split(" ")[1].split(":")[0]
			) * 60;
		const arrHour =
			parseInt(segment["@ArrivalDateTime"].split(" ")[1].split(":")[0]) *
			60;
		const depMin = parseInt(
			segment["@DepartureDateTime"].split(" ")[1].split(":")[1]
		);
		const arrMin = parseInt(
			segment["@ArrivalDateTime"].split(" ")[1].split(":")[1]
		);
		const parsedHour =
			Math.floor((arrHour + arrMin - (depHour + depMin)) / 60) +
			" hora(s) ";
		const parsedMinutes =
			Math.floor((arrHour + arrMin - (depHour + depMin)) % 60) +
			" minutos";

		const flightTime =
			parsedHour == "0 hora(s) "
				? parsedMinutes
				: parsedHour + parsedMinutes;

		segments.push({
			flightNumber: segment["@FlightNumber"],
			departureDate: segment["@DepartureDateTime"].split(" ")[0],
			departure: segment["DepartureAirport"]["@LocationCode"],
			depCode: segment["DepartureAirport"]["@LocationCode"],
			arrCode: segment["ArrivalAirport"]["@LocationCode"],
			arrival: segment["ArrivalAirport"]["@LocationCode"],
			depTime: segment["@DepartureDateTime"]
				.split(" ")[1]
				.split(":")
				.slice(0, 2)
				.join(""),
			arrTime: segment["@ArrivalDateTime"]
				.split(" ")[1]
				.split(":")
				.slice(0, 2)
				.join(""),
			flightTime: flightTime,
			price: recommendation.price.total,
			flightClass: "",
			airline: segment["MarketingAirline"]["@CompanyShortName"]
		});
	});

	return {
		airline: airline,
		origin: origin,
		destine: destine,
		price: recommendation.price.total,
		scales: recommendation.flight_segments.length,
		owner: airline,
		offer_id: id,
		offer_item_id: recommendation.token,
		duration_flight: parseDuration(
			recommendation.flight_segments[0]["@JourneyDuration"]
		),
		segments
	};
}

export default function FlightKIU(result: IResult<IResultsKiu[]>): IFlight {
	const response: any = {
		Kiu: []
	};

	if (result.flights.length != 0) {
		result.flights[0].flights.map((recommendation) => {
			response["Kiu"].push(organizeData(recommendation, result.id));
		});
	}

	return response;
}
