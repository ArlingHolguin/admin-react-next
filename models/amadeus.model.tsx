export interface IAmadeusFlightResult {
	option: string;
	item: IAmadeusItem[];
}

export interface IAmadeusItem {
	id: string;
	airlineValidate: string;
	price: number;
	tax: number;
	priceAdult: number;
	ta: number;
	fullPrice: number;
	adults: number;
	childs: number;
	baby: number;
	rbdList: IRBD[];
	scale: number;
	details: IDetails[];
	duration_flight?: string;
}

interface IRBD {
	rbd: string;
	avl: string;
	fareBasis: string;
	branded: string[];
}

export interface IDetails {
	numberFlight: string;
	cityDeparture: string;
	terminalDeparture: string | null;
	departure: string;
	timeDeparture: string;
	cityArrival: string;
	terminalArrival: string;
	arrival: string;
	timeArrival: string;
	operatingCarrier: string | null;
	marketingCarrier: string;
	airplane: string;
	electronicTicketing: string;
	productDetailQualifier: string;
}
