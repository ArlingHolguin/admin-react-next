import { useState, useEffect, useRef } from "react";

// Hook
export function useLocalStorageCallback(key, initialValue) {
	// Ref to will store the callback
	const callbackRef = useRef(null);

	// State to store our value
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			return initialValue;
		}
	});

	useEffect(() => {
		if (callbackRef.current) {
			// Call callback with the updated state value
			callbackRef.current(storedValue);

			// Set callback to default value
			callbackRef.current = null;
		}
	}, [storedValue]);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (newValue, callback) => {
		try {
			// Store teh callback in ref
			callbackRef.current = callback;
			// Save state
			setStoredValue(newValue);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(newValue));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
