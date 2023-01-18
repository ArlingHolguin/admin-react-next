export interface IKiu {
	results: IResultsKiu[];
	searched: ISearchedKiu;
}

export interface IResultsKiu {
	departure_date: string;
	destination: string;
	origin: string;
	id: string;
	flights: IKiuRecommendation[];
}

export interface IKiuRecommendation {
	flight_segments: ISegmentKiu[];
	token: string;
	price: IPrice;
}

export interface ISegmentKiu {
	"@ArrivalDateTime": string;
	"@DepartureDateTime": string;
	"@FlightNumber": string;
	"@JourneyDuration": string;
	"@StopQuantity": string;
	ArrivalAirport: { "@LocationCode": string };
	BookingClassAvail: IBookingClassAvail[];
	DepartureAirport: { "@LocationCode": string };
	Equipment: { "@AirEquipType": string };
	MarketingAirline: { "@CompanyShortName": string };
	MarketingCabin: IMarketingCabin;
	Meal: { "@MealCode": string };
}

interface IPrice {
	base: string;
	total: string;
	currency: string;
	taxes: ITax[];
	pax_info: IPaxInfo[];
}

interface ITax {
	code: string;
	amount: string;
	currency: string;
}

interface IPaxInfo {
	quantity: string;
	type: string;
	base: string;
}

interface IBookingClassAvail {
	"@RPH": string;
	"@ResBookDesigCode": string;
	"@ResBookDesigQuantity": string;
}

interface IMarketingCabin {
	"@CabinType": string;
	"@RPH": string;
}

interface ISearchedKiu {
	flights: IFlight[];
	travelers: string[];
}

interface IFlight {
	departure_date: string;
	destine: string;
	origin: string;
}
