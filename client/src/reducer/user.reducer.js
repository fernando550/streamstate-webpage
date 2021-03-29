export const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			return {
                isLoggedIn: true
			};
        case "logout":
            return {
                isLoggedIn: false
            }
		default:
			return state;
	}
};