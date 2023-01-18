export interface INDC {
	offer_id: string;
	passengers: IPassengers[];
	recommendations: IRecommendations[];
	searched: ISearched;
}

interface IPassengers {
	key: string;
	ptc: string;
}

export interface IRecommendations {
	fare_detail: IFareDetail[];
	offer_id: string;
	offer_item_id: string;
	owner: string;
	price_detail: IPriceDetail;
	segments: ISegments[];
	durations?: string[];
}

interface IFareDetail {
	offer_id: string;
	offer_item_id: string;
	owner: string;
	rbd: string;
	faresbasis: string;
	segment: string; // segment id
	branded: string;
	price_detail: IPriceDetail;
}

interface IPriceDetail {
	BaseAmount: string;
	Taxes: { Total: string };
	TotalAmount: ITotalAmmount;
}

interface ITotalAmmount {
	DetailCurrencyPrice: IDetailCurrencyPrice;
}

interface IDetailCurrencyPrice {
	Details: IDetails;
	Taxes: { Total: string };
	Total: string;
}

interface IDetails {
	Detail: IDetail[];
}

interface IDetail {
	"@refs": string;
	Application: string;
	SubTotal: string;
}

export interface ISegments {
	Arrival: IArrival;
	Departure: IDeparture;
	Equipment: { AircraftCode: string };
	MarketingCarrier: IMarketingCarrier;
	segment: string;
}

interface IArrival {
	AirportCode: string;
	Date: string;
	Terminal: { Name: string };
	Time: string;
}

interface IDeparture {
	AirportCode: string;
	Date: string;
	Time: string;
}

interface IMarketingCarrier {
	AirlineID: string;
	FlightNumber: string;
}

interface ISearched {
	code_discount: string;
	flights: IFlights[];
	travelers: string[];
	type: string;
}

interface IFlights {
	departure_date: string;
	destine: string;
	origin: string;
}
