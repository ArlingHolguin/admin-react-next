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
const SAVE_SELECTED_BRAND = "SAVE_SELECTED_BRAND";

type Action = {
	type: typeof SAVE_SELECTED_FLIGHT | typeof SAVE_SELECTED_BRAND;
	value: any;
};

interface State {
	selectedFlight?: IFlightProps;
	selectedBrand?: string;
	saveSelectedFlight?: (value: any) => void;
	saveSelectedBrand?: (value: any) => void;
}

export const SelectionContext = createContext<State | null>(null);
SelectionContext.displayName = "SelectionContext";

function SelectionReducer(state: State, action: Action) {
	switch (action.type) {
		case SAVE_SELECTED_FLIGHT:
			return { ...state, selectedFlight: action.value };

		case SAVE_SELECTED_BRAND:
			return { ...state, selectedBrand: action.value };

		default:
			return state;
	}
}

export const SelectionProvider: FC = (props) => {
	const [state, dispatch] = useReducer(SelectionReducer, {});

	const saveSelectedFlight = (value: any) =>
		dispatch({ type: SAVE_SELECTED_FLIGHT, value });
	const saveSelectedBrand = (value: any) =>
		dispatch({ type: SAVE_SELECTED_BRAND, value });

	const value = useMemo(
		() => ({
			...state,
			saveSelectedFlight,
			saveSelectedBrand
		}),
		[state]
	);

	return <SelectionContext.Provider value={value} {...props} />;
};

export const useSelection = () => {
	const context = useContext(SelectionContext);
	if (context == undefined)
		throw new Error(
			`useNdcSelection debe ser usado con un NdcSelectionProvider`
		);

	return context;
};
