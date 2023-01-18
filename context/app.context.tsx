import React, {
	useReducer,
	createContext,
	useMemo,
	FC,
	useContext
} from "react";
import { IFlightProps } from "../models/flight.model";

// List of actions
const SAVE_SELECTED_FLIGHT = "SAVE_SELECTED_FLIGHT";
const SAVE_SELECTED_RETURN_FLIGHT = "SAVE_SELECTED_RETURN_FLIGHT";
const SAVE_MIN_PRICE = "SAVE_MIN_PRICE";
const SAVE_SELECT_ERROR = "SAVE_SELECT_ERROR";
const SAVE_FLIGHT_INFO = "SAVE_FLIGHT_INFO";
const SAVE_FLIGHT_INTER = "SAVE_FLIGHT_INTER";

type Action = {
	type:
		| typeof SAVE_SELECTED_FLIGHT
		| typeof SAVE_SELECTED_RETURN_FLIGHT
		| typeof SAVE_SELECT_ERROR
		| typeof SAVE_MIN_PRICE
		| typeof SAVE_FLIGHT_INFO
		| typeof SAVE_FLIGHT_INTER;
	value: any;
};
interface State {
	selectedFlightOrg?: IFlightProps;
	selectedFlightReturn?: IFlightProps;
	selectError?: any;
	minPrice?: number;
	resumeFlightInfo?: any;
	flightIsInter?: any;
	saveSelectedFlightOrg?: (value: any) => void;
	saveSelectedFlightReturn?: (value: any) => void;
	saveSelectError?: (value: any) => void;
	saveMinPrice?: (value: number) => void;
	saveResumeFlightInfo?: (value: any) => void;
	saveFlightIsInter?: (value: boolean) => void;
}

export const AppContext = createContext<State | null>(null);
AppContext.displayName = "AppContext";

function SelectionReducer(state: State, action: Action) {
	switch (action.type) {
		case SAVE_SELECTED_FLIGHT:
			return { ...state, selectedFlightOrg: action.value };

		case SAVE_SELECTED_RETURN_FLIGHT:
			return { ...state, selectedFlightReturn: action.value };

		case SAVE_SELECT_ERROR:
			return { ...state, selectError: action.value };

		case SAVE_MIN_PRICE:
			return { ...state, minPrice: action.value };
		
		case SAVE_FLIGHT_INFO:
			return { ...state, resumeFlightInfo: action.value };
		
		case SAVE_FLIGHT_INTER:
			return { ...state, flightIsInter: action.value };

		default:
			return state;
	}
}

export const AppProvider: FC = (props) => {
	const [state, dispatch] = useReducer(SelectionReducer, {});

	const saveSelectedFlightOrg = (value: any) =>
		dispatch({ type: SAVE_SELECTED_FLIGHT, value });
	const saveSelectedFlightReturn = (value: any) =>
		dispatch({ type: SAVE_SELECTED_RETURN_FLIGHT, value });
	const saveSelectError = (value: any) =>
		dispatch({ type: SAVE_SELECT_ERROR, value });
	const saveMinPrice = (value: number) =>
		dispatch({ type: SAVE_MIN_PRICE, value });
	const saveResumeFlightInfo = (value: any) =>
		dispatch({ type: SAVE_FLIGHT_INFO, value });
	const saveFlightIsInter = (value: boolean) =>
		dispatch({ type: SAVE_FLIGHT_INTER, value });

	const value = useMemo(
		() => ({
			...state,
			saveSelectedFlightOrg,
			saveSelectedFlightReturn,
			saveSelectError,
			saveMinPrice,
			saveResumeFlightInfo,
			saveFlightIsInter,
		}),
		[state]
	);

	return <AppContext.Provider value={value} {...props} />;
};

export const useApp = () => {
	const context = useContext(AppContext);
	if (context == undefined)
		throw new Error(
			`useNdcSelection debe ser usado con un NdcSelectionProvider`
		);

	return context;
};
