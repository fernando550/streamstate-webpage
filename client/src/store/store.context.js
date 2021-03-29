import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext();

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
export const createStore = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const initialState = getState({
			getStore: () => state.store,
			getActions: () => state.actions,
			setStore: updatedStore =>
				setState({
					store: Object.assign(state.store, updatedStore),
					actions: { ...state.actions }
				})
		})

		//initialize state
		const [state, setState] = useState(initialState);

		useEffect(() => {
			// empty
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};
