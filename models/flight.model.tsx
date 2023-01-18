import { ISegment } from "./misReservas.model";

interface ICity {
	city: string;
	hour: string;
}

export interface IFlight {
	Amadeus?: IFlightProps[];
	NDC?: IFlightProps[][];
	Kiu?: IFlightProps[];
	summary?: ISummary;
	isInterRT?: boolean;
	isInter?: boolean;
	searchIdList: string[];
}

export interface ISummary {
	airline: any;
	max_price: number;
	min_price: number;
	segments: any;
	total_flights: number;
}

export interface IFlightProps {
	origin: ICity;
	destine: ICity;
	airline: string;
	price: string;
	scales: number;
	owner?: string;
	offer_item_id?: string;
	offer_id?: string;
	segments?: ISegment | any;
	brand?: string;
	brandId?: string;
	brandPrice?: string;
	duration_flight?: string;
}
