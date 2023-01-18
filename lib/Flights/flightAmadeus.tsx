import { IAmadeusFlightResult, IAmadeusItem } from "../../models/amadeus.model";
import { IFlight, IFlightProps } from "../../models/flight.model";
import { IResult } from "../../models/searchService.model";

const parseDuration = (duration) => {
	const drt_arr = duration.split("");
	const hours = `${drt_arr[0]}${drt_arr[1]}`;
	const mins = `${drt_arr[2]}${drt_arr[3]}`;
	return `${hours}:${mins}`;
};

function organizeData(recommendation: IAmadeusItem, id: string): IFlightProps {
	let origin: any;
	let destine: any;
	const segments = [];
	recommendation.details.map((segment, idx) => {
		if (idx == 0) {
			// with no scales
			origin = {
				city: segment.cityDeparture,
				hour:
					segment.timeDeparture.substring(0, 2) +
					":" +
					segment.timeDeparture.substring(2)
			};
			destine = {
				city: segment.cityArrival,
				hour:
					segment.timeArrival.substring(0, 2) +
					":" +
					segment.timeArrival.substring(2)
			};
		} else {
			// with scales
			destine = {
				city: segment.cityArrival,
				hour:
					segment.timeArrival.substring(0, 2) +
					":" +
					segment.timeArrival.substring(2)
			};
		}

		const parsedDate =
			"20" +
			segment.departure.substring(4, 6) +
			"-" +
			segment.departure.substring(2, 4) +
			"-" +
			segment.departure.substring(0, 2);

		const depHour = parseInt(segment.timeDeparture.slice(0, 2)) * 60;
		const arrHour = parseInt(segment.timeArrival.slice(0, 2)) * 60;
		const depMin = parseInt(segment.timeDeparture.slice(2, 4));
		const arrMin = parseInt(segment.timeArrival.slice(2, 4));
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
			flightNumber: segment.numberFlight,
			departureDate: parsedDate,
			departure: segment.cityDeparture,
			depCode: segment.cityDeparture,
			arrCode: segment.cityArrival,
			depTime: segment.timeDeparture,
			arrTime: segment.timeArrival,
			flightTime: flightTime,
			price: recommendation.fullPrice.toString(),
			flightClass: "",
			airline: segment.marketingCarrier
		});
	});

	return {
		airline: recommendation.airlineValidate,
		origin: origin,
		destine: destine,
		price: recommendation.fullPrice.toString(),
		scales: recommendation.scale,
		owner: recommendation.airlineValidate,
		offer_id: id,
		offer_item_id: recommendation.id,
		duration_flight: parseDuration(recommendation.duration_flight),
		segments
	};
}

export default function FlightAmadeus(
	result: IResult<IAmadeusFlightResult[]>,
	idx = 0
): IFlight {
	const response: any = {
		Amadeus: []
	};

	if (result.flights.length != 0) {
		result.flights[idx].item.map((recommendation) => {
			if (recommendation.details) {
				response["Amadeus"].push(
					organizeData(recommendation, result.id)
				);
			}
		});
	}

	return response;
}
