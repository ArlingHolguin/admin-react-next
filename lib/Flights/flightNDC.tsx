import { IFlight, IFlightProps } from "../../models/flight.model";
import { INDC, IRecommendations } from "../../models/ndc.model";
import { IResult } from "../../models/searchService.model";

function organizeData(recommendation: IRecommendations): IFlightProps[] {
	let origin: any;
	let destine: any;
	const segments = [];

	const parseDuration = (duration) => {
		return duration.slice(0, duration.length - 3);
	};

	recommendation.segments.map((segment, idx) => {
		if (idx == 0) {
			// with no scales
			origin = {
				city: segment.Departure.AirportCode,
				hour: segment.Departure.Time
			};
			destine = {
				city: segment.Arrival.AirportCode,
				hour: segment.Arrival.Time
			};
		} else {
			// with scales
			destine = {
				city: segment.Arrival.AirportCode,
				hour: segment.Arrival.Time
			};
		}

		const depHour =
			parseInt(segment.Departure.Time.split(":").join("").slice(0, 2)) *
			60;
		const arrHour =
			parseInt(segment.Arrival.Time.split(":").join("").slice(0, 2)) * 60;
		const depMin = parseInt(
			segment.Departure.Time.split(":").join("").slice(2, 4)
		);
		const arrMin = parseInt(
			segment.Arrival.Time.split(":").join("").slice(2, 4)
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
			flightNumber: segment.MarketingCarrier.FlightNumber,
			departureDate: segment.Departure.Date,
			departure: segment.Departure.AirportCode,
			depCode: segment.Departure.AirportCode,
			arrCode: segment.Arrival.AirportCode,
			arrival: segment.Arrival.AirportCode,
			depTime: segment.Departure.Time.split(":").join(""),
			arrTime: segment.Arrival.Time.split(":").join(""),
			flightTime: flightTime,
			price: recommendation.price_detail.TotalAmount.DetailCurrencyPrice
				.Total,
			flightClass: "",
			airline: segment.MarketingCarrier.AirlineID
		});
	});

	return recommendation.fare_detail.map((fare) => {
		return {
			airline: fare.owner,
			origin: origin,
			destine: destine,
			price: fare.price_detail.TotalAmount.DetailCurrencyPrice.Total,
			scales: segments.length,
			owner: fare.owner,
			offer_id: fare.offer_id,
			offer_item_id: fare.offer_item_id,
			segments,
			brand: fare.branded.split("-")[0],
			duration_flight: parseDuration(recommendation.durations[0])
		};
	});
}

export default function FlightNDC(
	result: IResult<IRecommendations[]>
): IFlight {
	const response: any = {
		NDC: []
	};

	if (result.flights.length != 0) {
		result.flights.map((recommendation) => {
			response["NDC"].push(organizeData(recommendation));
		});
	}

	return response;
}
