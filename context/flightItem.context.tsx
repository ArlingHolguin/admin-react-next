import React, {
	useReducer,
	createContext,
	useMemo,
	FC,
	useContext
} from "react";

type Action = {
	type: "SAVE";
	value: any;
};

interface State {
	saveInfo?: (value: any) => void;
	segmentInfo?: any;
}

export const FlightDetailContext = createContext<State | null>(null);
FlightDetailContext.displayName = "FlightDetailContext";

function flightDetailReducer(state: State, action: Action) {
	if (action.type == "SAVE") {
		return {
			...state,
			segmentInfo: action.value
		};
	}
}

export const FlightDetailProvider: FC = (props) => {
	const [state, dispatch] = useReducer(flightDetailReducer, {
		segmentInfo: ""
	});

	const saveInfo = (value: any) => dispatch({ type: "SAVE", value });

	const value = useMemo(
		() => ({
			...state,
			saveInfo
		}),
		[state]
	);

	return <FlightDetailContext.Provider value={value} {...props} />;
};

export const useFlightDetail = () => {
	const context = useContext(FlightDetailContext);
	if (context == undefined)
		throw new Error(
			`useTransaction debe ser usado con un FlightDetailProvider`
		);

	return context;
};
