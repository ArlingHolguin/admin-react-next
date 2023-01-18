import React, {
	useReducer,
	createContext,
	useMemo,
	FC,
	useContext
} from "react";
import { IFiltersRequestBody } from "../models/filterFlight.model";
import { IFlight } from "../models/flight.model";
import { IResult } from "../models/searchService.model";

// List of actions
const SAVE_FILTER_RESULTS = "SAVE_FILTER_RESULTS";
const SAVE_FLIGHT_SEARCH = "SAVE_FLIGHT_SEARCH";
const SAVE_FILTER_SETTINGS = "SAVE_FILTER_SETTINGS";
const SAVE_FILTER_LOADING = "SAVE_FILTER_LOADING";

type Action = {
	type:
		| typeof SAVE_FILTER_RESULTS
		| typeof SAVE_FLIGHT_SEARCH
		| typeof SAVE_FILTER_SETTINGS
		| typeof SAVE_FILTER_LOADING;
	value: any;
};

interface State {
	filterResults?: IResult<any>[];
	flights?: IFlight;
	filterSettings?: IFiltersRequestBody;
	filterLoading?: boolean;
	saveFilterResults?: (value: any) => void;
	saveFlightSearch?: (value: any) => void;
	saveFilterSettings?: (value: any) => void;
	saveFilterLoading?: (value: boolean) => void;
}

export const FlightFilterContext = createContext<State | null>(null);
FlightFilterContext.displayName = "FlightFilterContext";

function flightFilterReducer(state: State, action: Action) {
	switch (action.type) {
		case SAVE_FILTER_RESULTS:
			return { ...state, filterResults: action.value };

		case SAVE_FLIGHT_SEARCH:
			return { ...state, flights: action.value };
		
		case SAVE_FILTER_LOADING:
			return { ...state, filterLoading: action.value };

		case SAVE_FILTER_SETTINGS:
			if (action.value.key == undefined) {
				return { ...state, filterSettings: action.value.filterValue };
			} else {
				const newParams = state.filterSettings;
				newParams.params[action.value.key] = action.value.filterValue;
				if (newParams != state.filterSettings) {
					return { ...state, filterSettings: newParams };
				}
			}
			
		default:
			return state;
	}
}

export const FlightFilterProvider: FC = (props) => {
	const [state, dispatch] = useReducer(flightFilterReducer, {});

	const savelFilterResults = (value: any) =>
		dispatch({ type: SAVE_FILTER_RESULTS, value });
	const saveFlightSearch = (value: any) =>
		dispatch({ type: SAVE_FLIGHT_SEARCH, value });
	const saveFilterSettings = (value: { filterValue: any; key: any }) =>
		dispatch({ type: SAVE_FILTER_SETTINGS, value });
	const saveFilterLoading = (value: boolean) =>
		dispatch({ type: SAVE_FILTER_LOADING, value });

	const value = useMemo(
		() => ({
			...state,
			savelFilterResults,
			saveFlightSearch,
			saveFilterSettings,
			saveFilterLoading
		}),
		[state]
	);

	return <FlightFilterContext.Provider value={value} {...props} />;
};

export const useFlightFilter = () => {
	const context = useContext(FlightFilterContext);
	if (context == undefined)
		throw new Error(
			`useFlightFilter debe ser usado con un FlightFilterProvider`
		);

	return context;
};
