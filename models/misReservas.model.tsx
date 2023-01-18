export interface IMyReserves {
	segments: ISegment[];
	passengers: IPassenger[];
	flightInfo: {
		reserveDate: string;
		departureDate: string;
		reserveCode: string;
		reserveState: string;
	};
	details: any;
}

export interface IPassenger {
	name: string;
	document: string;
	pdt: "ADT" | "CHD" | "INF";
}

export interface ISegment {
	flightNumber: string;
	departureDate: string;
	departure: string;
	depCode: string;
	arrCode: string;
	arrival: string;
	depTime: string;
	arrTime: string;
	flightTime: string;
	price: string;
	flightClass: string;
	airline: string;
}
